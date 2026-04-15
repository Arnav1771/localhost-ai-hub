import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import helmet from 'helmet';
import Docker from 'dockerode'; // Added Dockerode import
import servicesRoutes from './routes/services';
import agentsRoutes from './routes/agents';
import workflowsRoutes from './routes/workflows';
import documentsRoutes from './routes/documents';
import { createLogger, transports, format } from 'winston';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Docker connection for WSL2
// This connects to the local Unix socket used by Docker in Linux
const docker = new Docker({ socketPath: '/var/run/docker.sock' });

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

// --- Added Docker Management Endpoints ---

// System Health & Docker Status
app.get('/api/docker/status', async (req: Request, res: Response) => {
  try {
    const info = await docker.info();
    res.status(200).json({ 
      status: 'Connected to WSL Docker', 
      runningContainers: info.ContainersRunning,
      totalMemory: info.MemTotal 
    });
  } catch (err: any) {
    logger.error(`Docker Connection Error: ${err.message}`);
    res.status(500).json({ error: 'Docker not reachable. Ensure "sudo service docker start" is running.' });
  }
});

// Start Stirling-PDF Service
app.post('/api/services/start-pdf', async (req: Request, res: Response) => {
  try {
    const container = docker.getContainer('stirling-pdf');
    await container.start();
    logger.info('Stirling-PDF service started via API');
    res.status(200).json({ message: 'Stirling-PDF started successfully!' });
  } catch (err: any) {
    logger.error(`Service Start Error: ${err.message}`);
    res.status(500).json({ error: err.message });
  }
});

// ------------------------------------------

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

// Root endpoint
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    name: 'Local AI Hub - API Gateway',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      health: '/health',
      agents: '/api/agents',
      workflows: '/api/workflows',
      documents: '/api/documents',
      services: '/api/services',
      docker: '/api/docker/status'
    },
    dashboard: 'http://localhost:3000',
    documentation: 'See endpoints object for available routes'
  });
});

// Start server
app.listen(PORT, () => {
  logger.info(`API Gateway is running on http://localhost:${PORT}`);
});

export default app;