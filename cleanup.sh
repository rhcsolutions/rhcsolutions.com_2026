#!/bin/bash

# Pre-Deployment Cleanup Script
# Removes unnecessary files and directories before deployment

echo "🧹 Starting pre-deployment cleanup..."

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Remove build artifacts
if [ -d ".next" ]; then
    echo "Removing .next build directory..."
    rm -rf .next
    echo -e "${GREEN}✓${NC} .next removed"
fi

# Remove node_modules (will be installed fresh on server)
if [ -d "node_modules" ]; then
    echo "Removing node_modules..."
    rm -rf node_modules
    echo -e "${GREEN}✓${NC} node_modules removed"
fi

# Remove TypeScript build info
if [ -f "tsconfig.tsbuildinfo" ]; then
    rm tsconfig.tsbuildinfo
    echo -e "${GREEN}✓${NC} TypeScript build info removed"
fi

# Remove zip archives
if ls *.zip 1> /dev/null 2>&1; then
    echo "Removing zip archives..."
    rm -f *.zip
    echo -e "${GREEN}✓${NC} Zip archives removed"
fi

# Remove log files
if [ -f "build.log" ]; then
    rm build.log
    echo -e "${GREEN}✓${NC} build.log removed"
fi

# Remove test files
if [ -f "test-telegram.js" ]; then
    rm test-telegram.js
    echo -e "${GREEN}✓${NC} test-telegram.js removed"
fi

# Remove load test files
if [ -f "load-test.js" ]; then
    rm -f load-test.js load-test-simple.js test-simple-connection.js
    echo -e "${GREEN}✓${NC} Load test files removed"
fi

# Remove LOAD_TEST_REPORT if exists
if [ -f "LOAD_TEST_REPORT.md" ]; then
    rm LOAD_TEST_REPORT.md
    echo -e "${GREEN}✓${NC} LOAD_TEST_REPORT.md removed"
fi

# Remove .env.local (development only)
if [ -f ".env.local" ]; then
    rm .env.local
    echo -e "${GREEN}✓${NC} .env.local removed (use .env.production on server)"
fi

# Clean up VS Code settings if desired
# Uncomment if you don't want to deploy VS Code settings
# if [ -d ".vscode" ]; then
#     rm -rf .vscode
#     echo -e "${GREEN}✓${NC} .vscode removed"
# fi

echo ""
echo -e "${GREEN}✅ Cleanup completed!${NC}"
echo ""
echo "Files ready for deployment. Recommended next steps:"
echo "1. npm install --production (on server)"
echo "2. npm run build (on server)"
echo ""
