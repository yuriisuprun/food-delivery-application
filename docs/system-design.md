**Goal:**  
Plan trips with practical and actionable output (time, budget, logistics constraints) with an AI layer that reduces hallucinations using RAG on travel data (places + travel data).

---

## Microservices

```mermaid
flowchart LR
  WEB[React Web] -->|JWT| USER[user-service]
  WEB -->|JWT| TRIP[trip-service]
  WEB -->|JWT| AI[ai-service]
  TRIP -->|HTTP| REC[recommendation-service]
  AI -->|RAG| PG[(Postgres + pgvector)]
  TRIP --> PG
  USER --> PG
  REC --> PG
  TRIP --> REDIS[(Redis)]
  REC --> REDIS
Data Layer
Postgres
Main database
Separate schemas per service:
users
trips
recommendations
ai
pgvector
Embedding storage for retrieval
Enables similarity search in RAG pipeline
Redis
Caching layer:
Suggestions
Fast lookups
Future: rate limiting
AI Layer (RAG)
Logical Pipeline
Ingest
Normalization and chunking of travel data:
Places
Descriptions
Tips
Opening hours
Pricing
Embedding
Vector creation
Storage in pgvector
Retrieval
Similarity search for:
Destination
Constraints
Generation
Prompt = context + user request
Output:
Structured Markdown
Day-by-day itinerary
Real Constraints (Optimization Model)
MVP
AI-guided generation
Includes heuristics
Next Step (Deterministic Solver)

Introduce constraint-based optimization (e.g. constraint programming / MILP):

Time windows
Respect opening hours
Transport
Real transport times (routing provider)
Budget
By category:
Food
Transport
Attractions
Preferences & Penalties
Crowds
Pace
Walking distance