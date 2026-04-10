CREATE SCHEMA IF NOT EXISTS users;

CREATE TABLE IF NOT EXISTS users.user_account (
      id UUID PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);