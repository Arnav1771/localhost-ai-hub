#!/bin/bash

# init.sh - Initialization script for the AI agent orchestration system

set -e

# Function to log messages
log() {
    echo "[INFO] $(date '+%Y-%m-%d %H:%M:%S') - $1"
}

# Function to check if a command was successful
check_command() {
    if [ $? -ne 0 ]; then
        echo "[ERROR] Command failed: $1"
        exit 1
    fi
}

# Function to initialize the PostgreSQL database
initialize_database() {
    log "Initializing PostgreSQL database..."
    # Assuming we have a Docker container for PostgreSQL named 'ai_postgres'
    docker exec -it ai_postgres psql -U postgres -c "CREATE DATABASE ai_orchestration;"
    check_command "Creating PostgreSQL database"

    log "Database initialized successfully."
}

# Function to run migrations
run_migrations() {
    log "Running database migrations..."
    # Assuming we have a migration tool set up
    npm run migrate
    check_command "Running migrations"

    log "Migrations completed successfully."
}

# Function to set up initial configuration
setup_configuration() {
    log "Setting up initial configuration..."
    if [ ! -f .env ]; then
        cp .env.example .env
        log ".env file created from .env.example"
    else
        log ".env file already exists, skipping creation."
    fi

    log "Initial configuration setup completed."
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