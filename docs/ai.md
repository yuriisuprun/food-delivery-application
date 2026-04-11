# AI Layer

## Prompt engineering (itinerary)
System prompt (current in ai-service):
- realistic planning
- constraints (time/budget/logistics)
- cost estimates and low-cost alternatives
- assumptions + missing information requested from the user

## RAG: places + travel data
Target sources (MVP):
- places dataset (POIs, descriptions, categories)
- practical notes (opening hours, seasonality, indicative costs)
- transport (lines, average times, tourist passes)

Storage:
- pgvector in Postgres (table ai.document_embeddings)

## Tooling (future)
- Tool calling: weather lookup, transport, booking, map routing
- Guardrails: output validation (schema), safety filters, deduplication  