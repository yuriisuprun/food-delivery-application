# Italian Language AI Tutor - Testing Guide

## Manual Testing

### 1. Health Check

```bash
# Check backend health
curl http://localhost:8000/api/health

# Expected response:
# {"status":"healthy","service":"Italian Language AI Tutor"}
```

### 2. Seed Content

```bash
# Seed all content
curl -X POST http://localhost:8000/api/admin/seed-all

# Expected response:
# {"status":"success","message":"Seeded X documents"}
```

### 3. Chat Endpoint

```bash
# Send a chat message (streaming)
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "session_id": "session_123",
    "user_id": "user_123",
    "message": "Come si coniuga il verbo parlare al presente?",
    "topic": "grammar",
    "difficulty": "A2"
  }'

# Expected: Streaming response with tutoring explanation
```

### 4. Evaluate Endpoint

```bash
# Evaluate an answer
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

# Expected response:
# {
#   "attempt_id": "attempt_...",
#   "feedback": {
#     "score": 10,
#     "is_correct": true,
#     "corrections": [],
#     "explanation": "...",
#     "improvement_suggestions": [],
#     "grammar_errors": []
#   },
#   "tokens_used": 0
# }
```

### 5. Progress Endpoint

```bash
# Get user progress
curl http://localhost:8000/api/progress/user/user_123

# Expected response:
# {
#   "user_id": "user_123",
#   "cefr_level": "A2",
#   "total_score": 0.0,
#   "total_questions": 0,
#   "weak_areas": {},
#   "skill_progress": [],
#   "recent_mistakes": []
# }
```

### 6. Chat History

```bash
# Get chat history
curl http://localhost:8000/api/chat/history/session_123

# Expected response:
# {
#   "session_id": "session_123",
#   "messages": [...],
#   "topic": "grammar",
#   "difficulty": "A2",
#   "created_at": "...",
#   "updated_at": "..."
# }
```

## Frontend Testing

### 1. Chat Interface
- [ ] Load chat interface
- [ ] Send message
- [ ] Receive streaming response
- [ ] Display message history
- [ ] Switch topics (grammar, vocabulary, reading, listening)
- [ ] Change difficulty level

### 2. Quiz Interface
- [ ] Load quiz
- [ ] Display question
- [ ] Submit answer
- [ ] Display evaluation feedback
- [ ] Show corrections
- [ ] Show improvement suggestions
- [ ] Navigate to next question

### 3. Progress Dashboard
- [ ] Load progress data
- [ ] Display skill progress
- [ ] Show accuracy metrics
- [ ] Display weak areas
- [ ] Show chart visualization

### 4. Navigation
- [ ] Switch between tabs (Chat, Quiz, Progress)
- [ ] Create new session
- [ ] Maintain session state

## API Testing with Postman

### Setup
1. Import the following collection into Postman
2. Set base URL to `http://localhost:8000`

### Test Cases

#### Health Check
```
GET /api/health
Expected: 200 OK
```

#### Seed Content
```
POST /api/admin/seed-all
Expected: 200 OK
Body: {"status":"success","message":"..."}
```

#### Chat (Streaming)
```
POST /api/chat
Headers: Content-Type: application/json
Body: {
  "session_id": "test_session_1",
  "user_id": "test_user_1",
  "message": "Insegnami il presente indicativo",
  "topic": "grammar",
  "difficulty": "A2"
}
Expected: 200 OK with streaming response
```

#### Evaluate Answer
```
POST /api/evaluate
Headers: Content-Type: application/json
Body: {
  "user_id": "test_user_1",
  "question": "Coniuga il verbo 'parlare' alla prima persona singolare",
  "user_answer": "parlo",
  "correct_answer": "parlo",
  "question_type": "open",
  "topic": "grammar"
}
Expected: 200 OK with evaluation feedback
```

#### Get Progress
```
GET /api/progress/user/test_user_1
Expected: 200 OK with user progress data
```

#### Get Chat History
```
GET /api/chat/history/test_session_1
Expected: 200 OK with chat messages
```

## Database Testing

### Connect to PostgreSQL
```bash
psql -U italian_user -d italian_tutor -h localhost
```

### Check Tables
```sql
-- List all tables
\dt

-- Check users
SELECT * FROM users;

-- Check chat sessions
SELECT * FROM chat_sessions;

-- Check chat messages
SELECT * FROM chat_messages;

-- Check mistakes
SELECT * FROM mistakes;

-- Check skill progress
SELECT * FROM skill_progress;

-- Check quiz attempts
SELECT * FROM quiz_attempts;
```

### Sample Queries
```sql
-- Get user with most mistakes
SELECT user_id, COUNT(*) as mistake_count
FROM mistakes
GROUP BY user_id
ORDER BY mistake_count DESC
LIMIT 1;

-- Get weak areas for a user
SELECT skill, AVG(score) as avg_score
FROM skill_progress
WHERE user_id = 'user_123'
GROUP BY skill
ORDER BY avg_score ASC;

-- Get recent chat activity
SELECT session_id, COUNT(*) as message_count
FROM chat_messages
WHERE created_at > NOW() - INTERVAL '24 hours'
GROUP BY session_id
ORDER BY message_count DESC;
```

## Vector Database Testing

### Check Qdrant Health
```bash
curl http://localhost:6333/health
```

### List Collections
```bash
curl http://localhost:6333/collections
```

### Search in Collection
```bash
curl -X POST http://localhost:6333/collections/italian_tutor/points/search \
  -H "Content-Type: application/json" \
  -d '{
    "vector": [0.1, 0.2, 0.3, ...],
    "limit": 5
  }'
```

## Performance Testing

### Load Testing with Apache Bench
```bash
# Test chat endpoint
ab -n 100 -c 10 -p chat_payload.json \
  -T application/json \
  http://localhost:8000/api/chat

# Test evaluate endpoint
ab -n 100 -c 10 -p evaluate_payload.json \
  -T application/json \
  http://localhost:8000/api/evaluate
```

### Load Testing with wrk
```bash
# Install wrk
brew install wrk  # macOS
# or apt-get install wrk  # Linux

# Test chat endpoint
wrk -t4 -c100 -d30s \
  -s chat_test.lua \
  http://localhost:8000/api/chat
```

### Stress Testing
```bash
# Monitor resource usage
docker stats

# Run load test
docker-compose exec backend python -m pytest tests/stress_test.py
```

## Integration Testing

### Test Workflow
1. Create user
2. Create chat session
3. Send message
4. Verify response
5. Evaluate answer
6. Check progress update
7. Verify mistake recording
8. Check weak areas update

### Test Script
```python
import requests
import json

BASE_URL = "http://localhost:8000"

# 1. Seed content
print("Seeding content...")
requests.post(f"{BASE_URL}/api/admin/seed-all")

# 2. Create session
session_id = "test_session_123"
user_id = "test_user_123"

# 3. Send message
print("Sending message...")
response = requests.post(
    f"{BASE_URL}/api/chat",
    json={
        "session_id": session_id,
        "user_id": user_id,
        "message": "Come si coniuga il verbo parlare?",
        "topic": "grammar",
        "difficulty": "A2"
    }
)
print(f"Response: {response.text[:200]}...")

# 4. Evaluate answer
print("Evaluating answer...")
response = requests.post(
    f"{BASE_URL}/api/evaluate",
    json={
        "user_id": user_id,
        "question": "Coniuga 'parlare' al presente",
        "user_answer": "parlo",
        "correct_answer": "parlo",
        "topic": "grammar"
    }
)
print(f"Evaluation: {json.dumps(response.json(), indent=2)}")

# 5. Check progress
print("Checking progress...")
response = requests.get(f"{BASE_URL}/api/progress/user/{user_id}")
print(f"Progress: {json.dumps(response.json(), indent=2)}")
```

## Debugging

### Backend Logs
```bash
# View backend logs
docker logs italian_tutor_backend

# Follow logs
docker logs -f italian_tutor_backend

# View specific error
docker logs italian_tutor_backend | grep ERROR
```

### Frontend Logs
```bash
# View browser console
# Open DevTools (F12) → Console tab

# View frontend logs
docker logs italian_tutor_frontend
```

### Database Logs
```bash
# View PostgreSQL logs
docker logs italian_tutor_postgres

# Connect and check
psql -U italian_user -d italian_tutor -h localhost
```

### Vector DB Logs
```bash
# View Qdrant logs
docker logs italian_tutor_qdrant
```

## Common Issues & Solutions

### Issue: Backend won't start
```bash
# Check logs
docker logs italian_tutor_backend

# Verify environment variables
docker-compose config | grep OPENAI_API_KEY

# Restart service
docker-compose restart backend
```

### Issue: Database connection error
```bash
# Check PostgreSQL is running
docker ps | grep postgres

# Check connection
psql -U italian_user -d italian_tutor -h localhost

# Restart database
docker-compose restart postgres
```

### Issue: Qdrant connection error
```bash
# Check Qdrant is running
docker ps | grep qdrant

# Check health
curl http://localhost:6333/health

# Restart Qdrant
docker-compose restart qdrant
```

### Issue: Frontend won't load
```bash
# Check frontend logs
docker logs italian_tutor_frontend

# Check API URL
echo $NEXT_PUBLIC_API_URL

# Restart frontend
docker-compose restart frontend
```

## Continuous Integration

### GitHub Actions Example
```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      postgres:
        image: postgres:16-alpine
        env:
          POSTGRES_USER: italian_user
          POSTGRES_PASSWORD: italian_pass
          POSTGRES_DB: italian_tutor
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432
      
      qdrant:
        image: qdrant/qdrant:latest
        ports:
          - 6333:6333
    
    steps:
      - uses: actions/checkout@v2
      
      - name: Set up Python
        uses: actions/setup-python@v2
        with:
          python-version: 3.11
      
      - name: Install dependencies
        run: |
          cd backend
          pip install -r requirements.txt
      
      - name: Run tests
        run: |
          cd backend
          pytest tests/
```

## Test Coverage

### Target Coverage
- Backend: 80%+
- Frontend: 70%+
- Integration: 90%+

### Run Coverage
```bash
# Backend
cd backend
pytest --cov=app tests/

# Frontend
cd frontend
npm run test -- --coverage
```
