#!/bin/bash

# start.sh - Start all services using Docker Compose

set -e

# Function to log messages
log() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1"
}

log "Starting Local AI Hub..."
log "Building and starting Docker services..."

# Start Docker services
docker-compose up --build

log "All services started successfully!"
log "Gateway: http://localhost:3001"
log "Dashboard: http://localhost:3000"
log "Starting the AI Orchestration System..."
start_docker_services
wait_for_services
run_migrations
start_application
log "AI Orchestration System is now running!"