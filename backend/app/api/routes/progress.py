"""
Progress tracking endpoints
"""
import logging
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models import User, SkillProgress, Mistake
from app.schemas.progress import UserProgressSchema, SkillProgressSchema

logger = logging.getLogger(__name__)
router = APIRouter()


@router.get("/user/{user_id}")
async def get_user_progress(
    user_id: str,
    db: Session = Depends(get_db),
):
    """Get user's overall progress"""
    try:
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        skill_progress = db.query(SkillProgress).filter(
            SkillProgress.user_id == user_id
        ).all()

        recent_mistakes = db.query(Mistake).filter(
            Mistake.user_id == user_id
        ).order_by(Mistake.frequency.desc()).limit(5).all()

        return UserProgressSchema(
            user_id=user.id,
            cefr_level=user.cefr_level,
            total_score=user.total_score,
            total_questions=user.total_questions,
            weak_areas=user.weak_areas or {},
            skill_progress=[
                SkillProgressSchema(
                    skill=sp.skill,
                    level=sp.level,
                    score=sp.score,
                    attempts=sp.attempts,
                    correct_answers=sp.correct_answers,
                    accuracy=sp.correct_answers / sp.attempts if sp.attempts > 0 else 0,
                )
                for sp in skill_progress
            ],
            recent_mistakes=[
                {
                    "topic": m.topic,
                    "mistake_type": m.mistake_type,
                    "frequency": m.frequency,
                    "explanation": m.explanation,
                }
                for m in recent_mistakes
            ],
        )

    except Exception as e:
        logger.error(f"Error getting user progress: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/topics")
async def get_topic_progress(
    user_id: str,
    db: Session = Depends(get_db),
):
    """Get progress by topic"""
    try:
        skill_progress = db.query(SkillProgress).filter(
            SkillProgress.user_id == user_id
        ).all()

        return {
            "topics": [
                {
                    "skill": sp.skill,
                    "level": sp.level,
                    "score": sp.score,
                    "accuracy": sp.correct_answers / sp.attempts if sp.attempts > 0 else 0,
                    "last_practiced": sp.last_practiced.isoformat() if sp.last_practiced else None,
                }
                for sp in skill_progress
            ]
        }

    except Exception as e:
        logger.error(f"Error getting topic progress: {e}")
        raise HTTPException(status_code=500, detail=str(e))
