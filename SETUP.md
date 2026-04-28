# Italian Language AI Tutor - Setup Guide

## Prerequisites

- Docker & Docker Compose (recommended for easy setup)
- Python 3.11+ (if running without Docker)
- Node.js 18+ (if running without Docker)
- OpenAI API key

## Quick Start with Docker (Recommended)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd italian-tutor
```

### 2. Set Environment Variables

Create `.env` file in the root directory:
```bash
OPENAI_API_KEY=sk-your-openai-api-key-here
```

### 3. Start All Services
```bash
docker-compose up -d
```

This will start:
- PostgreSQL at `localhost:5432`
- Qdrant at `localhost:6333`
- FastAPI Backend at `http://localhost:8000`
- Next.js Frontend at `http://localhost:3335`

### 4. Seed Initial Content

```bash
# Seed grammar content
curl -X POST http://localhost:8000/api/admin/seed-content

# Seed exam questions
curl -X POST http://localhost:8000/api/admin/seed-exams

# Or seed everything at once
curl -X POST http://localhost:8000/api/admin/seed-all
```

### 5. Access the Application

Open your browser and navigate to:
```
http://localhost:3335
```

## Manual Setup (Without Docker)

### Backend Setup

#### 1. Create Python Virtual Environment
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

#### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

#### 3. Set Environment Variables
Create `.env` file in `backend/`:
```
OPENAI_API_KEY=sk-your-key
DATABASE_URL=postgresql://italian_user:italian_pass@localhost:5432/italian_tutor
QDRANT_URL=http://localhost:6333
ENVIRONMENT=development
DEBUG=true
```

#### 4. Start PostgreSQL
```bash
# Using Docker
docker run -d \
  --name italian_postgres \
  -e POSTGRES_USER=italian_user \
  -e POSTGRES_PASSWORD=italian_pass \
  -e POSTGRES_DB=italian_tutor \
  -p 5432:5432 \
  postgres:16-alpine
```

#### 5. Start Qdrant
```bash
# Using Docker
docker run -d \
  --name italian_qdrant \
  -p 6333:6333 \
  qdrant/qdrant:latest
```

#### 6. Run Database Migrations
```bash
# The schema is created automatically on first run
# Or manually:
psql -U italian_user -d italian_tutor -f sql/schema.sql
```

#### 7. Start Backend Server
```bash
uvicorn app.main:app --reload
```

Backend will be available at `http://localhost:8000`

### Frontend Setup

#### 1. Install Dependencies
```bash
cd frontend
npm install
```

#### 2. Set Environment Variables
Create `.env.local` file in `frontend/`:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

#### 3. Start Development Server
```bash
npm run dev
```

Frontend will be available at `http://localhost:3335`

## API Endpoints

### Chat
- `POST /api/chat` - Send message to tutor (streaming)
- `GET /api/chat/history/{session_id}` - Get chat history

### Evaluation
- `POST /api/evaluate` - Evaluate written answer

### Progress
- `GET /api/progress/user/{user_id}` - Get user progress
- `GET /api/progress/topics?user_id={user_id}` - Get topic progress

### Admin
- `POST /api/admin/seed-content` - Seed grammar content
- `POST /api/admin/seed-exams` - Seed exam questions
- `POST /api/admin/seed-all` - Seed all content

## Project Structure

```
italian-tutor/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   └── routes/
│   │   │       ├── chat.py
│   │   │       ├── evaluate.py
│   │   │       ├── progress.py
│   │   │       ├── admin.py
│   │   │       └── health.py
│   │   ├── core/
│   │   │   ├── config.py
│   │   │   └── database.py
│   │   ├── models/
│   │   │   ├── user.py
│   │   │   ├── chat.py
│   │   │   └── learning.py
│   │   ├── schemas/
│   │   │   ├── chat.py
│   │   │   ├── evaluate.py
│   │   │   └── progress.py
│   │   ├── services/
│   │   │   ├── rag.py
│   │   │   ├── llm.py
│   │   │   └── memory.py
│   │   └── main.py
│   ├── sql/
│   │   └── schema.sql
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .env.example
├── frontend/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── ChatInterface.tsx
│   │   ├── ProgressDashboard.tsx
│   │   └── QuizInterface.tsx
│   ├── lib/
│   │   ├── store.ts
│   │   └── api.ts
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.ts
│   ├── next.config.js
│   ├── Dockerfile
│   └── .env.example
├── docker-compose.yml
├── README.md
└── SETUP.md
```

## Features

### 1. Context-Aware Tutoring
- Tracks student knowledge level (CEFR A2/B1)
- Detects weak grammar/vocabulary areas
- Adapts explanations based on past mistakes

### 2. Step-by-Step Teaching
- Never gives direct answers
- Provides: explanation → guided reasoning → hints → final answer
- Corrects mistakes with detailed explanations

### 3. Long-Term Learning Memory
- Stores mistakes and progress over time
- Skill level per topic (grammar, reading, writing, listening)
- Personalizes future lessons

### 4. RAG System
- Vector DB (Qdrant) stores Italian grammar rules, exam samples, vocabulary
- Retrieves relevant context before answering
- Grounds explanations in real exam content

### 5. Real-Time Chat
- Server-Sent Events (SSE) for streaming responses
- Token-by-token LLM output
- Responsive chat interface

### 6. Evaluation Engine
- AI grading system for written answers
- Grammar correctness checking
- CEFR-based scoring
- Detailed correction feedback

## Troubleshooting

### Backend Issues

#### Port Already in Use
```bash
# Find process using port 8000
lsof -i :8000
# Kill process
kill -9 <PID>
```

#### Database Connection Error
```bash
# Check PostgreSQL is running
docker ps | grep postgres

# Check connection
psql -U italian_user -d italian_tutor -h localhost
```

#### Qdrant Connection Error
```bash
# Check Qdrant is running
docker ps | grep qdrant

# Check health
curl http://localhost:6333/health
```

### Frontend Issues

#### Port Already in Use
```bash
# Find process using port 3335
lsof -i :3335
# Kill process
kill -9 <PID>
```

#### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## Development

### Adding New Grammar Content

Edit `backend/app/api/routes/admin.py` and add to `GRAMMAR_CONTENT`:

```python
"new_topic": {
    "content": "Your grammar explanation...",
    "metadata": {
        "topic": "grammar",
        "subtopic": "new_topic",
        "cefr_level": "A2",
        "difficulty": 1,
    },
}
```

Then seed:
```bash
curl -X POST http://localhost:8000/api/admin/seed-all
```

### Adding New Exam Questions

Edit `backend/app/api/routes/admin.py` and add to `EXAM_QUESTIONS`:

```python
"q_new": {
    "content": "Question and answer...",
    "metadata": {
        "topic": "exam",
        "question_type": "multiple_choice",
        "cefr_level": "A2",
        "skill": "grammar",
    },
}
```

### Extending the Frontend

Components are in `frontend/components/`. Add new components and import them in `frontend/app/page.tsx`.

## Performance Optimization

### Backend
- Use connection pooling (already configured)
- Cache RAG results
- Implement rate limiting
- Use async/await for I/O operations

### Frontend
- Implement code splitting
- Use React.memo for expensive components
- Optimize images
- Implement lazy loading

## Security Considerations

1. **API Keys**: Never commit `.env` files
2. **Database**: Use strong passwords in production
3. **CORS**: Configure allowed origins in `backend/app/core/config.py`
4. **Authentication**: Implement Clerk.dev integration for production
5. **Rate Limiting**: Add rate limiting middleware
6. **Input Validation**: All inputs are validated with Pydantic

## Monitoring

### Logs
```bash
# Backend logs
docker logs italian_tutor_backend

# Frontend logs
docker logs italian_tutor_frontend

# Database logs
docker logs italian_tutor_postgres
```

### Health Checks
```bash
# Backend health
curl http://localhost:8000/api/health

# Qdrant health
curl http://localhost:6333/health
```

## Next Steps

1. **Authentication**: Integrate Clerk.dev for user management
2. **More Content**: Add more Italian grammar rules and exam questions
3. **Analytics**: Implement Sentry for error tracking
4. **Mobile**: Build mobile app with React Native
5. **Gamification**: Add points, badges, leaderboards
6. **Advanced Features**: 
   - Spaced repetition algorithm
   - Personalized learning paths
   - Peer learning features
   - Video lessons

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review logs
3. Check API documentation at `http://localhost:8000/docs`

## License

MIT
