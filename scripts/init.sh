#!/bin/bash

# init.sh - Initialize the Local AI Hub project

set -e

# Function to log messages
log() {
    echo "[INFO] $(date '+%Y-%m-%d %H:%M:%S') - $1"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "[ERROR] Node.js is not installed. Please install Node.js 18 or higher."
    exit 1
fi

log "Initializing Local AI Hub..."
log "Node.js version: $(node --version)"
log "npm version: $(npm --version)"

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    log "Creating .env file from .env.example..."
    cp .env.example .env
    log ".env file created. Please update it with your configuration."
else
    log ".env file already exists."
fi

# Install dependencies
log "Installing dependencies..."
npm run install-all

log "Initialization complete!"
log "Next steps:"
log "  1. Update .env file with your configuration"
log "  2. For local development: npm run dev:gateway (in one terminal) and npm run dev:dashboard (in another)"
log "  3. For Docker deployment: docker-compose up --build"
log ""
log "Gateway will run on: http://localhost:3001"
log "Dashboard will run on: http://localhost:3000"
}

# Function to create necessary directories
create_directories() {
    log "Creating necessary directories..."
    mkdir -p data/documents
    mkdir -p logs
    log "Directories created successfully."
}

# Main script execution
log "Starting initialization process..."

create_directories
setup_configuration
initialize_database
run_migrations

log "Initialization process completed successfully."