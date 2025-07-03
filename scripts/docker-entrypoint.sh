#!/bin/sh
set -e

# Set npm cache directory to a location where nextjs user has write permissions
export npm_config_cache=/app/.npm

# Extract host and port from DATABASE_URL
DB_HOST=$(echo $DATABASE_URL | sed -n 's/.*@\([^:]*\).*/\1/p')
DB_HOST=${DB_HOST:-db}  # Default to 'db' if extraction fails
DB_PORT=$(echo $DATABASE_URL | sed -n 's/.*:\([0-9]*\)\/.*/\1/p')
DB_PORT=${DB_PORT:-5432}  # Default to 5432 if extraction fails
DB_USER=$(echo $DATABASE_URL | sed -n 's/.*:\/\/\([^:]*\):.*/\1/p')
DB_USER=${DB_USER:-postgres}  # Default to postgres if extraction fails

echo "Connecting to PostgreSQL at $DB_HOST:$DB_PORT as $DB_USER..."

# Wait for PostgreSQL to be ready
echo "Waiting for PostgreSQL to be ready..."
# Maximum number of attempts
max_attempts=30
# Counter for attempts
attempt=1

while [ $attempt -le $max_attempts ]
do
  if pg_isready -h $DB_HOST -p $DB_PORT -U $DB_USER; then
    echo "PostgreSQL is ready!"
    break
  fi
  
  echo "Attempt $attempt of $max_attempts: PostgreSQL is not ready yet. Waiting..."
  attempt=$((attempt + 1))
  sleep 2
done

if [ $attempt -gt $max_attempts ]; then
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

# Start the application
echo "Starting Next.js application..."
exec "$@" 