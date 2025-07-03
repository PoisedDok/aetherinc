#!/bin/bash
set -e

echo "Setting up database..."

# Set DATABASE_URL if not already set
export DATABASE_URL=${DATABASE_URL:-"postgresql://postgres:postgres@localhost:5432/aether?schema=public"}

# Wait for PostgreSQL to be ready
echo "Waiting for PostgreSQL to be ready..."
MAX_ATTEMPTS=30
ATTEMPT=1

while [ $ATTEMPT -le $MAX_ATTEMPTS ]
do
  if pg_isready -h ${DATABASE_URL##*@} -U postgres 2>/dev/null; then
    echo "PostgreSQL is ready!"
    break
  fi
  
  echo "Attempt $ATTEMPT of $MAX_ATTEMPTS: PostgreSQL is not ready yet. Waiting..."
  ATTEMPT=$((ATTEMPT + 1))
  sleep 2
done

if [ $ATTEMPT -gt $MAX_ATTEMPTS ]; then
  echo "Error: PostgreSQL did not become ready in time"
  exit 1
fi

# Run database migrations
echo "Running database migrations..."
npx prisma migrate deploy

# Generate Prisma client if needed
echo "Generating Prisma client..."
npx prisma generate

# Seed database with initial data
echo "Seeding database..."
node scripts/seed.mjs

echo "Database setup complete!" 