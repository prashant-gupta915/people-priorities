from fastapi import APIRouter, Depends, Query
from typing import List, Literal
from app.services.analytics_service import AnalyticsService
from app.schemas.analytics import (
    AnalyticsSummary,
    CategoryCount,
    PriorityCount,
    TrendDataPoint,
    HeatmapPoint,
)

router = APIRouter()

def get_analytics_service():
    return AnalyticsService()

@router.get("/summary", response_model=AnalyticsSummary, summary="Get Analytics Summary")
async def get_summary(
    service: AnalyticsService = Depends(get_analytics_service)
):
    """
    Get the overall summary of complaints.
    """
    return await service.get_summary()

@router.get("/categories", response_model=List[CategoryCount], summary="Get Complaints by Category")
async def get_categories(
    service: AnalyticsService = Depends(get_analytics_service)
):
    """
    Get complaint counts grouped by category.
    """
    return await service.get_categories()

@router.get("/priority", response_model=List[PriorityCount], summary="Get Complaints by Priority")
async def get_priority(
    service: AnalyticsService = Depends(get_analytics_service)
):
    """
    Get complaint counts grouped by priority.
    """
    return await service.get_priority()

@router.get("/trends", response_model=List[TrendDataPoint], summary="Get Complaint Trends")
async def get_trends(
    period: Literal["daily", "weekly", "monthly"] = Query("daily", description="Aggregation period"),
    service: AnalyticsService = Depends(get_analytics_service)
):
    """
    Get complaint trends over time (daily, weekly, or monthly).
    """
    return await service.get_trends(period)

@router.get("/heatmap", response_model=List[HeatmapPoint], summary="Get Complaint Heatmap Data")
async def get_heatmap(
    service: AnalyticsService = Depends(get_analytics_service)
):
    """
    Get coordinates and details for non-deleted complaints for heatmap visualization.
    """
    return await service.get_heatmap()
