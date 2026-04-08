# SmartTrip Application (Skeleton)

Sistema di pianificazione viaggi AI-driven che ottimizza itinerari considerando vincoli reali (tempo, budget, logistica).

## Architettura

Monorepo con microservizi Spring Boot (Java 21, Gradle):

- `services/user-service` autenticazione (skeleton JWT HS256) e gestione utenti
- `services/trip-service` gestione viaggi/itinerari (placeholder)
- `services/ai-service` AI layer: prompt + RAG (pgvector) + generazione itinerario
- `services/recommendation-service` suggerimenti e raccomandazioni (placeholder)

Frontend:

- `web` React (Vite) con UI moderna e una pagina Planner che chiama `ai-service`

Infrastruttura:

- `infra/docker` docker-compose (Postgres + pgvector, Redis, microservizi)
- `infra/k8s` manifest Kubernetes (base)
- `.github/workflows/ci.yml` CI per backend + frontend

## Quickstart (locale)

Prerequisiti: Docker, Java 21, Node (consigliato 22), Gradle wrapper.

1. Avvia DB/Redis e servizi:

```powershell
docker compose -f infra/docker/docker-compose.yml up --build
```

2. Avvia il frontend:

```powershell
cd web
npm install
npm run dev
```

3. Endpoints rapidi:

- `user-service`: `GET http://localhost:8081/api/health`
- `trip-service`: `GET http://localhost:8082/api/health`
- `ai-service`: `GET http://localhost:8083/api/health`
- `recommendation-service`: `GET http://localhost:8084/api/health`

Nota: per ottenere output reale da `ai-service`, imposta `OPENAI_API_KEY` (env var nel compose).

## Deploy

- Render: vedi `[infra/render/render.yaml](/C:/Users/yurii/MyProjects/smart-trip-application/infra/render/render.yaml)` (skeleton).
- Vercel: vedi `[web/vercel.json](/C:/Users/yurii/MyProjects/smart-trip-application/web/vercel.json)`.
- Kubernetes: vedi cartella `[infra/k8s](/C:/Users/yurii/MyProjects/smart-trip-application/infra/k8s)`.

