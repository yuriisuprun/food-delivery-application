create schema if not exists recommendations;

create table if not exists recommendations.schema_version_guard (
  id bigserial primary key,
  created_at timestamptz not null default now()
);

