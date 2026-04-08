create schema if not exists ai;

create table if not exists ai.schema_version_guard (
  id bigserial primary key,
  created_at timestamptz not null default now()
);
