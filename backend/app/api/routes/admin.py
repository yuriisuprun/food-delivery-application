"""
Admin endpoints for seeding content
"""
import logging
import uuid
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.services.rag import rag_service

logger = logging.getLogger(__name__)
router = APIRouter()

# Sample Italian grammar content
GRAMMAR_CONTENT = {
    "present_tense": {
        "content": """
        Italian Present Tense (Presente Indicativo)
        
        Regular verbs are divided into three conjugations:
        1st conjugation: -ARE verbs (parlare - to speak)
        2nd conjugation: -ERE verbs (leggere - to read)
        3rd conjugation: -IRE verbs (partire - to leave)
        
        Parlare (to speak):
        io parlo - I speak
        tu parli - you speak
        lui/lei parla - he/she speaks
        noi parliamo - we speak
        voi parlate - you all speak
        loro parlano - they speak
        
        Common regular verbs:
        - abitare (to live)
        - amare (to love)
        - cantare (to sing)
        - leggere (to read)
        - scrivere (to write)
        - partire (to leave)
        - dormire (to sleep)
        """,
        "metadata": {
            "topic": "grammar",
            "subtopic": "verb_conjugation",
            "cefr_level": "A2",
            "difficulty": 1,
        },
    },
    "past_tense": {
        "content": """
        Italian Past Tense (Passato Prossimo)
        
        The passato prossimo is formed with:
        - Present tense of avere or essere + past participle
        
        Most verbs use avere:
        ho parlato - I spoke
        hai parlato - you spoke
        ha parlato - he/she spoke
        abbiamo parlato - we spoke
        avete parlato - you all spoke
        hanno parlato - they spoke
        
        Verbs of movement use essere:
        sono andato/a - I went
        sei andato/a - you went
        è andato/a - he/she went
        siamo andati/e - we went
        siete andati/e - you all went
        sono andati/e - they went
        
        Past participles:
        -ARE verbs: -ato (parlato, cantato)
        -ERE verbs: -uto (venduto, creduto)
        -IRE verbs: -ito (partito, dormito)
        """,
        "metadata": {
            "topic": "grammar",
            "subtopic": "past_tense",
            "cefr_level": "A2",
            "difficulty": 2,
        },
    },
    "gender_agreement": {
        "content": """
        Italian Gender and Agreement
        
        All Italian nouns are either masculine or feminine.
        
        Masculine articles:
        - il (the) - before consonants
        - lo (the) - before s+consonant, z, gn, ps
        - l' (the) - before vowels
        
        Feminine articles:
        - la (the) - before consonants
        - l' (the) - before vowels
        
        Adjectives must agree with the noun:
        - Masculine singular: -o (bello)
        - Feminine singular: -a (bella)
        - Masculine plural: -i (belli)
        - Feminine plural: -e (belle)
        
        Examples:
        il ragazzo bello - the handsome boy
        la ragazza bella - the beautiful girl
        i ragazzi belli - the handsome boys
        le ragazze belle - the beautiful girls
        """,
        "metadata": {
            "topic": "grammar",
            "subtopic": "gender_agreement",
            "cefr_level": "A1",
            "difficulty": 1,
        },
    },
}

# Sample exam questions
EXAM_QUESTIONS = {
    "q1": {
        "content": """
        Prefettura Exam Question - Grammar
        
        Question: Completa la frase con il verbo corretto.
        "Ieri io _____ al cinema con i miei amici."
        
        A) vado
        B) sono andato
        C) andrò
        D) andrei
        
        Correct Answer: B) sono andato
        Explanation: This requires passato prossimo (past tense) because the action happened yesterday.
        The verb "andare" (to go) uses "essere" as auxiliary, so: sono andato.
        """,
        "metadata": {
            "topic": "exam",
            "question_type": "multiple_choice",
            "cefr_level": "A2",
            "skill": "grammar",
        },
    },
    "q2": {
        "content": """
        Prefettura Exam Question - Vocabulary
        
        Question: Quale parola significa "to understand"?
        
        A) capire
        B) parlare
        C) leggere
        D) scrivere
        
        Correct Answer: A) capire
        Explanation: "Capire" means "to understand". The other options mean:
        - parlare: to speak
        - leggere: to read
        - scrivere: to write
        """,
        "metadata": {
            "topic": "exam",
            "question_type": "multiple_choice",
            "cefr_level": "A1",
            "skill": "vocabulary",
        },
    },
}


@router.post("/seed-content")
async def seed_grammar_content(db: Session = Depends(get_db)):
    """Seed Italian grammar content into vector DB"""
    try:
        for doc_id, doc_data in GRAMMAR_CONTENT.items():
            rag_service.add_document(
                doc_id=doc_id,
                content=doc_data["content"],
                metadata=doc_data["metadata"],
            )

        return {
            "status": "success",
            "message": f"Seeded {len(GRAMMAR_CONTENT)} grammar documents",
        }

    except Exception as e:
        logger.error(f"Error seeding content: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/seed-exams")
async def seed_exam_questions(db: Session = Depends(get_db)):
    """Seed exam questions into vector DB"""
    try:
        for doc_id, doc_data in EXAM_QUESTIONS.items():
            rag_service.add_document(
                doc_id=doc_id,
                content=doc_data["content"],
                metadata=doc_data["metadata"],
            )

        return {
            "status": "success",
            "message": f"Seeded {len(EXAM_QUESTIONS)} exam questions",
        }

    except Exception as e:
        logger.error(f"Error seeding exams: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/seed-all")
async def seed_all_content(db: Session = Depends(get_db)):
    """Seed all content"""
    try:
        # Seed grammar
        for doc_id, doc_data in GRAMMAR_CONTENT.items():
            rag_service.add_document(
                doc_id=doc_id,
                content=doc_data["content"],
                metadata=doc_data["metadata"],
            )

        # Seed exams
        for doc_id, doc_data in EXAM_QUESTIONS.items():
            rag_service.add_document(
                doc_id=doc_id,
                content=doc_data["content"],
                metadata=doc_data["metadata"],
            )

        return {
            "status": "success",
            "message": f"Seeded {len(GRAMMAR_CONTENT) + len(EXAM_QUESTIONS)} documents",
        }

    except Exception as e:
        logger.error(f"Error seeding all content: {e}")
        raise HTTPException(status_code=500, detail=str(e))
