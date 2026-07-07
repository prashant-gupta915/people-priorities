import logging
from typing import List, Literal
from app.db.mongodb import get_complaints_collection
from app.schemas.analytics import (
    AnalyticsSummary,
    CategoryCount,
    PriorityCount,
    TrendDataPoint,
    HeatmapPoint,
)

logger = logging.getLogger(__name__)

class AnalyticsService:
    async def get_summary(self) -> AnalyticsSummary:
        collection = get_complaints_collection()
        pipeline = [
            {
                "$facet": {
                    "total": [{"$count": "count"}],
                    "open": [{"$match": {"status": "Open", "is_deleted": {"$ne": True}}}, {"$count": "count"}],
                    "in_progress": [{"$match": {"status": "In Progress", "is_deleted": {"$ne": True}}}, {"$count": "count"}],
                    "resolved": [{"$match": {"status": "Resolved", "is_deleted": {"$ne": True}}}, {"$count": "count"}],
                    "deleted": [{"$match": {"is_deleted": True}}, {"$count": "count"}],
                }
            }
        ]
        
        result = await collection.aggregate(pipeline).to_list(1)
        if not result:
            return AnalyticsSummary()
            
        data = result[0]
        
        def get_count(key):
            return data.get(key, [{"count": 0}])[0].get("count", 0) if data.get(key) else 0

        return AnalyticsSummary(
            totalComplaints=get_count("total"),
            openComplaints=get_count("open"),
            inProgressComplaints=get_count("in_progress"),
            resolvedComplaints=get_count("resolved"),
            deletedComplaints=get_count("deleted")
        )

    async def get_categories(self) -> List[CategoryCount]:
        collection = get_complaints_collection()
        pipeline = [
            {"$match": {"is_deleted": {"$ne": True}}},
            {"$group": {"_id": "$category", "count": {"$sum": 1}}},
            {"$project": {"category": "$_id", "count": 1, "_id": 0}},
            {"$sort": {"count": -1}}
        ]
        
        result = await collection.aggregate(pipeline).to_list(None)
        return [CategoryCount(**item) for item in result]

    async def get_priority(self) -> List[PriorityCount]:
        collection = get_complaints_collection()
        pipeline = [
            {"$match": {"is_deleted": {"$ne": True}}},
            {"$group": {"_id": "$priority", "count": {"$sum": 1}}},
            {"$project": {"priority": "$_id", "count": 1, "_id": 0}},
            {"$sort": {"count": -1}}
        ]
        
        result = await collection.aggregate(pipeline).to_list(None)
        
        # Ensure all priorities are returned even if count is 0
        all_priorities = ["Low", "Medium", "High", "Critical"]
        priority_map = {item["priority"]: item["count"] for item in result if item.get("priority")}
        
        return [PriorityCount(priority=p, count=priority_map.get(p, 0)) for p in all_priorities]

    async def get_trends(self, period: Literal["daily", "weekly", "monthly"]) -> List[TrendDataPoint]:
        collection = get_complaints_collection()
        
        date_format = "%Y-%m-%d"
        if period == "monthly":
            date_format = "%Y-%m"
        elif period == "weekly":
            date_format = "%Y-%U" # Year and week number
            
        pipeline = [
            {"$match": {"is_deleted": {"$ne": True}}},
            {
                "$group": {
                    "_id": {
                        "$dateToString": {
                            "format": date_format,
                            "date": "$created_at"
                        }
                    },
                    "count": {"$sum": 1}
                }
            },
            {"$project": {"date": "$_id", "count": 1, "_id": 0}},
            {"$sort": {"date": 1}}
        ]
        
        result = await collection.aggregate(pipeline).to_list(None)
        return [TrendDataPoint(**item) for item in result if item.get("date")]

    async def get_heatmap(self) -> List[HeatmapPoint]:
        collection = get_complaints_collection()
        pipeline = [
            {"$match": {"is_deleted": {"$ne": True}, "location.latitude": {"$exists": True}, "location.longitude": {"$exists": True}}},
            {"$project": {
                "latitude": "$location.latitude",
                "longitude": "$location.longitude",
                "category": 1,
                "priority": 1,
                "status": 1,
                "_id": 0
            }}
        ]
        
        result = await collection.aggregate(pipeline).to_list(None)
        return [HeatmapPoint(**item) for item in result]
