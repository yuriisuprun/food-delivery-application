# Italian Language AI Tutor - Complete Project Structure

## 📁 Directory Tree

```
italian-tutor/
│
├── 📄 README.md                          # Project overview and features
├── 📄 SETUP.md                           # Installation and setup guide
├── 📄 ARCHITECTURE.md                    # System architecture documentation
├── 📄 TESTING.md                         # Testing guide and procedures
├── 📄 PROJECT_STRUCTURE.md               # This file
├── 📄 docker-compose.yml                 # Docker Compose configuration
├── 📄 start.sh                           # Quick start script
│
├── 📁 backend/                           # FastAPI Backend
│   ├── 📄 requirements.txt               # Python dependencies
│   ├── 📄 Dockerfile                     # Backend Docker image
│   ├── 📄 .env.example                   # Environment variables template
│   ├── 📄 .gitignore                     # Git ignore rules
│   │
│   ├── 📁 app/                           # Main application
│   │   ├── 📄 __init__.py
│   │   ├── 📄 main.py                    # FastAPI app entry point
│   │   │
│   │   ├── 📁 api/                       # API routes
│   │   │   ├── 📄 __init__.py
│   │   │   └── 📁 routes/
│   │   │       ├── 📄 __init__.py
│   │   │       ├── 📄 health.py          # Health check endpoint
│   │   │       ├── 📄 chat.py            # Chat endpoints
│   │   │       ├── 📄 evaluate.py        # Evaluation endpoints
│   │   │       ├── 📄 progress.py        # Progress tracking endpoints
│   │   │       └── 📄 admin.py           # Admin endpoints (seeding)
│   │   │
│   │   ├── 📁 core/                      # Core configuration
│   │   │   ├── 📄 __init__.py
│   │   │   ├── 📄 config.py              # Settings and configuration
│   │   │   └── 📄 database.py            # Database setup
│   │   │
│   │   ├── 📁 models/                    # Database models
│   │   │   ├── 📄 __init__.py
│   │   │   ├── 📄 user.py                # User model
│   │   │   ├── 📄 chat.py                # Chat session and message models
│   │   │   └── 📄 learning.py            # Learning progress models
│   │   │
│   │   ├── 📁 schemas/                   # Pydantic schemas
│   │   │   ├── 📄 chat.py                # Chat request/response schemas
│   │   │   ├── 📄 evaluate.py            # Evaluation schemas
│   │   │   └── 📄 progress.py            # Progress schemas
│   │   │
│   │   └── 📁 services/                  # Business logic services
│   │       ├── 📄 __init__.py
│   │       ├── 📄 rag.py                 # RAG service (vector DB)
│   │       ├── 📄 llm.py                 # LLM service (OpenAI)
│   │       └── 📄 memory.py              # Memory management service
│   │
│   └── 📁 sql/                           # Database schema
│       └── 📄 schema.sql                 # PostgreSQL schema
│
├── 📁 frontend/                          # Next.js Frontend
│   ├── 📄 package.json                   # Node dependencies
│   ├── 📄 tsconfig.json                  # TypeScript configuration
│   ├── 📄 tailwind.config.ts             # Tailwind CSS configuration
│   ├── 📄 next.config.js                 # Next.js configuration
│   ├── 📄 Dockerfile                     # Frontend Docker image
│   ├── 📄 .env.example                   # Environment variables template
│   ├── 📄 .gitignore                     # Git ignore rules
│   │
│   ├── 📁 app/                           # Next.js app directory
│   │   ├── 📄 page.tsx                   # Main dashboard page
│   │   ├── 📄 layout.tsx                 # Root layout
│   │   └── 📄 globals.css                # Global styles
│   │
│   ├── 📁 components/                    # React components
│   │   ├── 📄 ChatInterface.tsx          # Chat UI component
│   │   ├── 📄 QuizInterface.tsx          # Quiz UI component
│   │   └── 📄 ProgressDashboard.tsx      # Progress dashboard component
│   │
│   ├── 📁 lib/                           # Utility functions
│   │   ├── 📄 store.ts                   # Zustand state management
│   │   └── 📄 api.ts                     # API client
│   │
│   └── 📁 public/                        # Static assets
│       └── (favicon, images, etc.)
│
└── 📁 .git/                              # Git repository
```

## 📋 File Descriptions

### Root Files

| File | Purpose |
|------|---------|
| `README.md` | Project overview, features, quick start |
| `SETUP.md` | Detailed setup instructions for all environments |
| `ARCHITECTURE.md` | System design, data flow, component architecture |
| `TESTING.md` | Testing procedures, manual tests, debugging |
| `PROJECT_STRUCTURE.md` | This file - project organization |
| `docker-compose.yml` | Docker services configuration |
| `start.sh` | Automated quick start script |

### Backend Files

#### Core Application (`backend/app/`)

| File | Purpose |
|------|---------|
| `main.py` | FastAPI app initialization, middleware, routes |
| `core/config.py` | Settings, environment variables, configuration |
| `core/database.py` | Database connection, session management |

#### API Routes (`backend/app/api/routes/`)

| File | Purpose |
|------|---------|
| `health.py` | Health check endpoint |
| `chat.py` | Chat streaming endpoint, message storage |
| `evaluate.py` | Answer evaluation endpoint |
| `progress.py` | Progress tracking endpoints |
| `admin.py` | Admin endpoints for content seeding |

#### Database Models (`backend/app/models/`)

| File | Purpose |
|------|---------|
| `user.py` | User model with profile data |
| `chat.py` | ChatSession and ChatMessage models |
| `learning.py` | Mistake, SkillProgress, QuizAttempt models |

#### Schemas (`backend/app/schemas/`)

| File | Purpose |
|------|---------|
| `chat.py` | Chat request/response validation |
| `evaluate.py` | Evaluation request/response validation |
| `progress.py` | Progress data validation |

#### Services (`backend/app/services/`)

| File | Purpose |
|------|---------|
| `rag.py` | RAG service - vector DB operations |
| `llm.py` | LLM service - OpenAI integration |
| `memory.py` | Memory service - short/long-term memory |

#### Database (`backend/sql/`)

| File | Purpose |
|------|---------|
| `schema.sql` | PostgreSQL schema definition |

#### Configuration

| File | Purpose |
|------|---------|
| `requirements.txt` | Python package dependencies |
| `Dockerfile` | Docker image for backend |
| `.env.example` | Environment variables template |
| `.gitignore` | Git ignore rules |

### Frontend Files

#### App (`frontend/app/`)

| File | Purpose |
|------|---------|
| `page.tsx` | Main dashboard with tabs and navigation |
| `layout.tsx` | Root layout wrapper |
| `globals.css` | Global styles and animations |

#### Components (`frontend/components/`)

| File | Purpose |
|------|---------|
| `ChatInterface.tsx` | Chat UI with streaming messages |
| `QuizInterface.tsx` | Quiz UI with evaluation |
| `ProgressDashboard.tsx` | Progress visualization |

#### Library (`frontend/lib/`)

| File | Purpose |
|------|---------|
| `store.ts` | Zustand state management |
| `api.ts` | Axios API client |

#### Configuration

| File | Purpose |
|------|---------|
| `package.json` | Node dependencies and scripts |
| `tsconfig.json` | TypeScript configuration |
| `tailwind.config.ts` | Tailwind CSS configuration |
| `next.config.js` | Next.js configuration |
| `Dockerfile` | Docker image for frontend |
| `.env.example` | Environment variables template |
| `.gitignore` | Git ignore rules |

## 🔄 Data Flow

### Chat Flow
```
Frontend (ChatInterface.tsx)
    ↓ (user message)
Zustand Store (useChatStore)
    ↓ (HTTP POST)
Backend (routes/chat.py)
    ↓
Services (memory.py, rag.py, llm.py)
    ↓
Database (PostgreSQL) + Vector DB (Qdrant) + LLM (OpenAI)
    ↓ (SSE streaming)
Frontend (display response)
    ↓
Database (store message)
```

### Evaluation Flow
```
Frontend (QuizInterface.tsx)
    ↓ (answer submission)
Backend (routes/evaluate.py)
    ↓
LLM Service (evaluate_answer)
    ↓
OpenAI API
    ↓
Memory Service (record_mistake, update_progress)
    ↓
Database (store attempt, update progress)
    ↓
Frontend (display feedback)
```

## 🗄️ Database Schema

### Tables

1. **users** - User profiles
2. **chat_sessions** - Chat session metadata
3. **chat_messages** - Individual messages
4. **mistakes** - Recorded mistakes
5. **skill_progress** - Progress per skill
6. **quiz_attempts** - Quiz attempt records

### Relationships
```
users (1) ──→ (many) chat_sessions
users (1) ──→ (many) mistakes
users (1) ──→ (many) skill_progress
users (1) ──→ (many) quiz_attempts
chat_sessions (1) ──→ (many) chat_messages
```

## 🔌 External Services

| Service | Purpose | Configuration |
|---------|---------|----------------|
| OpenAI API | LLM for tutoring | `OPENAI_API_KEY` |
| PostgreSQL | User data storage | `DATABASE_URL` |
| Qdrant | Vector DB for RAG | `QDRANT_URL` |
| Clerk.dev | Authentication (future) | `CLERK_SECRET_KEY` |

## 📦 Dependencies

### Backend
- **FastAPI**: Web framework
- **SQLAlchemy**: ORM
- **Pydantic**: Data validation
- **OpenAI**: LLM API
- **LangChain**: LLM orchestration
- **Qdrant Client**: Vector DB client
- **psycopg2**: PostgreSQL driver

### Frontend
- **Next.js**: React framework
- **React**: UI library
- **Zustand**: State management
- **Tailwind CSS**: Styling
- **shadcn/ui**: UI components
- **Axios**: HTTP client
- **React Hook Form**: Form handling

## 🚀 Deployment

### Development
- Docker Compose for local setup
- Hot reload enabled
- Debug mode on

### Production
- Kubernetes orchestration
- Managed databases
- CDN for frontend
- SSL/TLS certificates
- Environment-specific configs

## 📊 Monitoring

### Logs
- Backend: Python logging
- Frontend: Browser console
- Database: PostgreSQL logs
- Vector DB: Qdrant logs

### Health Checks
- `/api/health` - Backend health
- `http://localhost:6333/health` - Qdrant health
- Database connection test

### Metrics
- Request/response times
- Error rates
- Token usage
- Database query performance

## 🔐 Security

### Current (MVP)
- No authentication
- CORS configured
- Input validation with Pydantic
- Environment variables for secrets

### Production
- Clerk.dev authentication
- JWT token validation
- Rate limiting
- HTTPS/TLS
- Database encryption
- API key rotation

## 📈 Scalability

### Horizontal
- Stateless backend instances
- Load balancer
- Database replication
- Vector DB clustering

### Vertical
- Increase resources
- Query optimization
- Caching strategy
- Connection pooling

## 🧪 Testing

### Unit Tests
- Backend services
- Frontend components
- Utility functions

### Integration Tests
- API endpoints
- Database operations
- RAG retrieval

### E2E Tests
- User workflows
- Chat flow
- Evaluation flow

## 📚 Documentation

| Document | Content |
|----------|---------|
| `README.md` | Overview and quick start |
| `SETUP.md` | Installation instructions |
| `ARCHITECTURE.md` | System design |
| `TESTING.md` | Testing procedures |
| `PROJECT_STRUCTURE.md` | This file |

## 🎯 Key Features

1. **Context-Aware Tutoring** - Adapts to student level
2. **Step-by-Step Teaching** - Never gives direct answers
3. **Long-Term Memory** - Tracks progress and mistakes
4. **RAG System** - Retrieves relevant learning material
5. **Real-Time Chat** - Streaming responses
6. **Evaluation Engine** - AI grading system
7. **Progress Tracking** - Detailed analytics

## 🔄 Development Workflow

1. **Setup**: Follow SETUP.md
2. **Develop**: Make changes in backend/frontend
3. **Test**: Run tests from TESTING.md
4. **Debug**: Check logs and use API docs
5. **Deploy**: Use docker-compose or Kubernetes

## 📞 Support

- Check SETUP.md for installation issues
- Check TESTING.md for debugging
- Check ARCHITECTURE.md for design questions
- Review logs for runtime errors
- Check API docs at `/docs`

## 📝 License

MIT
