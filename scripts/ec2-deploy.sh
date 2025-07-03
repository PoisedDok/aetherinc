#!/bin/bash

# EC2 Deployment script for AetherInc
# This script helps deploy the Docker image to an EC2 instance

# Get command line arguments
EC2_HOST=$1
PEM_FILE=$2

if [ -z "$EC2_HOST" ] || [ -z "$PEM_FILE" ]; then
  echo "Usage: $0 <ec2-user@hostname> <path/to/key.pem>"
  echo "Example: $0 ec2-user@ec2-12-34-56-78.compute-1.amazonaws.com ~/.ssh/key.pem"
  exit 1
fi

# Save the current image to a tarball
echo "📦 Saving Docker image to a tarball..."
docker save aetherinc:latest -o aetherinc-docker.tar

# Copy the files to the EC2 instance
echo "📤 Copying files to EC2 instance..."
scp -i "$PEM_FILE" aetherinc-docker.tar "$EC2_HOST:~/"
scp -i "$PEM_FILE" docker-compose.yml "$EC2_HOST:~/"
scp -i "$PEM_FILE" .env.production "$EC2_HOST:~/" 2>/dev/null || echo "Warning: .env.production not found, please create it on the server"

# Execute commands on the EC2 instance
echo "🚀 Deploying on EC2 instance..."
ssh -i "$PEM_FILE" "$EC2_HOST" << 'EOF'
  # Load the Docker image
  echo "📥 Loading Docker image..."
  docker load -i aetherinc-docker.tar

  # Create an .env.production file if it doesn't exist
  if [ ! -f ".env.production" ]; then
    echo "⚠️ Creating a default .env.production file. Please update with real values!"
    cat > .env.production << 'EOT'
# Production Environment Variables
NODE_ENV=production

# Database Configuration
POSTGRES_USER=aetherinc_user
POSTGRES_PASSWORD=change_me_in_production
POSTGRES_DB=aetherinc
DATABASE_URL=postgresql://aetherinc_user:change_me_in_production@postgres:5432/aetherinc

# NextAuth Configuration
NEXTAUTH_SECRET=change_me_in_production_generate_a_secure_random_string
NEXTAUTH_URL=https://yourdomain.com

# Disable Next.js telemetry
NEXT_TELEMETRY_DISABLED=1
EOT
  fi

  # Stop any running containers
  echo "🛑 Stopping existing containers..."
  docker-compose down || true

  # Start the containers
  echo "▶️ Starting containers..."
  docker-compose up -d

  # Show container status
  echo "📊 Container status:"
  docker-compose ps

  # Remove the Docker tarball to save space
  echo "🗑️ Cleaning up..."
  rm aetherinc-docker.tar
EOF

# Clean up local tarball
echo "🧹 Removing local Docker tarball..."
rm aetherinc-docker.tar

echo "✅ Deployment completed!"
echo "🌐 Your application should be available at http://$EC2_HOST:3000"
echo "   To set up a domain name and SSL, follow the instructions in DOCKER_DEPLOYMENT.md" 

# Stop any existing containers
echo "Stopping existing containers..."
docker-compose -f docker-compose.prod.yml down

# Pull latest code
echo "Pulling latest code..."
git pull

# Build and start containers with production configuration
echo "Building and starting containers..."
docker-compose -f docker-compose.prod.yml up -d --build

echo "Deployment completed successfully!"
echo "Your application should now be available at https://aetherinc.xyz" 