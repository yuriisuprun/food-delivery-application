# Italian Language AI Tutor - API Documentation

## Base URL

```
http://localhost:8000
```

## Authentication

Currently MVP - no authentication required. Production will use Clerk.dev JWT tokens.

## Response Format

All responses are JSON. Errors follow this format:

```json
{
  "detail": "Error message"
}
```

## Endpoints

### Health Check

#### GET /api/health

Check if the backend is running.

**Response:**
```json
{
  "status": "healthy",
  "service": "Italian Language AI Tutor"
}
```

**Status Code:** 200

---

### Chat

#### POST /api/chat

Send a message to the AI tutor and receive a streaming response.

**Request:**
```json
{
  "session_id": "string (required)",
  "user_id": "string (required)",
  "message": "string (required)",
  "topic": "string (optional, default: 'general')",
  "difficulty": "string (optional, default: 'A2')"
}
```

**Parameters:**
- `session_id`: Unique session identifier
- `user_id`: User identifier
- `message`: User's question or message
- `topic`: Learning topic (grammar, vocabulary, reading, listening)
- `difficulty`: CEFR level (A1, A2, B1, B2)

**Response:**
- Content-Type: `text/event-stream`
- Streaming text response from the tutor

**Example:**
```bash
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "session_id": "session_123",
    "user_id": "user_123",
    "message": "Come si coniuga il verbo parlare al presente?",
    "topic": "grammar",
    "difficulty": "A2"
  }'
```

**Status Code:** 200

---

#### GET /api/chat/history/{session_id}

Get chat history for a specific session.

**Parameters:**
- `session_id` (path): Session identifier

**Response:**
```json
{
  "session_id": "string",
  "messages": [
    {
      "role": "user|assistant",
      "content": "string"
    }
  ],
  "topic": "string",
  "difficulty": "string",
  "created_at": "ISO 8601 datetime",
  "updated_at": "ISO 8601 datetime"
}
```

**Example:**
```bash
curl http://localhost:8000/api/chat/history/session_123
```

**Status Code:** 200 or 404 (if session not found)

---

### Evaluation

#### POST /api/evaluate

Evaluate a student's answer and provide feedback.

**Request:**
```json
{
  "user_id": "string (required)",
  "question": "string (required)",
  "user_answer": "string (required)",
  "correct_answer": "string (optional)",
  "question_type": "string (optional, default: 'open')",
  "topic": "string (optional, default: 'general')"
}
```

**Parameters:**
- `user_id`: User identifier
- `question`: The question asked
- `user_answer`: Student's answer
- `correct_answer`: Correct answer (for multiple choice)
- `question_type`: 'open' or 'multiple_choice'
- `topic`: Learning topic

**Response:**
```json
{
  "attempt_id": "string",
  "feedback": {
    "score": 0-10,
    "is_correct": boolean,
    "corrections": ["string"],
    "explanation": "string",
    "improvement_suggestions": ["string"],
    "grammar_errors": [
      {
        "error": "string",
        "correction": "string",
        "explanation": "string"
      }
    ]
  },
  "tokens_used": 0
}
```

**Example:**
```bash
curl -X POST http://localhost:8000/api/evaluate \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "user_123",
    "question": "Completa: Ieri io _____ al cinema",
    "user_answer": "sono andato",
    "correct_answer": "sono andato",
    "question_type": "open",
    "topic": "grammar"
  }'
```

**Status Code:** 200

---

### Progress

#### GET /api/progress/user/{user_id}

Get overall progress for a user.

**Parameters:**
- `user_id` (path): User identifier

**Response:**
```json
{
  "user_id": "string",
  "cefr_level": "string",
  "total_score": number,
  "total_questions": number,
  "weak_areas": {
    "skill_name": number
  },
  "skill_progress": [
    {
      "skill": "string",
      "level": "string",
      "score": number,
      "attempts": number,
      "correct_answers": number,
      "accuracy": number
    }
  ],
  "recent_mistakes": [
    {
      "topic": "string",
      "mistake_type": "string",
      "frequency": number,
      "explanation": "string"
    }
  ]
}
```

**Example:**
```bash
curl http://localhost:8000/api/progress/user/user_123
```

**Status Code:** 200 or 404 (if user not found)

---

#### GET /api/progress/topics

Get progress by topic for a user.

**Query Parameters:**
- `user_id` (required): User identifier

**Response:**
```json
{
  "topics": [
    {
      "skill": "string",
      "level": "string",
      "score": number,
      "accuracy": number,
      "last_practiced": "ISO 8601 datetime or null"
    }
  ]
}
```

**Example:**
```bash
curl "http://localhost:8000/api/progress/topics?user_id=user_123"
```

**Status Code:** 200

---

### Admin

#### POST /api/admin/seed-content

Seed Italian grammar content into the vector database.

**Response:**
```json
{
  "status": "success",
  "message": "Seeded X grammar documents"
}
```

**Example:**
```bash
curl -X POST http://localhost:8000/api/admin/seed-content
```

**Status Code:** 200

---

#### POST /api/admin/seed-exams

Seed exam questions into the vector database.

**Response:**
```json
{
  "status": "success",
  "message": "Seeded X exam questions"
}
```

**Example:**
```bash
curl -X POST http://localhost:8000/api/admin/seed-exams
```

**Status Code:** 200

---

#### POST /api/admin/seed-all

Seed all content (grammar + exams) into the vector database.

**Response:**
```json
{
  "status": "success",
  "message": "Seeded X documents"
}
```

**Example:**
```bash
curl -X POST http://localhost:8000/api/admin/seed-all
```

**Status Code:** 200

---

## Data Types

### CEFR Levels
- `A1` - Beginner
- `A2` - Elementary
- `B1` - Intermediate
- `B2` - Upper Intermediate

### Topics
- `grammar` - Grammar rules and conjugation
- `vocabulary` - Vocabulary and word meanings
- `reading` - Reading comprehension
- `listening` - Listening comprehension
- `writing` - Writing skills
- `general` - General conversation

### Question Types
- `open` - Open-ended question
- `multiple_choice` - Multiple choice question

### Skills
- `grammar` - Grammar proficiency
- `vocabulary` - Vocabulary knowledge
- `reading` - Reading comprehension
- `listening` - Listening comprehension
- `writing` - Writing ability

---

## Error Responses

### 400 Bad Request
```json
{
  "detail": "Invalid request parameters"
}
```

### 404 Not Found
```json
{
  "detail": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "detail": "Internal server error"
}
```

---

## Rate Limiting

Currently no rate limiting. Production will implement:
- 100 requests per minute per user
- 1000 requests per minute per IP

---

## Pagination

Not currently implemented. Future versions will support:
- `limit`: Number of results (default: 20, max: 100)
- `offset`: Number of results to skip (default: 0)

---

## Filtering

Not currently implemented. Future versions will support filtering by:
- Date range
- Topic
- Difficulty level
- Accuracy range

---

## Sorting

Not currently implemented. Future versions will support sorting by:
- Date
- Score
- Accuracy
- Frequency

---

## Webhooks

Not currently implemented. Future versions will support webhooks for:
- User progress updates
- Milestone achievements
- Error notifications

---

## API Versioning

Current version: `v1` (implicit)

Future versions will use:
- `/api/v1/...`
- `/api/v2/...`

---

## CORS

Allowed origins (configurable in `backend/app/core/config.py`):
- `http://localhost:3000`
- `http://localhost:8000`
- `http://127.0.0.1:3000`

---

## Content Types

- Request: `application/json`
- Response: `application/json` or `text/event-stream` (for streaming)

---

## Timeouts

- Default timeout: 30 seconds
- Streaming timeout: 60 seconds

---

## Retry Policy

Recommended retry strategy:
- Retry on 5xx errors
- Exponential backoff: 1s, 2s, 4s, 8s
- Max retries: 3

---

## Examples

### Complete Chat Flow

```bash
# 1. Seed content
curl -X POST http://localhost:8000/api/admin/seed-all

# 2. Send message
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "session_id": "session_1",
    "user_id": "user_1",
    "message": "Insegnami il presente indicativo",
    "topic": "grammar",
    "difficulty": "A2"
  }'

# 3. Get chat history
curl http://localhost:8000/api/chat/history/session_1

# 4. Evaluate answer
curl -X POST http://localhost:8000/api/evaluate \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "user_1",
    "question": "Coniuga parlare",
    "user_answer": "parlo, parli, parla, parliamo, parlate, parlano",
    "correct_answer": "parlo, parli, parla, parliamo, parlate, parlano",
    "topic": "grammar"
  }'

# 5. Check progress
curl http://localhost:8000/api/progress/user/user_1
```

### Python Client Example

```python
import requests
import json

BASE_URL = "http://localhost:8000"

# Send message
response = requests.post(
    f"{BASE_URL}/api/chat",
    json={
        "session_id": "session_1",
        "user_id": "user_1",
        "message": "Come si coniuga il verbo essere?",
        "topic": "grammar",
        "difficulty": "A2"
    }
)

# Stream response
for line in response.iter_lines():
    if line:
        print(line.decode('utf-8'))

# Evaluate answer
response = requests.post(
    f"{BASE_URL}/api/evaluate",
    json={
        "user_id": "user_1",
        "question": "Coniuga essere al presente",
        "user_answer": "sono, sei, è, siamo, siete, sono",
        "correct_answer": "sono, sei, è, siamo, siete, sono",
        "topic": "grammar"
    }
)

feedback = response.json()
print(json.dumps(feedback, indent=2))
```

### JavaScript/TypeScript Client Example

```typescript
// Send message with streaming
async function sendMessage(message: string) {
  const response = await fetch('http://localhost:8000/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      session_id: 'session_1',
      user_id: 'user_1',
      message: message,
      topic: 'grammar',
      difficulty: 'A2',
    }),
  })

  const reader = response.body?.getReader()
  const decoder = new TextDecoder()

  while (true) {
    const { done, value } = await reader!.read()
    if (done) break
    console.log(decoder.decode(value))
  }
}

// Evaluate answer
async function evaluateAnswer(answer: string) {
  const response = await fetch('http://localhost:8000/api/evaluate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_id: 'user_1',
      question: 'Coniuga parlare',
      user_answer: answer,
      correct_answer: 'parlo, parli, parla, parliamo, parlate, parlano',
      topic: 'grammar',
    }),
  })

  return response.json()
}
```

---

## Swagger UI

Interactive API documentation available at:
```
http://localhost:8000/docs
```

Alternative (ReDoc):
```
http://localhost:8000/redoc
```

---

## OpenAPI Schema

Download OpenAPI schema:
```
http://localhost:8000/openapi.json
```

---

## Support

For API issues:
1. Check this documentation
2. Review logs: `docker logs italian_tutor_backend`
3. Check Swagger UI: `http://localhost:8000/docs`
4. Review TESTING.md for debugging procedures
