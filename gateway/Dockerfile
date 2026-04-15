FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy source code (files are directly in gateway, not in src/)
COPY *.ts ./
COPY routes ./routes

# Build the project
RUN npm run build

# Expose port
EXPOSE 3001

# Create uploads directory
RUN mkdir -p uploads

# Start the application
CMD ["npm", "start"]
