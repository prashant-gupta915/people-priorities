from pydantic import BaseModel, Field, ConfigDict
from typing import Optional, List
from datetime import datetime
from pydantic.functional_validators import BeforeValidator
from typing_extensions import Annotated

# Represents an ObjectId field in the database.
# It will be represented as a `str` on the model so that it can be serialized to JSON.
PyObjectId = Annotated[str, BeforeValidator(str)]

class ComplaintBase(BaseModel):
    title: str = Field(..., min_length=5, max_length=255)
    description: str = Field(..., min_length=10)
    category: str
    priority: str
    images: Optional[List[str]] = []
    audio: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None

class ComplaintCreate(ComplaintBase):
    pass

class ComplaintUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    priority: Optional[str] = None
    status: Optional[str] = None
    images: Optional[List[str]] = None
    audio: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    ai_processing_status: Optional[str] = None
    ai_summary: Optional[str] = None
    ai_category: Optional[str] = None
    severity: Optional[float] = None
    language: Optional[str] = None

class ComplaintDB(ComplaintBase):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    status: str = "pending"
    ai_processing_status: str = "pending"
    ai_summary: Optional[str] = None
    ai_category: Optional[str] = None
    severity: Optional[float] = None
    language: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    
    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
    )

class ComplaintResponse(ComplaintDB):
    pass

class ComplaintListResponse(BaseModel):
    complaints: List[ComplaintResponse]
    total: int
