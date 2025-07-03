# PostgreSQL Docker Container Guide

This guide explains how to run the PostgreSQL database in a Docker container for the AetherInc application.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Quick Start

1. Start the PostgreSQL container:
   ```bash
   docker compose up -d
   ```

2. Run the database setup script (run this on your local machine, not inside the container):
   ```bash
   # Make sure you have Node.js and npm installed
   npm install
   ./scripts/db-setup.sh
   ```

3. Update your local .env file to connect to the database:
   ```
   DATABASE_URL=postgresql://postgres:postgres@localhost:5432/aether?schema=public
   ```

4. Run your application locally:
   ```bash
   npm run dev
   ```

## Container Details

The Docker setup includes a PostgreSQL database container:

- **PostgreSQL Database**: A PostgreSQL 16 container
  - Exposed port: 5432
  - Default credentials: postgres:postgres
  - Database name: aether
  - Data is persisted using a Docker volume

## Database Management

### Connecting to the Database

You can connect to the database from your local machine:
```
Host: localhost
Port: 5432
User: postgres
Password: postgres
Database: aether
```

### Running Migrations

To run database migrations manually:
```bash
npx prisma migrate deploy
```

### Viewing Database Data

To start Prisma Studio and view your database:
```bash
npx prisma studio
```

### Manually Seeding Data

To seed the database with initial data:
```bash
node scripts/seed.mjs
```

## Troubleshooting

1. **Database Connection Issues**
   - Check if the PostgreSQL container is running: `docker compose ps`
   - View database logs: `docker compose logs db`

2. **Reset Database**
   - To completely reset your database, removing all data:
     ```bash
     docker compose down -v
     docker compose up -d
     ./scripts/db-setup.sh
     ```

3. **Check PostgreSQL Status**
   - To check if PostgreSQL is accepting connections:
     ```bash
     docker compose exec db pg_isready
     ```

## Production Use

For production deployment, consider:

1. Using a managed PostgreSQL database service
2. Setting stronger passwords
3. Implementing proper backup strategies for the database
4. Using environment variables for all sensitive information 