# Troubleshooting Guide

## Common Issues & Solutions

### Issue 1: OPENAI_API_KEY Warning

**Error Message:**
```
level=warning msg="The \"OPENAI_API_KEY\" variable is not set. Defaulting to a blank string."
```

**Cause**: `.env` file missing or OPENAI_API_KEY not set

**Solution**:
```bash
# 1. Create .env file
echo "OPENAI_API_KEY=sk-your-key-here" > .env

# 2. Edit with your actual key
nano .env

# 3. Verify it's set
cat .env

# 4. Restart backend
docker-compose restart backend

# 5. Check logs
docker-compose logs backend | grep OPENAI_API_KEY
```

---

### Issue 2: Docker Compose Version Warning

**Error Message:**
```
level=warning msg="the attribute `version` is obsolete, it will be ignored"
```

**Cause**: Docker Compose 2.0+ treats version as obsolete

**Solution**: This is just a warning and doesn't affect functionality. To remove it:

```bash
# Option 1: Remove version line (not recommended for compatibility)
# Edit docker-compose.yml and remove: version: '3.8'

# Option 2: Ignore the warning (recommended)
# It's harmless and doesn't affect the application
```

---

### Issue 3: Frontend npm ci Error

**Error Message:**
```
npm error The `npm ci` command can only install with an existing package-lock.json
```

**Cause**: `npm ci` requires package-lock.json which doesn't exist

**Solution**: Already fixed! Changed Dockerfile to use `npm install`

```bash
# Rebuild frontend
docker-compose build --no-cache frontend

# Start services
docker-compose up -d
```

---

### Issue 4: Port Already in Use

**Error Message:**
```
Error response from daemon: Ports are not available: exposing port TCP 0.0.0.0:3335 -> 0.0.0.0:0: listen tcp 0.0.0.0:3335: bind: An attempt was made to use a port in an exclusive state.
```

**Cause**: Port 3335 (or other port) is already in use

**Solution**:
```bash
# Find process using port 3335
lsof -i :3335

# Kill the process
kill -9 <PID>

# Or change port in docker-compose.yml
# Change: ports: - "3335:3000"
# To:     ports: - "3336:3000"

# Restart services
docker-compose up -d
```

---

### Issue 5: Backend Connection Error

**Error Message:**
```
Error: connect ECONNREFUSED 127.0.0.1:8000
```

**Cause**: Backend not running or not ready

**Solution**:
```bash
# Check if backend is running
docker-compose ps

# Check backend logs
docker-compose logs backend

# Wait for backend to start
sleep 10

# Restart backend
docker-compose restart backend

# Check health
curl http://localhost:8000/api/health
```

---

### Issue 6: Database Connection Error

**Error Message:**
```
psycopg2.OperationalError: could not connect to server: Connection refused
```

**Cause**: PostgreSQL not running or not ready

**Solution**:
```bash
# Check if PostgreSQL is running
docker-compose ps postgres

# Check PostgreSQL logs
docker-compose logs postgres

# Restart PostgreSQL
docker-compose restart postgres

# Wait for it to be ready
sleep 10

# Test connection
psql -U italian_user -d italian_tutor -h localhost -c "SELECT 1"
```

---

### Issue 7: Qdrant Connection Error

**Error Message:**
```
Failed to connect to Qdrant at http://qdrant:6333
```

**Cause**: Qdrant not running or not ready

**Solution**:
```bash
# Check if Qdrant is running
docker-compose ps qdrant

# Check Qdrant logs
docker-compose logs qdrant

# Restart Qdrant
docker-compose restart qdrant

# Wait for it to be ready
sleep 10

# Test connection
curl http://localhost:6333/health
```

---

### Issue 8: Frontend Won't Load

**Error Message:**
```
Failed to fetch from http://localhost:8000
```

**Cause**: Frontend can't reach backend API

**Solution**:
```bash
# Check if backend is running
curl http://localhost:8000/api/health

# Check frontend logs
docker-compose logs frontend

# Verify NEXT_PUBLIC_API_URL
docker-compose exec frontend env | grep NEXT_PUBLIC_API_URL

# Restart frontend
docker-compose restart frontend

# Check if port 3335 is accessible
curl http://localhost:3335
```

---

### Issue 9: Docker Build Fails

**Error Message:**
```
ERROR: failed to solve: process "/bin/sh -c npm install" did not complete successfully
```

**Cause**: npm install failed (network issue, disk space, etc.)

**Solution**:
```bash
# Clear Docker cache
docker-compose down --rmi all

# Rebuild without cache
docker-compose build --no-cache

# If still fails, check disk space
df -h

# Check Docker logs
docker logs <container-id>
```

---

### Issue 10: Out of Disk Space

**Error Message:**
```
no space left on device
```

**Cause**: Docker images/containers taking too much space

**Solution**:
```bash
# Clean up Docker
docker system prune -a

# Remove unused volumes
docker volume prune

# Check disk space
df -h

# Remove old images
docker rmi <image-id>

# Rebuild
docker-compose build --no-cache
```

---

## Verification Checklist

### After Setup, Verify:

```bash
# 1. Check all services are running
docker-compose ps

# 2. Check backend health
curl http://localhost:8000/api/health

# 3. Check Qdrant health
curl http://localhost:6333/health

# 4. Check database connection
psql -U italian_user -d italian_tutor -h localhost -c "SELECT 1"

# 5. Check frontend is accessible
curl http://localhost:3335

# 6. Seed content
curl -X POST http://localhost:8000/api/admin/seed-all

# 7. Test chat endpoint
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"session_id":"test","user_id":"test","message":"Ciao"}'
```

---

## Debug Commands

### View All Logs
```bash
docker-compose logs -f
```

### View Specific Service Logs
```bash
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres
docker-compose logs -f qdrant
```

### Check Service Status
```bash
docker-compose ps
```

### Restart All Services
```bash
docker-compose restart
```

### Restart Specific Service
```bash
docker-compose restart backend
```

### Stop All Services
```bash
docker-compose down
```

### Stop and Remove Volumes
```bash
docker-compose down -v
```

### Rebuild All Images
```bash
docker-compose build --no-cache
```

### Execute Command in Container
```bash
docker-compose exec backend bash
docker-compose exec frontend bash
docker-compose exec postgres psql -U italian_user -d italian_tutor
```

---

## Environment Variables

### Backend (.env)
```
OPENAI_API_KEY=sk-...
DATABASE_URL=postgresql://italian_user:italian_pass@postgres:5432/italian_tutor
QDRANT_URL=http://qdrant:6333
ENVIRONMENT=development
DEBUG=true
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## Performance Issues

### Slow Backend Response
```bash
# Check backend logs
docker-compose logs backend

# Check database performance
docker-compose exec postgres psql -U italian_user -d italian_tutor -c "SELECT * FROM pg_stat_statements LIMIT 10"

# Restart backend
docker-compose restart backend
```

### Slow Frontend
```bash
# Check browser console for errors
# Open DevTools (F12) → Console

# Check frontend logs
docker-compose logs frontend

# Clear browser cache
# Ctrl+Shift+Delete (Windows/Linux)
# Cmd+Shift+Delete (Mac)
```

### High Memory Usage
```bash
# Check Docker stats
docker stats

# Reduce memory limit in docker-compose.yml
# Add: mem_limit: 512m

# Restart services
docker-compose restart
```

---

## Network Issues

### Can't Connect to Services
```bash
# Check if services are on same network
docker network ls
docker network inspect italian_tutor_network

# Check DNS resolution
docker-compose exec backend ping postgres
docker-compose exec backend ping qdrant

# Check firewall
# Windows: Check Windows Defender Firewall
# Mac: Check System Preferences → Security & Privacy
# Linux: Check iptables
```

---

## Database Issues

### Can't Connect to PostgreSQL
```bash
# Check if PostgreSQL is running
docker-compose ps postgres

# Check PostgreSQL logs
docker-compose logs postgres

# Try connecting
psql -U italian_user -d italian_tutor -h localhost

# Check credentials in docker-compose.yml
grep POSTGRES_USER docker-compose.yml
grep POSTGRES_PASSWORD docker-compose.yml
```

### Database Locked
```bash
# Restart PostgreSQL
docker-compose restart postgres

# Or reset database
docker-compose down -v
docker-compose up -d postgres
```

---

## API Issues

### 404 Not Found
```bash
# Check if endpoint exists
curl http://localhost:8000/docs

# Check backend logs
docker-compose logs backend

# Verify API URL
echo $NEXT_PUBLIC_API_URL
```

### 500 Internal Server Error
```bash
# Check backend logs
docker-compose logs backend

# Check database connection
docker-compose exec backend python -c "from app.core.database import engine; engine.connect()"

# Check OpenAI API key
docker-compose exec backend env | grep OPENAI_API_KEY
```

### Timeout
```bash
# Check backend performance
docker stats

# Check network latency
docker-compose exec backend ping 8.8.8.8

# Increase timeout in frontend/lib/api.ts
# Add: timeout: 60000
```

---

## Getting Help

### Check Documentation
1. README.md - Overview
2. SETUP.md - Installation
3. ARCHITECTURE.md - System design
4. API_DOCUMENTATION.md - API reference
5. TESTING.md - Testing procedures

### Check Logs
```bash
docker-compose logs -f
```

### Check Health
```bash
curl http://localhost:8000/api/health
curl http://localhost:6333/health
```

### Check Services
```bash
docker-compose ps
```

### Reset Everything
```bash
docker-compose down -v
docker-compose build --no-cache
docker-compose up -d
```

---

## Still Having Issues?

1. **Check logs**: `docker-compose logs -f`
2. **Check health**: `curl http://localhost:8000/api/health`
3. **Check services**: `docker-compose ps`
4. **Check documentation**: Read relevant .md files
5. **Reset**: `docker-compose down -v && docker-compose up -d`

---

**Last Updated**: April 2026

**Status**: ✅ Comprehensive troubleshooting guide
