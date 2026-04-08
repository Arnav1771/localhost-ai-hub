import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import helmet from 'helmet';
import servicesRoutes from './routes/services';
import agentsRoutes from './routes/agents';
import workflowsRoutes from './routes/workflows';
import documentsRoutes from './routes/documents';
import { createLogger, transports, format } from 'winston';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Logger setup using Winston
const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}]: ${message}`)
  ),
  transports: [new transports.Console()],
});

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } }));

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(`${err.name}: ${err.message}`);
  res.status(500).json({ error: 'Internal Server Error' });
});

// API Routes
app.use('/api/services', servicesRoutes);
app.use('/api/agents', agentsRoutes);
app.use('/api/workflows', workflowsRoutes);
app.use('/api/documents', documentsRoutes);

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'Healthy' });
});

// Start server
app.listen(PORT, () => {
  logger.info(`API Gateway is running on http://localhost:${PORT}`);
});

export default app;