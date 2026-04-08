create schema if not exists users;

create table if not exists users.user_account (
  id uuid primary key,
  email text not null unique,
  password_hash text not null,
  created_at timestamptz not null default now()
);
