# Installation Guide for Comprehensive AI Agent Orchestration System

Welcome to the installation guide for the Comprehensive AI Agent Orchestration System. This document will help you set up the system locally on your machine.

## Prerequisites

Before you begin, ensure you have the following software installed:

- **Node.js** (v14 or later)
- **Docker** and **Docker Compose**
- **Python** (v3.7 or later)
- **PostgreSQL** (v12 or later)
- **Git**

## Step 1: Clone the Repository

Start by cloning the repository to your local machine. Open your terminal and run:

```bash
git clone https://github.com/yourusername/ai-agent-orchestration.git
cd ai-agent-orchestration
```

## Step 2: Set Up Environment Variables

Copy the example environment file to create your own configuration:

```bash
cp .env.example .env
```

Edit the `.env` file to configure your environment variables according to your setup. Make sure to set the database connection strings and any other necessary configurations.

## Step 3: Install Node.js Dependencies

Navigate to the `gateway` directory and install the required Node.js packages:

```bash
cd gateway
npm install
```

## Step 4: Set Up Python Dependencies

If you have any Python scripts, navigate to the relevant directory and install the dependencies using `pip`. If you have a `requirements.txt` file, you can install them as follows:

```bash
cd path/to/python/scripts
pip install -r requirements.txt
```

## Step 5: Set Up Database

### PostgreSQL

1. Start your PostgreSQL service. If you are using Docker, you can run:

   ```bash
   docker-compose up -d postgres
   ```

2. Create the necessary databases. You can use a database client or run the following commands in your terminal:

   ```bash
   psql -U yourusername -d postgres
   CREATE DATABASE ai_agents;
   CREATE DATABASE workflows;
   ```

### SQLite

If your application uses SQLite, ensure that the necessary files are created in the appropriate directories.

## Step 6: Start the Services

To start all services defined in your `docker-compose.yml`, run:

```bash
docker-compose up -d
```

This command will start all the necessary containers in the background.

## Step 7: Access the Application

Once all services are up and running, you can access the application by navigating to `http://localhost:3000` in your web browser. The API gateway should be operational.

## Step 8: Run Initialization Script (Optional)

If your application requires an initialization script to set up initial data, run the following command:

```bash
bash scripts/init.sh
```

## Step 9: Verify Everything is Running

You can check the logs of your services to ensure everything is running smoothly:

```bash
docker-compose logs -f
```

## Troubleshooting

If you encounter any issues during installation, please check the following:

- Ensure all prerequisites are installed and correctly configured.
- Verify your environment variables in the `.env` file.
- Check the logs for any errors.

## Conclusion

You have successfully set up the Comprehensive AI Agent Orchestration System on your local machine! You can now start exploring the features and functionalities of the system. For further assistance, please refer to the documentation in the `docs` directory.