-- Create app user + database once, using the container's superuser (POSTGRES_USER defaults to postgres).
do
$$
begin
  if not exists (select from pg_roles where rolname = 'smarttrip') then
    create role smarttrip login password 'smarttrip';
  end if;
end
$$;

-- Ensure database exists.
do
$$
begin
  if not exists (select from pg_database where datname = 'smarttrip') then
    create database smarttrip owner smarttrip;
  end if;
end
$$;

-- Extensions are DB-scoped; create in smarttrip.
\connect smarttrip
create extension if not exists vector;

