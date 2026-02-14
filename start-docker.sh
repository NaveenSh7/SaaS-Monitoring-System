#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Starting SaaS Monitoring System with Docker${NC}"
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}❌ Error: Docker is not running. Please start Docker and try again.${NC}"
    exit 1
fi

# Check if .env file exists
if [ ! -f .env ]; then
    echo -e "${YELLOW}⚠️  No .env file found. Creating from .env.docker...${NC}"
    cp .env.docker .env
    echo -e "${YELLOW}⚠️  Please edit .env file with your actual credentials before continuing.${NC}"
    echo ""
    read -p "Press Enter once you've updated the .env file..."
fi

# Build and start containers
echo -e "${GREEN}🏗️  Building Docker images...${NC}"
docker-compose build

echo ""
echo -e "${GREEN}🚀 Starting containers...${NC}"
docker-compose up -d

echo ""
echo -e "${GREEN}⏳ Waiting for services to be ready...${NC}"
sleep 10

# Initialize database
echo ""
echo -e "${GREEN}🗄️  Initializing database...${NC}"
docker-compose exec server-1 node scripts/init-db.js

echo ""
echo -e "${GREEN}✅ Setup complete!${NC}"
echo ""
echo -e "${GREEN}🌐 Access your application:${NC}"
echo -e "   Frontend:  ${GREEN}http://localhost:3000${NC}"
echo -e "   Server-1:  ${GREEN}http://localhost:5000${NC}"
echo -e "   Server-2:  ${GREEN}http://localhost:5001${NC}"
echo ""
echo -e "${YELLOW}📝 Useful commands:${NC}"
echo -e "   View logs:          ${YELLOW}docker-compose logs -f${NC}"
echo -e "   Stop services:      ${YELLOW}docker-compose down${NC}"
echo -e "   Restart services:   ${YELLOW}docker-compose restart${NC}"
echo ""
