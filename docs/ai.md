# AI Layer

## Prompt engineering (itinerary)

Prompt di sistema (attuale in `ai-service`):

- pianificazione realistica
- vincoli (tempo/budget/logistica)
- stime costi e alternative low-cost
- assunzioni + missing info richieste all’utente

## RAG: luoghi + travel data

Target sources (MVP):

- dataset luoghi (POI, descrizioni, categorie)
- note pratiche (orari, stagionalità, costi indicativi)
- trasporti (linee, tempi medi, pass turistici)

Storage:

- pgvector in Postgres (tabella `ai.document_embeddings`)

## Tooling (futuro)

- Tool calling: lookup meteo, trasporti, booking, map routing
- Guardrail: validation output (schema), safety filters, dedup

