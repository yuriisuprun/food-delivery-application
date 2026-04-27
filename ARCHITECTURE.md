# Italian Language AI Tutor - Architecture Document

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     Frontend (Next.js)                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │ Chat UI      │  │ Quiz UI      │  │ Progress     │          │
│  │              │  │              │  │ Dashboard    │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│         │                 │                  │                  │
│         └─────────────────┼──────────────────┘                  │
│                           │                                     │
│                    Zustand Store                                │
│                           │                                     │
└───────────────────────────┼─────────────────────────────────────┘
                            │
                    HTTP/SSE │
                            │
┌───────────────────────────┼─────────────────────────────────────┐
│                           ▼                                     │
│                  FastAPI Backend                               │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    API Routes                            │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐              │  │
│  │  │ /chat    │  │/evaluate │  │/progress │              │  │
│  │  └──────────┘  └──────────┘  └──────────┘              │  │
│  └──────────────────────────────────────────────────────────┘  │
│                           │                                     │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              AI Orchestration Layer                      │  │
│  │  ┌──────────────────────────────────────────────────┐   │  │
│  │  │  Memory Service                                  │   │  │
│  │  │  - Short-term (session messages)                │   │  │
│  │  │  - Long-term (user profile, mistakes)           │   │  │
│  │  └──────────────────────────────────────────────────┘   │  │
│  │  ┌──────────────────────────────────────────────────┐   │  │
│  │  │  RAG Service                                     │   │  │
│  │  │  - Query embedding                              │   │  │
│  │  │  - Vector similarity search                      │   │  │
│  │  │  - Context retrieval                            │   │  │
│  │  └──────────────────────────────────────────────────┘   │  │
│  │  ┌──────────────────────────────────────────────────┐   │  │
│  │  │  LLM Service                                     │   │  │
│  │  │  - Chat streaming                               │   │  │
│  │  │  - Answer evaluation                            │   │  │
│  │  │  - Tutoring response generation                 │   │  │
│  │  └──────────────────────────────────────────────────┘   │  │
│  └──────────────────────────────────────────────────────────┘  │
│                           │                                     │
└───────────────┬───────────┼───────────────┬─────────────────────┘
                │           │               │
        ┌───────▼──┐  ┌─────▼──────┐  ┌────▼────────┐
        │PostgreSQL│  │   Qdrant   │  │  OpenAI    │
        │          │  │ (Vector DB)│  │   API      │
        │ Users    │  │            │  │            │
        │ Sessions │  │ Grammar    │  │ GPT-4      │
        │ Messages │  │ Rules      │  │ Turbo      │
        │ Progress │  │ Exams      │  │            │
        │ Mistakes │  │ Vocab      │  │            │
        └──────────┘  └────────────┘  └────────────┘
```

## Component Architecture

### Frontend (Next.js)

#### Pages
- **`app/page.tsx`**: Main dashboard with tab navigation
  - Chat Tutor tab
  - Quiz tab
  - Progress tab

#### Components
- **`ChatInterface.tsx`**: Real-time chat with streaming
  - Message display
  - Input form
  - SSE streaming handler
  
- **`QuizInterface.tsx`**: Quiz and evaluation
  - Question display
  - Answer submission
  - Feedback display
  
- **`ProgressDashboard.tsx`**: Learning analytics
  - Skill progress charts
  - Weak areas visualization
  - Performance metrics

#### State Management (Zustand)
```typescript
interface ChatStore {
  currentSession: ChatSession
  userProgress: UserProgress
  isLoading: boolean
  error: string | null
  
  setCurrentSession()
  addMessage()
  setUserProgress()
  setLoading()
  setError()
}
```

#### API Client
- `lib/api.ts`: Axios-based API client
  - `chatAPI.sendMessage()`: Stream chat response
  - `evaluateAPI.evaluateAnswer()`: Evaluate answer
  - `progressAPI.getUserProgress()`: Fetch progress

### Backend (FastAPI)

#### API Routes

**Chat Endpoints**
```
POST /api/chat
  - Request: ChatRequestSchema
  - Response: StreamingResponse (SSE)
  - Logic: Memory injection → RAG retrieval → LLM generation

GET /api/chat/history/{session_id}
  - Response: ChatHistorySchema
  - Logic: Fetch messages from database
```

**Evaluation Endpoints**
```
POST /api/evaluate
  - Request: EvaluateRequestSchema
  - Response: EvaluateResponseSchema
  - Logic: LLM evaluation → Mistake recording → Progress update
```

**Progress Endpoints**
```
GET /api/progress/user/{user_id}
  - Response: UserProgressSchema
  - Logic: Aggregate skill progress and mistakes

GET /api/progress/topics?user_id={user_id}
  - Response: Topic progress list
  - Logic: Group progress by skill
```

**Admin Endpoints**
```
POST /api/admin/seed-content
  - Logic: Add grammar content to vector DB

POST /api/admin/seed-exams
  - Logic: Add exam questions to vector DB

POST /api/admin/seed-all
  - Logic: Seed all content
```

#### Services

**RAG Service** (`services/rag.py`)
```python
class RAGService:
  - __init__(): Initialize Qdrant client and embeddings
  - add_document(): Chunk and embed document
  - retrieve(): Query vector DB and return results
  - _chunk_text(): Split text into overlapping chunks
```

**LLM Service** (`services/llm.py`)
```python
class LLMService:
  - __init__(): Initialize OpenAI client
  - chat_stream(): Stream chat response
  - evaluate_answer(): Evaluate student answer
  - generate_tutoring_response(): Generate step-by-step response
```

**Memory Service** (`services/memory.py`)
```python
class MemoryService:
  - get_short_term_memory(): Get recent messages
  - get_long_term_memory(): Get user profile
  - record_mistake(): Store mistake for learning
  - update_skill_progress(): Update skill metrics
  - update_weak_areas(): Identify weak areas
```

#### Database Models

**User**
```python
- id: str (Clerk user ID)
- email: str
- name: str
- cefr_level: str (A2, B1, B2)
- total_score: float
- total_questions: int
- weak_areas: dict
- created_at, updated_at: datetime
```

**ChatSession**
```python
- id: str
- user_id: str (FK)
- topic: str (grammar, vocabulary, reading, listening)
- difficulty: str (CEFR level)
- created_at, updated_at: datetime
```

**ChatMessage**
```python
- id: str
- session_id: str (FK)
- role: str (user, assistant)
- content: str
- tokens_used: int
- created_at: datetime
```

**Mistake**
```python
- id: str
- user_id: str (FK)
- topic: str
- mistake_type: str
- user_answer: str
- correct_answer: str
- explanation: str
- frequency: int
- created_at, updated_at: datetime
```

**SkillProgress**
```python
- id: str
- user_id: str (FK)
- skill: str
- level: str (CEFR)
- score: float (0-100)
- attempts: int
- correct_answers: int
- last_practiced: datetime
- created_at, updated_at: datetime
```

**QuizAttempt**
```python
- id: str
- user_id: str (FK)
- quiz_id: str
- question_id: str
- user_answer: str
- correct_answer: str
- score: float (0-10)
- feedback: str
- time_spent: int (seconds)
- created_at: datetime
```

### Data Flow

#### Chat Flow
```
1. User sends message
   ↓
2. Frontend: Store message in Zustand
   ↓
3. Frontend: Send to /api/chat (streaming)
   ↓
4. Backend: Get short-term memory (last 20 messages)
   ↓
5. Backend: Get long-term memory (user profile, weak areas)
   ↓
6. Backend: RAG retrieval (query embedding → vector search)
   ↓
7. Backend: Build system prompt with context
   ↓
8. Backend: Call OpenAI API with streaming
   ↓
9. Backend: Stream response via SSE
   ↓
10. Frontend: Display streamed response
    ↓
11. Backend: Store message in database
```

#### Evaluation Flow
```
1. User submits answer
   ↓
2. Frontend: Send to /api/evaluate
   ↓
3. Backend: Call LLM to evaluate
   ↓
4. Backend: Parse evaluation result
   ↓
5. Backend: Record mistake if incorrect
   ↓
6. Backend: Update skill progress
   ↓
7. Backend: Update weak areas
   ↓
8. Backend: Return feedback to frontend
   ↓
9. Frontend: Display evaluation results
```

## Memory System

### Short-Term Memory
- **Storage**: Last 10-20 messages in current session
- **Purpose**: Provide immediate context for LLM
- **Injection**: Included in every LLM prompt
- **Lifecycle**: Cleared when session ends

### Long-Term Memory
- **Storage**: User profile in database
  - CEFR level
  - Weak areas (skills with <70% accuracy)
  - Recent mistakes (last 30 days)
  - Skill progress per topic
  - Total score and questions
  
- **Purpose**: Personalize learning experience
- **Update**: After each evaluation
- **Lifecycle**: Persistent across sessions

### Memory Injection Strategy
```python
system_prompt = f"""
You are an Italian language tutor.

STUDENT PROFILE:
- CEFR Level: {long_term_memory['cefr_level']}
- Weak Areas: {', '.join(long_term_memory['weak_areas'].keys())}
- Recent Mistakes: {long_term_memory['recent_mistakes']}

CONVERSATION CONTEXT:
{short_term_memory}

TUTORING PRINCIPLES:
1. Never give direct answers
2. Guide step-by-step
3. Adapt to student level
4. Reference past mistakes
"""
```

## RAG System

### Vector Database (Qdrant)
- **Collection**: `italian_tutor`
- **Vector Size**: 1536 (text-embedding-3-small)
- **Distance Metric**: Cosine similarity

### Content Types
1. **Grammar Rules**
   - Present tense conjugation
   - Past tense (passato prossimo)
   - Gender and agreement
   - Prepositions
   - etc.

2. **Exam Questions**
   - Multiple choice
   - Open-ended
   - Reading comprehension
   - Listening exercises

3. **Vocabulary**
   - Common words (A1-B1)
   - Thematic groups
   - Exam-specific terms

### Retrieval Process
```python
1. User query → Embedding (text-embedding-3-small)
2. Vector search in Qdrant (top-5 results)
3. Filter by metadata (topic, difficulty)
4. Return relevant chunks with scores
5. Inject into LLM prompt
```

### Chunking Strategy
- **Chunk Size**: 500 characters
- **Overlap**: 50 characters
- **Purpose**: Preserve context while managing token limits

## LLM Integration

### Model: GPT-4 Turbo
- **Temperature**: 0.7 (balanced creativity)
- **Max Tokens**: 2000
- **Top P**: 0.9

### Streaming
- **Protocol**: Server-Sent Events (SSE)
- **Purpose**: Real-time response display
- **Implementation**: OpenAI streaming API

### Tutoring Prompt Structure
```
System Prompt:
- Role definition
- Student profile
- Tutoring principles
- Weak areas
- Recent mistakes

User Messages:
- Conversation history (last 10 messages)
- Current question

Response Format:
- Step-by-step explanation
- Guided questions
- Hints
- Final answer (if needed)
```

## Authentication & Security

### Current Implementation
- No authentication (MVP)
- User ID hardcoded as `user_123`

### Production Implementation
- **Clerk.dev Integration**
  - JWT token validation
  - User session management
  - Protected routes

### Security Measures
- **Input Validation**: Pydantic schemas
- **CORS**: Configured allowed origins
- **Rate Limiting**: To be implemented
- **API Keys**: Environment variables
- **Database**: Connection pooling

## Performance Considerations

### Backend
- **Connection Pooling**: SQLAlchemy pool_size=10
- **Async Operations**: FastAPI async/await
- **Caching**: RAG results (to be implemented)
- **Batch Operations**: Bulk inserts for seeding

### Frontend
- **Code Splitting**: Next.js automatic
- **Lazy Loading**: React.lazy for components
- **State Management**: Zustand (lightweight)
- **API Caching**: React Query (to be implemented)

### Database
- **Indexes**: On frequently queried columns
- **Query Optimization**: Efficient joins
- **Connection Limits**: Configured per environment

## Scalability

### Horizontal Scaling
- **Backend**: Stateless FastAPI instances
- **Load Balancer**: Nginx/HAProxy
- **Database**: PostgreSQL replication
- **Vector DB**: Qdrant clustering

### Vertical Scaling
- **Increase Resources**: CPU, RAM
- **Optimize Queries**: Add indexes
- **Cache Strategy**: Redis for session data

## Monitoring & Observability

### Logging
- **Backend**: Python logging module
- **Frontend**: Console logs
- **Database**: PostgreSQL logs
- **Vector DB**: Qdrant logs

### Error Tracking
- **Sentry Integration**: Error reporting
- **Health Checks**: `/api/health` endpoint
- **Metrics**: Request/response times

### Debugging
- **API Documentation**: Swagger UI at `/docs`
- **Database Inspection**: psql CLI
- **Vector DB Inspection**: Qdrant web UI

## Deployment

### Development
- Docker Compose for local development
- Hot reload for backend and frontend
- SQLite option for quick testing

### Production
- Kubernetes for orchestration
- Managed PostgreSQL (AWS RDS, Azure Database)
- Managed Qdrant (Qdrant Cloud)
- CDN for frontend assets
- SSL/TLS certificates

## Future Enhancements

### Phase 2
- User authentication (Clerk.dev)
- More Italian content (500+ grammar rules)
- Spaced repetition algorithm
- Mobile app (React Native)

### Phase 3
- Advanced analytics
- Peer learning features
- Video lessons
- Gamification (points, badges)
- Multiple languages

### Phase 4
- AI-generated practice exams
- Voice input/output
- Real-time collaboration
- Advanced NLP features
