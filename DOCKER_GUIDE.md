# Docker Setup Guide for AetherInc

This guide explains how to use the Docker container setup for running the AetherInc application with a PostgreSQL database.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Quick Start

1. Clone the repository (if you haven't already)

2. Build and start the containers:
   ```bash
   docker-compose up -d
   ```

3. The application will be available at http://localhost:3000

4. To stop the containers:
   ```bash
   docker-compose down
   ```

## Environment Variables

You can customize the setup by setting environment variables in a `.env` file:

```
# Admin credentials
ADMIN_EMAIL=custom@example.com
ADMIN_PASSWORD=yoursecurepassword

# NextAuth secret
NEXTAUTH_SECRET=your-long-secure-secret
NEXTAUTH_URL=http://localhost:3000

# Database (if you want to change defaults)
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=aether
```

## Container Details

The Docker setup includes two containers:

1. **Web Application**: A Next.js application container
   - Exposed port: 3000
   - Built from the Dockerfile in the project
   - Uses PostgreSQL for data storage

2. **PostgreSQL Database**: A PostgreSQL 16 container
   - Exposed port: 5432
   - Default credentials: postgres:postgres
   - Database name: aether
   - Data is persisted using a Docker volume

## Database Management

- The database is automatically migrated on container startup
- Initial seed data is loaded automatically
- To connect to the database from outside the containers:
  ```
  Host: localhost
  Port: 5432
  User: postgres
  Password: postgres
  Database: aether
  ```

## Troubleshooting

1. **Database Connection Issues**
   - Check if the PostgreSQL container is running: `docker-compose ps`
   - View database logs: `docker-compose logs db`

2. **Web Application Issues**
   - View application logs: `docker-compose logs web`
   - Restart the application: `docker-compose restart web`

3. **Reset Everything**
   - To completely reset your setup, including all data:
     ```
     docker-compose down -v
     docker-compose up -d
     ```

## Building a Production Image

To build a standalone Docker image for production deployment:

```bash
# Build the image
docker build -t aetherinc:latest .

# Save the image to a file (for transfer to another system)
docker save aetherinc:latest -o aetherinc-docker.tar

# Load the image on another system
docker load -i aetherinc-docker.tar
```

## Deployment Options

For production deployment, consider:

1. Using a managed PostgreSQL database service
2. Setting up proper SSL/TLS termination
3. Configuring environment-specific settings
4. Implementing proper backup strategies for the database 