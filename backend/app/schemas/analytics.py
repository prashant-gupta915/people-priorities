from pydantic import BaseModel, Field
from typing import Optional

class AnalyticsSummary(BaseModel):
    total_complaints: int = Field(default=0, alias="totalComplaints")
    open_complaints: int = Field(default=0, alias="openComplaints")
    in_progress_complaints: int = Field(default=0, alias="inProgressComplaints")
    resolved_complaints: int = Field(default=0, alias="resolvedComplaints")
    deleted_complaints: int = Field(default=0, alias="deletedComplaints")

    class Config:
        populate_by_name = True

class CategoryCount(BaseModel):
    category: str
    count: int

class PriorityCount(BaseModel):
    priority: str
    count: int

class TrendDataPoint(BaseModel):
    date: str
    count: int

class HeatmapPoint(BaseModel):
    latitude: float
    longitude: float
    category: str
    priority: str
    status: str
