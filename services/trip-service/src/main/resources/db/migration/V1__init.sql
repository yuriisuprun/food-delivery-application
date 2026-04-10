CREATE SCHEMA IF NOT EXISTS trips;

CREATE TABLE IF NOT EXISTS trips.trip (
      id UUID PRIMARY KEY,
      user_email TEXT NOT NULL,
      destination TEXT NOT NULL,
      days INT NOT NULL,
      budget_eur INT NOT NULL,
      constraints_json JSONB NOT NULL DEFAULT '[]'::jsonb,
      itinerary_markdown TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);