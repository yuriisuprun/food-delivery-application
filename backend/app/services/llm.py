"""
LLM service for AI tutoring
"""
import logging
import json
from typing import Optional, Dict, List, AsyncGenerator
from openai import AsyncOpenAI
from app.core.config import settings

logger = logging.getLogger(__name__)


class LLMService:
    """LLM service for tutoring interactions"""

    def __init__(self):
        """Initialize LLM service"""
        self.client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)
        self.model = settings.OPENAI_MODEL

    async def chat_stream(
        self,
        messages: List[Dict],
        system_prompt: str,
        temperature: float = settings.LLM_TEMPERATURE,
        max_tokens: int = settings.LLM_MAX_TOKENS,
    ) -> AsyncGenerator[str, None]:
        """Stream chat response"""
        try:
            full_messages = [
                {"role": "system", "content": system_prompt},
                *messages,
            ]

            stream = await self.client.chat.completions.create(
                model=self.model,
                messages=full_messages,
                temperature=temperature,
                max_tokens=max_tokens,
                stream=True,
            )

            async for chunk in stream:
                if chunk.choices[0].delta.content:
                    yield chunk.choices[0].delta.content

        except Exception as e:
            logger.error(f"Error in chat stream: {e}")
            yield f"Error: {str(e)}"

    async def evaluate_answer(
        self,
        question: str,
        user_answer: str,
        correct_answer: Optional[str] = None,
        context: Optional[str] = None,
    ) -> Dict:
        """Evaluate a student's answer"""
        prompt = f"""You are an expert Italian language tutor evaluating a student's answer.

Question: {question}
Student's Answer: {user_answer}
{f'Correct Answer: {correct_answer}' if correct_answer else ''}
{f'Context: {context}' if context else ''}

Provide evaluation in JSON format:
{{
    "score": <0-10>,
    "is_correct": <true/false>,
    "corrections": [<list of corrections>],
    "explanation": "<detailed explanation>",
    "improvement_suggestions": [<list of suggestions>],
    "grammar_errors": [
        {{"error": "<error>", "correction": "<correction>", "explanation": "<why>"}}
    ]
}}

Be encouraging but honest. Focus on learning, not just correctness."""

        try:
            response = await self.client.chat.completions.create(
                model=self.model,
                messages=[{"role": "user", "content": prompt}],
                temperature=0.3,
                max_tokens=1000,
            )

            response_text = response.choices[0].message.content
            # Extract JSON from response
            try:
                result = json.loads(response_text)
            except json.JSONDecodeError:
                # Try to extract JSON from text
                import re
                json_match = re.search(r'\{.*\}', response_text, re.DOTALL)
                if json_match:
                    result = json.loads(json_match.group())
                else:
                    result = {
                        "score": 5,
                        "is_correct": False,
                        "corrections": [],
                        "explanation": response_text,
                        "improvement_suggestions": [],
                        "grammar_errors": [],
                    }

            return result

        except Exception as e:
            logger.error(f"Error evaluating answer: {e}")
            return {
                "score": 0,
                "is_correct": False,
                "corrections": [],
                "explanation": f"Error: {str(e)}",
                "improvement_suggestions": [],
                "grammar_errors": [],
            }

    async def generate_tutoring_response(
        self,
        user_message: str,
        topic: str,
        difficulty: str,
        short_term_memory: List[Dict],
        long_term_memory: Dict,
        retrieved_context: List[Dict],
    ) -> str:
        """Generate a tutoring response with step-by-step guidance"""

        # Build context
        context_str = ""
        if retrieved_context:
            context_str = "\n\nRelevant Learning Material:\n"
            for item in retrieved_context[:3]:
                context_str += f"- {item['content'][:200]}...\n"

        weak_areas_str = ""
        if long_term_memory.get("weak_areas"):
            weak_areas_str = f"\nStudent's weak areas: {', '.join(long_term_memory['weak_areas'].keys())}"

        system_prompt = f"""You are an expert Italian language tutor for the Prefettura di Milano exam (CEFR {difficulty} level).

TUTORING PRINCIPLES:
1. NEVER give direct answers - guide the student through reasoning
2. Provide: explanation → guided questions → hints → final answer only if needed
3. Adapt to the student's level and weak areas
4. Be encouraging and supportive
5. Correct mistakes with clear explanations
6. Reference past mistakes to help learning

STUDENT PROFILE:
- CEFR Level: {long_term_memory.get('cefr_level', difficulty)}
- Topic: {topic}
- Accuracy: {long_term_memory.get('total_score', 0):.1f}%{weak_areas_str}

{context_str}

Respond in a conversational, supportive tone. Use Italian examples when relevant."""

        messages = [
            {"role": msg["role"], "content": msg["content"]}
            for msg in short_term_memory[-10:]  # Last 10 messages
        ]
        messages.append({"role": "user", "content": user_message})

        response = ""
        async for chunk in self.chat_stream(
            messages=messages[:-1],  # Exclude the last user message from history
            system_prompt=system_prompt,
        ):
            response += chunk

        return response


# Global LLM service instance
llm_service = LLMService()
