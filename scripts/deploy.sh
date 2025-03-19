#!/bin/bash

# aetherinc deployment script for Amazon Linux EC2
# This script handles the installation of dependencies, building and starting the application

set -e # Exit script on error

echo "🚀 Starting deployment process for aetherinc..."

# Update system
echo "📦 Updating system packages..."
sudo yum update -y

# Install Node.js 18.x (if not already installed)
if ! command -v node &> /dev/null; then
    echo "📦 Installing Node.js..."
    curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
    sudo yum install -y nodejs
fi

# Install Docker (if not already installed)
if ! command -v docker &> /dev/null; then
    echo "📦 Installing Docker..."
    sudo yum install -y docker
    sudo systemctl start docker
    sudo systemctl enable docker
    sudo usermod -aG docker $USER
    echo "⚠️ Docker group added - you may need to log out and back in for this to take effect."
fi

# Check if we're using Docker or direct deployment
if [ "$1" = "--docker" ]; then
    echo "🐳 Building and running with Docker..."
    
    # Build Docker image
    docker build -t aetherinc .
    
    # Stop existing container if it exists
    docker stop aetherinc-app 2>/dev/null || true
    docker rm aetherinc-app 2>/dev/null || true
    
    # Run container
    docker run -d --name aetherinc-app -p 3000:3000 aetherinc
    
    echo "✅ Application deployed via Docker and running on port 3000"
else
    echo "🔨 Building and running directly with Node.js..."
    
    # Install dependencies
    echo "📦 Installing dependencies..."
    npm ci
    
    # Build application
    echo "🏗️ Building application..."
    npm run build
    
    # Check if PM2 is installed, install if needed
    if ! command -v pm2 &> /dev/null; then
        echo "📦 Installing PM2 process manager..."
        sudo npm install -g pm2
    fi
    
    # Start/restart application with PM2
    echo "🚀 Starting application with PM2..."
    pm2 delete aetherinc 2>/dev/null || true
    pm2 start npm --name "aetherinc" -- run start
    
    # Configure PM2 to restart on server reboot
    pm2 save
    
    # Setup nginx as reverse proxy (if not already configured)
    if ! command -v nginx &> /dev/null; then
        echo "📦 Installing and configuring Nginx..."
        sudo yum install -y nginx
        
        # Create Nginx configuration
        sudo tee /etc/nginx/conf.d/aetherinc.conf > /dev/null << EOL
server {
    listen 80;
    server_name _;  # Replace with your domain or IP

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOL

        # Test nginx config and restart
        sudo nginx -t
        sudo systemctl enable nginx
        sudo systemctl restart nginx
    fi
    
    echo "✅ Application deployed and running on port 80 via Nginx proxy to port 3000"
fi

echo "🎉 Deployment complete! Your application should now be accessible."
echo "🔒 For production, consider setting up SSL with Let's Encrypt using Certbot." 