#!/bin/bash

# Italian Language AI Tutor - Quick Start Script

set -e

echo "🚀 Italian Language AI Tutor - Quick Start"
echo "=========================================="

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Creating from .env.example..."
    if [ -f .env.example ]; then
        cp .env.example .env
        echo "📝 Please edit .env and add your OPENAI_API_KEY"
        echo "   Then run this script again."
        exit 1
    else
        echo "❌ .env.example not found"
        exit 1
    fi
fi

# Check if OPENAI_API_KEY is set
if ! grep -q "OPENAI_API_KEY=sk-" .env; then
    echo "❌ OPENAI_API_KEY not set in .env file"
    echo "   Please add your OpenAI API key to .env"
    exit 1
fi

echo "✅ Prerequisites check passed"
echo ""

# Stop existing containers
echo "🛑 Stopping existing containers..."
docker-compose down 2>/dev/null || true

# Start services
echo "🚀 Starting services..."
docker-compose up -d

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 10

# Check if backend is ready
echo "🔍 Checking backend health..."
for i in {1..30}; do
    if curl -s http://localhost:8000/api/health > /dev/null; then
        echo "✅ Backend is ready"
        break
    fi
    if [ $i -eq 30 ]; then
        echo "❌ Backend failed to start"
        docker-compose logs backend
        exit 1
    fi
    sleep 1
done

# Seed content
echo "📚 Seeding initial content..."
curl -s -X POST http://localhost:8000/api/admin/seed-all > /dev/null
echo "✅ Content seeded"

echo ""
echo "=========================================="
echo "✅ All services are running!"
echo ""
echo "📍 Frontend: http://localhost:3000"
echo "📍 Backend: http://localhost:8000"
echo "📍 API Docs: http://localhost:8000/docs"
echo "📍 Qdrant: http://localhost:6333"
echo "📍 PostgreSQL: localhost:5432"
echo ""
echo "🎓 Open http://localhost:3000 in your browser to start learning!"
echo ""
echo "To stop services: docker-compose down"
echo "To view logs: docker-compose logs -f"
echo "=========================================="
