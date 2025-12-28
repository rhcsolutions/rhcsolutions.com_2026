#!/bin/bash

# CloudPanel Deployment Script for 2026.rhcsolutions.com
# Run this script from your application directory

set -e

echo "🚀 Starting deployment for 2026.rhcsolutions.com..."

# Configuration
APP_NAME="rhc-2026"

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

# Verify we're in the right directory (check for package.json)
if [ ! -f "package.json" ]; then
    echo -e "${RED}Error: package.json not found. Please run this script from the project root directory.${NC}"
    exit 1
fi

echo -e "${GREEN}✓${NC} Running in: $(pwd)"

# Pull latest changes (if using git)
if [ -d ".git" ]; then
    echo "📥 Pulling latest changes..."
    git pull origin master
    echo -e "${GREEN}✓${NC} Code updated"
fi

# Check if Node.js/npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm not found!${NC}"
    echo ""
    echo "Node.js and npm are required for deployment."
    echo ""
    echo "═══════════════════════════════════════════════════════════════"
    echo "INSTALLATION INSTRUCTIONS (CloudPanel - Ubuntu/Debian):"
    echo "═══════════════════════════════════════════════════════════════"
    echo ""
    echo "Step 1: Run this command:"
    echo "  curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -"
    echo ""
    echo "Step 2: Install Node.js (includes npm):"
    echo "  sudo apt-get install -y nodejs"
    echo ""
    echo "Step 3: Verify installation:"
    echo "  node -v"
    echo "  npm -v"
    echo ""
    echo "Step 4: After successful installation, re-run this script:"
    echo "  ./deploy.sh"
    echo ""
    echo "═══════════════════════════════════════════════════════════════"
    echo ""
    exit 1
fi

echo -e "${GREEN}✓${NC} Node.js $(node -v) and npm $(npm -v) found"

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
