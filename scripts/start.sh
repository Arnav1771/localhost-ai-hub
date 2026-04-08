#!/bin/bash

# start.sh - Script to start all services for the AI Orchestration System

set -e  # Exit immediately if a command exits with a non-zero status

# Function to log messages
log() {
    local message="$1"
    echo "$(date '+%Y-%m-%d %H:%M:%S') - ${message}"
}

# Function to start Docker services
start_docker_services() {
    log "Starting Docker services..."
    docker-compose up -d
    log "Docker services started."
}

# Function to wait for services to become healthy
wait_for_services() {
    log "Waiting for services to become healthy..."
    services=("gateway" "postgres" "sqlite" "ai_service_1" "ai_service_2" "ai_service_3")  # Add all your service names here
    for service in "${services[@]}"; do
        log "Checking health of $service..."
        while ! docker inspect -f '{{.State.Health.Status}}' "$service" | grep -q "healthy"; do
            sleep 5
            log "$service is not healthy yet. Checking again..."
        done
        log "$service is healthy."
    done
}

# Function to run migrations
run_migrations() {
    log "Running database migrations..."
    # Assuming you have a migration command; modify as necessary
    docker-compose exec postgres alembic upgrade head
    log "Database migrations completed."
}

# Function to start the application
start_application() {
    log "Starting the application..."
    # You can add commands to start other necessary services or scripts here
    # For example, starting a background worker, etc.
    log "Application started."
}

# Main script execution
log "Starting the AI Orchestration System..."
start_docker_services
wait_for_services
run_migrations
start_application
log "AI Orchestration System is now running!"