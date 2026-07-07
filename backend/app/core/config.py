import os
from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional

class Settings(BaseSettings):
    PROJECT_NAME: str = "Citizen Portal API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    # MongoDB settings
    MONGODB_URL: str = "mongodb://localhost:27017" # Default for local dev, replace with Atlas URI
    DATABASE_NAME: str = "people_priority"
    
    # CORS setup
    CORS_ORIGINS: list[str] = ["*"] # Configure appropriately for production
    
    # AI Settings
    GEMINI_API_KEY: str = ""
    
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="allow"
    )

settings = Settings()
