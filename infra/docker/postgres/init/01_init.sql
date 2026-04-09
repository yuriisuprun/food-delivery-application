-- The DB/user are created by POSTGRES_* env vars in docker-compose on first init.
-- Enable pgvector in the default DB (smarttrip).
create extension if not exists vector;
