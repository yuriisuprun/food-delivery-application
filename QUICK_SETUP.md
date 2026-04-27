# Quick Setup - Fix Issues

## Issues Fixed

### 1. ✅ Missing OPENAI_API_KEY
**Problem**: Docker warning about missing OPENAI_API_KEY
**Solution**: Created `.env` file with placeholder

**Action Required**: Edit `.env` and add your actual OpenAI API key:
```bash
# Edit .env
OPENAI_API_KEY=sk-your-actual-key-here
```

### 2. ✅ Frontend npm ci Error
**Problem**: `npm ci` requires package-lock.json which doesn't exist
**Solution**: Changed Dockerfile to use `npm install` instead

**What this means**: The frontend will now generate package-lock.json on first build

### 3. ✅ Docker Compose Version Warning
**Problem**: `version: '3.8'` is obsolete
**Solution**: Kept version for compatibility (Docker Compose handles this)

---

## How to Proceed

### Step 1: Add Your OpenAI API Key
```bash
# Edit the .env file
nano .env
# or
code .env
```

Change:
```
OPENAI_API_KEY=sk-your-openai-api-key-here
```

To your actual key from https://platform.openai.com/api-keys

### Step 2: Clean Up and Rebuild
```bash
# Stop any running containers
docker-compose down

# Remove old images (optional)
docker-compose down --rmi all

# Rebuild with new Dockerfile
docker-compose build --no-cache

# Start services
docker-compose up -d
```

### Step 3: Verify Everything Works
```bash
# Check backend health
curl http://localhost:8000/api/health

# Seed content
curl -X POST http://localhost:8000/api/admin/seed-all

# Open frontend
# http://localhost:3500
```

---

## What Changed

### Files Modified:
1. **frontend/Dockerfile** - Changed `npm ci` to `npm install`
2. **.env** - Created with placeholder OPENAI_API_KEY
3. **docker-compose.yml** - Version line kept (no functional change)

### Why These Changes:
- `npm install` generates package-lock.json automatically
- `.env` file needed for Docker Compose to read environment variables
- Version line is kept for backward compatibility

---

## Troubleshooting

### Still Getting npm Error?
```bash
# Clear Docker cache and rebuild
docker-compose down --rmi all
docker-compose build --no-cache
docker-compose up -d
```

### OPENAI_API_KEY Still Not Set?
```bash
# Verify .env file exists
cat .env

# Verify it has your key
grep OPENAI_API_KEY .env

# If empty, edit it
nano .env
```

### Frontend Won't Start?
```bash
# Check logs
docker-compose logs frontend

# Restart frontend
docker-compose restart frontend

# Check if port 3500 is in use
lsof -i :3500
```

### Backend Won't Start?
```bash
# Check logs
docker-compose logs backend

# Verify OPENAI_API_KEY is set
docker-compose logs backend | grep OPENAI_API_KEY

# Restart backend
docker-compose restart backend
```

---

## Next Steps

1. ✅ Add your OpenAI API key to `.env`
2. ✅ Run `docker-compose build --no-cache`
3. ✅ Run `docker-compose up -d`
4. ✅ Open http://localhost:3500
5. ✅ Start learning!

---

## Need Help?

- **Setup Issues**: Check SETUP.md
- **API Issues**: Check API_DOCUMENTATION.md
- **Testing**: Check TESTING.md
- **Quick Commands**: Check QUICK_REFERENCE.md

---

**Status**: ✅ Ready to proceed with your OpenAI API key
