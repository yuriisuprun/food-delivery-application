# Next.js 14.2 Upgrade - Quick Commands

## 🚀 Quick Start

### Build and Deploy
```bash
# Build the frontend with new Next.js 14.2 configuration
docker-compose build --no-cache frontend

# Start all services
docker-compose up -d

# Verify services are running
docker-compose ps
```

### Access Application
```bash
# Frontend
http://localhost:3335

# Backend API
http://localhost:8000

# API Documentation
http://localhost:8000/docs

# Qdrant Vector DB
http://localhost:6333
```

## 📋 Verification Commands

### Check Versions
```bash
# Check Next.js version
npm list next

# Check React version
npm list react

# Check TypeScript version
npm list typescript

# Check Node.js version
node --version
```

### Build & Test
```bash
# Build the application
npm run build

# Run type checking
npm run type-check

# Run linting
npm run lint

# Start development server
npm run dev
```

### Docker Commands
```bash
# View logs
docker-compose logs -f frontend

# Restart frontend
docker-compose restart frontend

# Stop all services
docker-compose down

# Remove all containers and volumes
docker-compose down -v

# Rebuild all services
docker-compose build --no-cache

# Start all services
docker-compose up -d
```

## 🔍 Troubleshooting Commands

### Clear Cache and Rebuild
```bash
# Remove node_modules and package-lock.json
rm -rf frontend/node_modules frontend/package-lock.json

# Reinstall dependencies
cd frontend && npm install

# Rebuild Docker image
docker-compose build --no-cache frontend

# Start services
docker-compose up -d
```

### Check Application Health
```bash
# Check backend health
curl http://localhost:8000/api/health

# Check frontend is running
curl http://localhost:3335

# Check API documentation
curl http://localhost:8000/docs
```

### View Logs
```bash
# Frontend logs
docker-compose logs frontend

# Backend logs
docker-compose logs backend

# All logs
docker-compose logs

# Follow logs in real-time
docker-compose logs -f

# Last 100 lines
docker-compose logs --tail=100
```

## 📦 Dependency Management

### Update Dependencies
```bash
# Check for outdated packages
npm outdated

# Update all packages
npm update

# Update specific package
npm install package-name@latest
```

### Clean Installation
```bash
# Remove all dependencies
rm -rf node_modules package-lock.json

# Reinstall from scratch
npm install

# Verify installation
npm list
```

## 🔄 Rollback Commands

### Rollback to Previous Version
```bash
# Revert package.json changes
git checkout HEAD -- frontend/package.json

# Reinstall dependencies
npm install

# Rebuild Docker image
docker-compose build --no-cache frontend

# Restart services
docker-compose down
docker-compose up -d
```

## 📊 Performance Monitoring

### Check Build Time
```bash
# Time the build
time npm run build

# Check bundle size
npm run build -- --analyze
```

### Monitor Running Services
```bash
# Check Docker resource usage
docker stats

# Check container details
docker inspect ai-language-tutoring-system-frontend

# Check port usage
netstat -an | grep 3500
```

## 🧹 Cleanup Commands

### Remove Unused Resources
```bash
# Remove unused Docker images
docker image prune

# Remove unused volumes
docker volume prune

# Remove unused networks
docker network prune

# Full cleanup (careful!)
docker system prune -a
```

### Clean Build Artifacts
```bash
# Remove Next.js build cache
rm -rf frontend/.next

# Remove TypeScript cache
rm -rf frontend/.tsbuildinfo

# Remove ESLint cache
rm -rf frontend/.eslintcache
```

## 📝 Development Workflow

### Local Development
```bash
# Start development server
npm run dev

# Watch for changes
npm run dev -- --turbo

# Type checking in watch mode
npm run type-check -- --watch
```

### Production Build
```bash
# Build for production
npm run build

# Start production server
npm start

# Analyze bundle
npm run build -- --analyze
```

## 🔐 Security Commands

### Check for Vulnerabilities
```bash
# Audit dependencies
npm audit

# Fix vulnerabilities
npm audit fix

# Force fix (may break compatibility)
npm audit fix --force
```

### Update Security Packages
```bash
# Update all packages
npm update

# Update specific security package
npm install package-name@latest
```

## 📚 Documentation Commands

### Generate Documentation
```bash
# Generate TypeScript documentation
npm run type-check

# Generate ESLint report
npm run lint -- --format json > lint-report.json
```

## 🎯 Common Workflows

### Complete Rebuild
```bash
# Stop services
docker-compose down

# Clean everything
rm -rf frontend/node_modules frontend/package-lock.json frontend/.next

# Rebuild
docker-compose build --no-cache

# Start
docker-compose up -d

# Verify
curl http://localhost:3335
```

### Quick Restart
```bash
# Restart frontend
docker-compose restart frontend

# Check logs
docker-compose logs -f frontend
```

### Deploy Changes
```bash
# Build with new changes
docker-compose build --no-cache frontend

# Restart services
docker-compose down
docker-compose up -d

# Verify
curl http://localhost:3335
```

## 🚨 Emergency Commands

### Force Stop Everything
```bash
# Kill all Docker containers
docker kill $(docker ps -q)

# Remove all containers
docker rm $(docker ps -aq)

# Remove all volumes
docker volume rm $(docker volume ls -q)
```

### Reset to Clean State
```bash
# Remove everything
docker-compose down -v

# Clean build
docker-compose build --no-cache

# Fresh start
docker-compose up -d
```

## 📞 Help Commands

### Get Help
```bash
# Docker Compose help
docker-compose --help

# Docker help
docker --help

# npm help
npm help

# Next.js help
npx next --help
```

### Check Configuration
```bash
# View docker-compose configuration
docker-compose config

# View Next.js configuration
cat frontend/next.config.js

# View TypeScript configuration
cat frontend/tsconfig.json

# View package.json
cat frontend/package.json
```

---

## 📋 Quick Reference

| Command | Purpose |
|---------|---------|
| `docker-compose build --no-cache frontend` | Rebuild frontend image |
| `docker-compose up -d` | Start all services |
| `docker-compose down` | Stop all services |
| `docker-compose logs -f` | View live logs |
| `npm run build` | Build Next.js app |
| `npm run dev` | Start dev server |
| `npm run type-check` | Check TypeScript |
| `npm run lint` | Run ESLint |
| `npm audit` | Check vulnerabilities |
| `npm update` | Update dependencies |

---

**Last Updated:** April 27, 2026
**Status:** ✅ Ready to Use
**Next.js Version:** 14.2.35
