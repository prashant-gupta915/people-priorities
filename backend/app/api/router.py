from fastapi import APIRouter
from app.api.endpoints import complaints, analytics

api_router = APIRouter()
api_router.include_router(complaints.router, prefix="/complaints", tags=["Complaints"])
api_router.include_router(analytics.router, prefix="/analytics", tags=["Analytics"])
