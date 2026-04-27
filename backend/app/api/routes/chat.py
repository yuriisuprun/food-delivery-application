"""
Chat endpoints
"""
import logging
import uuid
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models import ChatSession, ChatMessage, User
from app.schemas.chat import ChatRequestSchema, ChatHistorySchema
from app.services.rag import rag_service
from app.services.llm import llm_service
from app.services.memory import MemoryService

logger = logging.getLogger(__name__)
router = APIRouter()


@router.post("/")
async def chat(
    request: ChatRequestSchema,
    db: Session = Depends(get_db),
):
    """Chat endpoint with streaming response"""
    try:
        # Get or create session
        session = db.query(ChatSession).filter(
            ChatSession.id == request.session_id
        ).first()

        if not session:
            session = ChatSession(
                id=request.session_id,
                user_id=request.user_id,
                topic=request.topic,
                difficulty=request.difficulty,
            )
            db.add(session)
            db.commit()

        # Store user message
        user_msg_id = f"msg_{uuid.uuid4()}"
        user_msg = ChatMessage(
            id=user_msg_id,
            session_id=request.session_id,
            role="user",
            content=request.message,
        )
        db.add(user_msg)
        db.commit()

        # Get memory context
        memory_service = MemoryService(db)
        short_term = memory_service.get_short_term_memory(request.session_id)
        long_term = memory_service.get_long_term_memory(request.user_id)

        # Retrieve relevant context from RAG
        retrieved = rag_service.retrieve(
            query=request.message,
            top_k=5,
        )

        # Generate response
        async def generate():
            response_text = ""
            async for chunk in llm_service.chat_stream(
                messages=[
                    {"role": msg["role"], "content": msg["content"]}
                    for msg in short_term
                ],
                system_prompt=f"""You are an expert Italian language tutor for the Prefettura di Milano exam (CEFR {request.difficulty} level).

TUTORING PRINCIPLES:
1. NEVER give direct answers - guide the student through reasoning
2. Provide: explanation → guided questions → hints → final answer only if needed
3. Adapt to the student's level and weak areas
4. Be encouraging and supportive
5. Correct mistakes with clear explanations

STUDENT PROFILE:
- CEFR Level: {long_term.get('cefr_level', request.difficulty)}
- Topic: {request.topic}
- Weak areas: {', '.join(long_term.get('weak_areas', {}).keys()) or 'None identified yet'}

Respond in a conversational, supportive tone. Use Italian examples when relevant.""",
            ):
                response_text += chunk
                yield chunk

            # Store assistant message
            assistant_msg = ChatMessage(
                id=f"msg_{uuid.uuid4()}",
                session_id=request.session_id,
                role="assistant",
                content=response_text,
            )
            db.add(assistant_msg)
            db.commit()

        return StreamingResponse(generate(), media_type="text/event-stream")

    except Exception as e:
        logger.error(f"Error in chat: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/history/{session_id}")
async def get_chat_history(
    session_id: str,
    db: Session = Depends(get_db),
):
    """Get chat history for a session"""
    try:
        session = db.query(ChatSession).filter(
            ChatSession.id == session_id
        ).first()

        if not session:
            raise HTTPException(status_code=404, detail="Session not found")

        messages = db.query(ChatMessage).filter(
            ChatMessage.session_id == session_id
        ).order_by(ChatMessage.created_at).all()

        return ChatHistorySchema(
            session_id=session.id,
            messages=[
                {"role": msg.role, "content": msg.content}
                for msg in messages
            ],
            topic=session.topic,
            difficulty=session.difficulty,
            created_at=session.created_at.isoformat(),
            updated_at=session.updated_at.isoformat(),
        )

    except Exception as e:
        logger.error(f"Error getting chat history: {e}")
        raise HTTPException(status_code=500, detail=str(e))
