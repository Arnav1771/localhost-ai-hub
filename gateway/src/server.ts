import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import * as winston from 'winston';

dotenv.config();

// Logger setup
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
});

const app = express();
const PORT = process.env.GATEWAY_PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// API Routes
app.get('/api', (req: Request, res: Response) => {
  res.json({
    message: 'localhost-ai-hub Gateway API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      api: '/api',
      status: '/api/status',
    },
  });
});

app.get('/api/status', (req: Request, res: Response) => {
  res.json({
    gateway: 'running',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
  });
});

// Echo endpoint for testing
app.post('/api/echo', (req: Request, res: Response) => {
  res.json({
    received: req.body,
    timestamp: new Date().toISOString(),
  });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.message);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message,
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Not Found',
    path: req.path,
  });
});

// Start server
app.listen(PORT, () => {
  logger.info(`Gateway running on port ${PORT}`);
  logger.info(`Health check: http://localhost:${PORT}/health`);
  logger.info(`API Root: http://localhost:${PORT}/api`);
});
