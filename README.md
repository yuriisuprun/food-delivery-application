# SmartTrip Application (Skeleton)

AI-driven trip planning system that optimizes itineraries considering real constraints (time, budget, logistics).

## Architecture

Monorepo with Spring Boot microservices (Java 21, Gradle):

- `services/user-service` authentication (skeleton JWT HS256) and user management
- `services/trip-service` trip/itinerary management (placeholder)
- `services/ai-service` AI layer: prompt + RAG (pgvector) + itinerary generation
- `services/recommendation-service` suggestions and recommendations (placeholder)

Frontend:

- `web` React (Vite) with modern UI and a Planner page that calls `ai-service`

Infrastructure:

- `infra/docker` docker-compose (Postgres + pgvector, Redis, microservices)
- `infra/k8s` Kubernetes manifests (base)
- `.github/workflows/ci.yml` CI for backend + frontend

## Quickstart (local)

Prerequisites: Docker, Java 21, Node (recommended 22), Gradle wrapper.

1. Start DB/Redis and services:

```powershell
docker compose -f infra/docker/docker-compose.yml up --build
```

2. Start the frontend:

```powershell
cd web
npm install
npm run dev
```

3. Quick endpoints:

- `user-service`: `GET http://localhost:8081/api/health`
- `trip-service`: `GET http://localhost:8082/api/health`
- `ai-service`: `GET http://localhost:8083/api/health`
- `recommendation-service`: `GET http://localhost:8084/api/health`

Note: to get real output from `ai-service`, set `OPENAI_API_KEY` (env var in compose).

## Deploy

- Render: see `[infra/render/render.yaml](/C:/Users/yurii/MyProjects/smart-trip-application/infra/render/render.yaml)` (skeleton).
- Vercel: see `[web/vercel.json](/C:/Users/yurii/MyProjects/smart-trip-application/web/vercel.json)`.
- Kubernetes: see folder `[infra/k8s](/C:/Users/yurii/MyProjects/smart-trip-application/infra/k8s)`.
