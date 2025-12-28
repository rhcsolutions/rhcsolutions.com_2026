#!/bin/bash

# CloudPanel Deployment Script for 2026.rhcsolutions.com
# Run this script on your CloudPanel server

set -e

echo "🚀 Starting deployment for 2026.rhcsolutions.com..."

# Configuration
APP_NAME="rhc-2026"
SITE_DIR="/home/cloudpanel/htdocs/2026.rhcsolutions.com"
NODE_VERSION="18"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if running as root
if [ "$EUID" -eq 0 ]; then 
   echo -e "${RED}Please do not run as root${NC}"
   exit 1
fi

# Navigate to site directory
cd "$SITE_DIR" || exit 1

echo -e "${GREEN}✓${NC} Changed to $SITE_DIR"

# Pull latest changes (if using git)
if [ -d ".git" ]; then
    echo "📥 Pulling latest changes..."
    git pull origin master
    echo -e "${GREEN}✓${NC} Code updated"
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install --production
echo -e "${GREEN}✓${NC} Dependencies installed"

# Copy environment file
if [ -f ".env.production" ]; then
    echo "🔧 Setting up environment..."
    cp .env.production .env
    echo -e "${GREEN}✓${NC} Environment configured"
else
    echo -e "${YELLOW}⚠${NC} .env.production not found. Please create it first!"
    exit 1
fi

# Build application
echo "🔨 Building application..."
npm run build
echo -e "${GREEN}✓${NC} Build completed"

# Check if PM2 is installed
if ! command -v pm2 &> /dev/null; then
    echo "📦 Installing PM2..."
    npm install -g pm2
fi

# Start or restart application with PM2
if pm2 describe "$APP_NAME" &> /dev/null; then
    echo "🔄 Restarting application..."
    pm2 restart "$APP_NAME"
else
    echo "🚀 Starting application..."
    pm2 start npm --name "$APP_NAME" -- start
    pm2 save
fi

echo -e "${GREEN}✓${NC} Application started/restarted"

# Show status
pm2 status "$APP_NAME"

echo ""
echo -e "${GREEN}✅ Deployment completed successfully!${NC}"
echo ""
echo "Next steps:"
echo "1. Visit https://2026.rhcsolutions.com to verify"
echo "2. Check logs: pm2 logs $APP_NAME"
echo "3. Monitor: pm2 monit"
echo ""
