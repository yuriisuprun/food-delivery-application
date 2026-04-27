"""
Progress tracking schemas
"""
from typing import Dict, List
from pydantic import BaseModel, Field


class SkillProgressSchema(BaseModel):
    """Skill progress schema"""

    skill: str
    level: str
    score: float
    attempts: int
    correct_answers: int
    accuracy: float

    class Config:
        from_attributes = True


class UserProgressSchema(BaseModel):
    """User progress schema"""

    user_id: str
    cefr_level: str
    total_score: float
    total_questions: int
    weak_areas: Dict[str, float]
    skill_progress: List[SkillProgressSchema]
    recent_mistakes: List[dict]

    class Config:
        from_attributes = True
