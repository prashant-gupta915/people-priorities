import logging
import asyncio
from typing import Optional, Dict, Any
import google.generativeai as genai
from google.generativeai.types import generation_types

from app.core.config import settings
from app.schemas.complaint import ComplaintUpdate
from app.services.complaint import get_complaint, update_complaint

logger = logging.getLogger(__name__)

# Configure Gemini
if settings.GEMINI_API_KEY:
    genai.configure(api_key=settings.GEMINI_API_KEY)
else:
    logger.warning("GEMINI_API_KEY is not set. AI Processing will fail.")

# Use a fast model for text processing
MODEL_NAME = 'gemini-1.5-flash'

class AIService:
    def __init__(self):
        self.model = genai.GenerativeModel(MODEL_NAME)

    async def detect_language(self, text: str) -> str:
        if not settings.GEMINI_API_KEY:
            return "Spanish" # Mock for testing non-english
        prompt = f"Identify the language of the following text. Respond with ONLY the English name of the language (e.g., 'English', 'Spanish', 'Hindi').\n\nText: {text}"
        response = await self.model.generate_content_async(prompt)
        return response.text.strip()

    async def translate(self, text: str, source_language: str) -> str:
        if not settings.GEMINI_API_KEY:
            return f"[Mock Translation to English of: {text[:20]}...]"
        if source_language.lower() == "english":
            return text
            
        prompt = f"Translate the following text from {source_language} to English. Provide ONLY the translated text without any conversational filler or quotes.\n\nText: {text}"
        response = await self.model.generate_content_async(prompt)
        return response.text.strip()

    async def classify_category(self, text: str) -> str:
        categories = ["Road", "Water", "Electricity", "Sanitation", "Health", "Education", "Other"]
        if not settings.GEMINI_API_KEY:
            return "Water" # Mock category
        prompt = f"Classify the following complaint into EXACTLY ONE of these categories: {', '.join(categories)}. Respond with ONLY the category name.\n\nComplaint: {text}"
        response = await self.model.generate_content_async(prompt)
        cat = response.text.strip().title()
        if cat not in categories:
            return "Other"
        return cat

    async def classify_severity(self, text: str) -> float:
        if not settings.GEMINI_API_KEY:
            return 8.5 # Mock severity
        prompt = f"Rate the severity of the following complaint on a scale from 1.0 to 10.0, where 10.0 is a critical life-threatening emergency and 1.0 is a minor nuisance. Respond with ONLY the number (e.g., '7.5').\n\nComplaint: {text}"
        response = await self.model.generate_content_async(prompt)
        try:
            return float(response.text.strip())
        except ValueError:
            logger.error(f"Failed to parse severity: {response.text}")
            return 5.0 # Default fallback

    async def generate_summary(self, text: str) -> str:
        if not settings.GEMINI_API_KEY:
            return "Mock AI summary generated for this complaint due to missing API key."
        prompt = f"Provide a concise, 1-2 sentence professional summary of the following complaint.\n\nComplaint: {text}"
        response = await self.model.generate_content_async(prompt)
        return response.text.strip()

    async def process_complaint_async(self, complaint_id: str, title: str, description: str, max_retries: int = 3):
        """
        Background task to process a complaint using Gemini.
        """
        if not settings.GEMINI_API_KEY:
            logger.warning("Mocking AI processing due to missing GEMINI_API_KEY.")

        text_to_process = f"Title: {title}\nDescription: {description}"
        
        # Mark as processing
        await update_complaint(complaint_id, ComplaintUpdate(ai_processing_status="processing"))
        
        attempt = 0
        while attempt < max_retries:
            try:
                logger.info(f"Starting AI processing for complaint {complaint_id} (Attempt {attempt+1})")
                
                # 1. Detect Language
                language = await self.detect_language(text_to_process)
                logger.info(f"Detected language: {language}")
                
                # 2. Translate if necessary
                english_text = await self.translate(text_to_process, language)
                
                # Run independent classification tasks concurrently
                category_task = self.classify_category(english_text)
                severity_task = self.classify_severity(english_text)
                summary_task = self.generate_summary(english_text)
                
                category, severity, summary = await asyncio.gather(category_task, severity_task, summary_task)
                
                logger.info(f"AI Processing successful for {complaint_id}")
                
                # Update DB
                update_data = ComplaintUpdate(
                    ai_processing_status="completed",
                    language=language,
                    ai_category=category,
                    severity=severity,
                    ai_summary=summary
                )
                await update_complaint(complaint_id, update_data)
                return # Success, exit loop
                
            except Exception as e:
                attempt += 1
                logger.error(f"AI processing error on attempt {attempt}: {e}")
                if attempt >= max_retries:
                    logger.error(f"Max retries reached. Failing AI processing for {complaint_id}.")
                    await update_complaint(complaint_id, ComplaintUpdate(ai_processing_status="failed"))
                    return
                # Wait before retrying with exponential backoff
                await asyncio.sleep(2 ** attempt)

ai_service = AIService()
