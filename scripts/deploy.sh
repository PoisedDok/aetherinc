#!/bin/bash

# AetherInc Deployment Script for Amazon Linux EC2
# Usage: ./deploy.sh [--docker]

set -e

echo "🚀 Starting AetherInc deployment..."

# Check if running as root
if [ "$EUID" -eq 0 ]; then
  echo "❌ Please don't run this script as root"
  exit 1
fi

# Parse arguments
DOCKER_DEPLOY=false
if [ "$1" = "--docker" ]; then
  DOCKER_DEPLOY=true
  echo "📦 Docker deployment mode enabled"
fi

# Update system packages
echo "📦 Updating system packages..."
sudo yum update -y

if [ "$DOCKER_DEPLOY" = true ]; then
  # Docker deployment
  echo "🐳 Setting up Docker deployment..."
  
  # Install Docker if not present
  if ! command -v docker &> /dev/null; then
    echo "Installing Docker..."
    sudo yum install -y docker
    sudo systemctl start docker
    sudo systemctl enable docker
    sudo usermod -a -G docker $USER
  fi
  
  # Install Docker Compose if not present
  if ! command -v docker-compose &> /dev/null; then
    echo "Installing Docker Compose..."
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
  fi
  
  # Build and start containers
  echo "🏗️ Building and starting Docker containers..."
  docker-compose down || true
  docker-compose build --no-cache
  docker-compose up -d
  
  echo "✅ Docker deployment completed!"
  echo "🌐 Application should be available at http://localhost:3000"
  
else
  # Traditional deployment
  echo "🛠️ Setting up traditional deployment..."
  
  # Install Node.js 18 if not present
  if ! command -v node &> /dev/null; then
    echo "Installing Node.js 18..."
    curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
    sudo yum install -y nodejs
  fi
  
  # Install PM2 globally if not present
  if ! command -v pm2 &> /dev/null; then
    echo "Installing PM2..."
    sudo npm install -g pm2
  fi
  
  # Install dependencies
  echo "📦 Installing dependencies..."
  npm ci --production
  
  # Build the application
  echo "🏗️ Building application..."
  npm run build
  
  # Setup database
  echo "🗄️ Setting up database..."
  npx prisma generate
  npx prisma migrate deploy
  
  # Seed database with initial data
  echo "🌱 Seeding database..."
  node scripts/seed.mjs
  
  # Import AI tools
  echo "🤖 Importing AI tools..."
  node scripts/import-tools.mjs
  
  # Stop existing PM2 processes
  pm2 stop aetherinc || true
  pm2 delete aetherinc || true
  
  # Start application with PM2
  echo "🚀 Starting application with PM2..."
  pm2 start npm --name "aetherinc" -- start
  pm2 save
  pm2 startup
  
  echo "✅ Traditional deployment completed!"
  echo "🌐 Application should be available at http://localhost:3000"
fi

# Final checks
echo "🔍 Running final checks..."
sleep 5

if curl -f http://localhost:3000/api/health > /dev/null 2>&1; then
  echo "✅ Health check passed!"
else
  echo "⚠️ Health check failed - please check logs"
fi

echo "🎉 Deployment completed successfully!"
echo ""
echo "📋 Next steps:"
echo "   • Visit http://localhost:3000 to access the application"
echo "   • Admin login: admin@aetherinc.com / AetherInc2025!Admin"
echo "   • Check logs: pm2 logs aetherinc (traditional) or docker-compose logs (Docker)"
echo "   • Monitor: pm2 monit (traditional) or docker-compose ps (Docker)" 