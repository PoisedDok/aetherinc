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

# Run database migrations with extra options to ensure tables are created
echo "Running database migrations..."
npx prisma migrate deploy

# Force database schema sync to ensure all tables are created
echo "Synchronizing database schema..."
npx prisma db push --accept-data-loss

# Generate Prisma client if needed
echo "Generating Prisma client..."
npx prisma generate

# Seed database with initial data
echo "Seeding database..."
node scripts/seed.mjs

# Verify API directory exists
echo "Verifying API routes..."
if [ -d "/app/src/app/api" ]; then
  echo "API directory exists"
  ls -la /app/src/app/api
else
  echo "WARNING: API directory not found. Analytics and contact forms may not work!"
fi

# Check if important files are present
echo "Verifying important files..."
for file in "/app/src/lib/analytics.ts" "/app/src/lib/database.ts"; do
  if [ -f "$file" ]; then
    echo "$file exists"
  else
    echo "WARNING: $file not found! Functionality might be impaired."
  fi
done

# Print environment status
echo "Environment status:"
echo "NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL:-not set}"
echo "ANALYTICS_ENABLED=${ANALYTICS_ENABLED:-not set}"
echo "CONTACT_FORM_ENABLED=${CONTACT_FORM_ENABLED:-not set}"

# Start the application
echo "Starting Next.js application..."
exec "$@" 