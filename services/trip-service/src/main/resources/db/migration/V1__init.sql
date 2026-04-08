create schema if not exists trips;

create table if not exists trips.trip (
  id uuid primary key,
  user_email text not null,
  destination text not null,
  days int not null,
  budget_eur int not null,
  constraints_json jsonb not null default '[]'::jsonb,
  itinerary_markdown text,
  created_at timestamptz not null default now()
);
