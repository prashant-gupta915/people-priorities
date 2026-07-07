from fastapi import APIRouter, HTTPException, status, Query, BackgroundTasks
from app.schemas.complaint import ComplaintCreate, ComplaintUpdate, ComplaintResponse, ComplaintListResponse
from app.services import complaint as complaint_service
from app.services.ai_service import ai_service
import logging

logger = logging.getLogger(__name__)

router = APIRouter()

@router.post("", response_model=ComplaintResponse, status_code=status.HTTP_201_CREATED)
async def create_complaint(complaint: ComplaintCreate, background_tasks: BackgroundTasks):
    try:
        created_complaint = await complaint_service.create_complaint(complaint)
        # Trigger background AI processing
        background_tasks.add_task(
            ai_service.process_complaint_async,
            complaint_id=str(created_complaint.id),
            title=created_complaint.title,
            description=created_complaint.description
        )
        return created_complaint
    except Exception as e:
        logger.error(f"Error creating complaint: {e}")
        raise HTTPException(status_code=500, detail="Failed to create complaint")

@router.get("", response_model=ComplaintListResponse)
async def get_complaints(skip: int = Query(0, ge=0), limit: int = Query(100, ge=1, le=100)):
    try:
        complaints, total = await complaint_service.get_complaints(skip=skip, limit=limit)
        return {"complaints": complaints, "total": total}
    except Exception as e:
        logger.error(f"Error fetching complaints: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch complaints")

@router.get("/{id}", response_model=ComplaintResponse)
async def get_complaint(id: str):
    complaint = await complaint_service.get_complaint(id)
    if not complaint:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Complaint not found")
    return complaint

@router.patch("/{id}", response_model=ComplaintResponse)
async def update_complaint(id: str, complaint_update: ComplaintUpdate):
    complaint = await complaint_service.update_complaint(id, complaint_update)
    if not complaint:
        # Check if it doesn't exist or is invalid
        existing = await complaint_service.get_complaint(id)
        if not existing:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Complaint not found")
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Failed to update complaint")
    return complaint

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_complaint(id: str):
    success = await complaint_service.delete_complaint(id)
    if not success:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Complaint not found")
    return None
