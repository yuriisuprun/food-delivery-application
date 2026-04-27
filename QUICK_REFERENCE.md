# Italian Language AI Tutor - Quick Reference Guide

## 🚀 Quick Start (30 seconds)

```bash
# 1. Clone and navigate
git clone <repo-url>
cd italian-tutor

# 2. Create .env with your OpenAI key
echo "OPENAI_API_KEY=sk-your-key-here" > .env

# 3. Start everything
docker-compose up -d

# 4. Seed content
curl -X POST http://localhost:8000/api/admin/seed-all

# 5. Open browser
# Frontend: http://localhost:3000
# API Docs: http://localhost:8000/docs
```

---

## 📍 Service URLs

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost:3500 | Chat, Quiz, Progress |
| Backend | http://localhost:8000 | API server |
| API Docs | http://localhost:8000/docs | Swagger UI |
| Qdrant | http://localhost:6333 | Vector DB |
| PostgreSQL | localhost:5432 | Database |

---

## 🔑 Key Files

| File | Purpose |
|------|---------|
| `docker-compose.yml` | Start all services |
| `backend/app/main.py` | Backend entry point |
| `frontend/app/page.tsx` | Frontend entry point |
| `backend/app/services/llm.py` | LLM integration |
| `backend/app/services/rag.py` | Vector DB integration |
| `backend/app/services/memory.py` | Memory management |

---

## 📚 Documentation Map

```
README.md                    ← Start here
    ↓
SETUP.md                     ← Installation
    ↓
ARCHITECTURE.md              ← System design
    ↓
API_DOCUMENTATION.md         ← API reference
    ↓
TESTING.md                   ← Testing procedures
    ↓
PROJECT_STRUCTURE.md         ← File organization
    ↓
IMPLEMENTATION_SUMMARY.md    ← What's built
```

---

## 🛠️ Common Commands

### Docker
```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres
docker-compose logs -f qdrant

# Restart service
docker-compose restart backend

# Rebuild images
docker-compose build --no-cache
```

### Backend
```bash
# Install dependencies
pip install -r requirements.txt

# Run server
uvicorn app.main:app --reload

# Run tests
pytest tests/

# Check code style
flake8 app/
```

### Frontend
```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Check types
npm run type-check
```

### Database
```bash
# Connect to PostgreSQL
psql -U italian_user -d italian_tutor -h localhost

# View tables
\dt

# View schema
\d users

# Run query
SELECT * FROM users;
```

---

## 🔌 API Quick Reference

### Chat
```bash
# Send message (streaming)
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "session_id": "s1",
    "user_id": "u1",
    "message": "Insegnami il presente",
    "topic": "grammar",
    "difficulty": "A2"
  }'

# Get history
curl http://localhost:8000/api/chat/history/s1
```

### Evaluate
```bash
# Evaluate answer
curl -X POST http://localhost:8000/api/evaluate \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "u1",
    "question": "Coniuga parlare",
    "user_answer": "parlo",
    "correct_answer": "parlo",
    "topic": "grammar"
  }'
```

### Progress
```bash
# Get user progress
curl http://localhost:8000/api/progress/user/u1

# Get topic progress
curl "http://localhost:8000/api/progress/topics?user_id=u1"
```

### Admin
```bash
# Seed all content
curl -X POST http://localhost:8000/api/admin/seed-all

# Seed grammar only
curl -X POST http://localhost:8000/api/admin/seed-content

# Seed exams only
curl -X POST http://localhost:8000/api/admin/seed-exams
```

---

## 🐛 Debugging

### Check Service Status
```bash
# Backend health
curl http://localhost:8000/api/health

# Qdrant health
curl http://localhost:6333/health

# Database connection
psql -U italian_user -d italian_tutor -h localhost -c "SELECT 1"
```

### View Logs
```bash
# All services
docker-compose logs

# Specific service
docker-compose logs backend
docker-compose logs frontend
docker-compose logs postgres
docker-compose logs qdrant

# Follow logs
docker-compose logs -f backend

# Last 100 lines
docker-compose logs --tail=100 backend
```

### Common Issues

| Issue | Solution |
|-------|----------|
| Port already in use | `lsof -i :8000` then `kill -9 <PID>` |
| Database connection error | Check PostgreSQL is running: `docker ps \| grep postgres` |
| Qdrant connection error | Check Qdrant is running: `docker ps \| grep qdrant` |
| OPENAI_API_KEY not set | Add to .env file |
| Frontend won't load | Check NEXT_PUBLIC_API_URL in .env.local |

---

## 📊 Database Schema Quick View

```sql
-- Users
CREATE TABLE users (
  id VARCHAR PRIMARY KEY,
  email VARCHAR UNIQUE,
  cefr_level VARCHAR,
  total_score FLOAT,
  weak_areas JSONB
);

-- Chat Sessions
CREATE TABLE chat_sessions (
  id VARCHAR PRIMARY KEY,
  user_id VARCHAR REFERENCES users,
  topic VARCHAR,
  difficulty VARCHAR
);

-- Chat Messages
CREATE TABLE chat_messages (
  id VARCHAR PRIMARY KEY,
  session_id VARCHAR REFERENCES chat_sessions,
  role VARCHAR,
  content TEXT
);

-- Mistakes
CREATE TABLE mistakes (
  id VARCHAR PRIMARY KEY,
  user_id VARCHAR REFERENCES users,
  topic VARCHAR,
  mistake_type VARCHAR,
  frequency INT
);

-- Skill Progress
CREATE TABLE skill_progress (
  id VARCHAR PRIMARY KEY,
  user_id VARCHAR REFERENCES users,
  skill VARCHAR,
  score FLOAT,
  accuracy FLOAT
);

-- Quiz Attempts
CREATE TABLE quiz_attempts (
  id VARCHAR PRIMARY KEY,
  user_id VARCHAR REFERENCES users,
  score FLOAT,
  feedback TEXT
);
```

---

## 🎯 Feature Checklist

### Core Features
- [x] Chat interface with streaming
- [x] Quiz interface with evaluation
- [x] Progress dashboard
- [x] RAG system
- [x] Memory management
- [x] Answer evaluation
- [x] Mistake tracking
- [x] Skill progression

### Infrastructure
- [x] Docker Compose setup
- [x] PostgreSQL database
- [x] Qdrant vector DB
- [x] FastAPI backend
- [x] Next.js frontend
- [x] Environment configuration

### Documentation
- [x] README
- [x] SETUP guide
- [x] Architecture doc
- [x] API documentation
- [x] Testing guide
- [x] Project structure
- [x] Implementation summary
- [x] Quick reference

---

## 🚀 Deployment Checklist

### Before Production
- [ ] Set strong database password
- [ ] Configure CORS origins
- [ ] Set up SSL/TLS
- [ ] Enable rate limiting
- [ ] Set up monitoring (Sentry)
- [ ] Configure backups
- [ ] Set up CI/CD
- [ ] Load test
- [ ] Security audit

### Production Setup
- [ ] Use managed PostgreSQL
- [ ] Use managed Qdrant (Qdrant Cloud)
- [ ] Deploy on Kubernetes
- [ ] Set up CDN
- [ ] Configure DNS
- [ ] Set up logging
- [ ] Set up alerting
- [ ] Document runbooks

---

## 📈 Performance Tips

### Backend
- Use connection pooling (already configured)
- Cache RAG results
- Implement rate limiting
- Use async/await
- Monitor query performance

### Frontend
- Implement code splitting
- Use React.memo for expensive components
- Optimize images
- Implement lazy loading
- Use React Query for caching

### Database
- Add indexes on frequently queried columns
- Optimize queries
- Use connection pooling
- Monitor slow queries
- Regular maintenance

---

## 🔐 Security Checklist

### Current (MVP)
- [x] Input validation
- [x] CORS configuration
- [x] Environment variables
- [x] Error handling

### Production
- [ ] Authentication (Clerk.dev)
- [ ] JWT validation
- [ ] Rate limiting
- [ ] HTTPS/TLS
- [ ] Database encryption
- [ ] API key rotation
- [ ] Security headers
- [ ] OWASP compliance

---

## 📞 Getting Help

### Documentation
1. README.md - Overview
2. SETUP.md - Installation
3. ARCHITECTURE.md - Design
4. API_DOCUMENTATION.md - API reference
5. TESTING.md - Testing
6. PROJECT_STRUCTURE.md - Files
7. IMPLEMENTATION_SUMMARY.md - What's built

### Tools
- Swagger UI: http://localhost:8000/docs
- Logs: `docker-compose logs`
- Database: `psql`
- Vector DB: http://localhost:6333

### Debugging
1. Check logs
2. Check health endpoints
3. Check database connection
4. Check API documentation
5. Review test procedures

---

## 🎓 Learning Path

### For Users
1. Open http://localhost:3000
2. Select a topic (grammar, vocabulary, etc.)
3. Chat with the tutor
4. Take a quiz
5. Review progress
6. Repeat

### For Developers
1. Read README.md
2. Follow SETUP.md
3. Review ARCHITECTURE.md
4. Check API_DOCUMENTATION.md
5. Run tests from TESTING.md
6. Explore code in backend/app and frontend/app

---

## 🔄 Development Workflow

```
1. Make changes
   ↓
2. Test locally
   ↓
3. Check logs
   ↓
4. Commit changes
   ↓
5. Push to repository
   ↓
6. CI/CD runs tests
   ↓
7. Deploy to production
```

---

## 📊 Monitoring Dashboard

### Key Metrics
- Request/response times
- Error rates
- Token usage
- Database query performance
- Vector DB search performance
- User progress
- Weak areas distribution

### Tools
- Logs: `docker-compose logs`
- Database: `psql`
- Vector DB: Qdrant web UI
- API: Swagger UI

---

## 🎯 Success Criteria

### MVP Complete ✅
- [x] Chat interface working
- [x] Quiz interface working
- [x] Progress tracking working
- [x] RAG system working
- [x] Memory system working
- [x] Evaluation engine working
- [x] Docker setup working
- [x] Documentation complete

### Ready for Production
- [ ] Authentication implemented
- [ ] Rate limiting implemented
- [ ] Monitoring set up
- [ ] Backups configured
- [ ] Security audit passed
- [ ] Load testing passed
- [ ] Documentation reviewed
- [ ] Team trained

---

## 📝 Version History

| Version | Date | Status |
|---------|------|--------|
| 1.0.0 | Apr 2026 | MVP Complete |
| 1.1.0 | TBD | Authentication |
| 1.2.0 | TBD | Mobile App |
| 2.0.0 | TBD | Advanced Features |

---

## 🙏 Quick Tips

1. **Always check logs first** - `docker-compose logs -f`
2. **Use Swagger UI** - http://localhost:8000/docs
3. **Read the docs** - Start with README.md
4. **Test locally** - Use curl or Postman
5. **Monitor performance** - Check response times
6. **Keep backups** - Regular database backups
7. **Update dependencies** - Keep packages current
8. **Document changes** - Update docs when modifying

---

**Last Updated**: April 2026
**Version**: 1.0.0
**Status**: ✅ Production-Ready MVP
