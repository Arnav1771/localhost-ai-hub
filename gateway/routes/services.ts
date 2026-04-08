import express, { Request, Response } from 'express';
import { exec } from 'child_process';
import util from 'util';

const router = express.Router();
const execAsync = util.promisify(exec);

// Utility function to handle errors
const handleError = (res: Response, error: any) => {
  console.error('Error:', error);
  res.status(500).json({ success: false, error: error.message || 'Internal Server Error' });
};

// GET /services - List all running services
router.get('/', async (req: Request, res: Response) => {
  try {
    const { stdout } = await execAsync('docker ps --format "{{.Names}}"');
    const services = stdout.split('\n').filter((name) => name.trim() !== '');
    res.json({ success: true, services });
  } catch (error) {
    handleError(res, error);
  }
});

// GET /services/:serviceName/status - Get the status of a specific service
router.get('/:serviceName/status', async (req: Request, res: Response) => {
  const { serviceName } = req.params;
  try {
    const { stdout } = await execAsync(`docker inspect -f '{{.State.Status}}' ${serviceName}`);
    const status = stdout.trim();
    res.json({ success: true, service: serviceName, status });
  } catch (error) {
    handleError(res, error);
  }
});

// POST /services/:serviceName/start - Start a specific service
router.post('/:serviceName/start', async (req: Request, res: Response) => {
  const { serviceName } = req.params;
  try {
    await execAsync(`docker start ${serviceName}`);
    res.json({ success: true, message: `Service ${serviceName} started successfully.` });
  } catch (error) {
    handleError(res, error);
  }
});

// POST /services/:serviceName/stop - Stop a specific service
router.post('/:serviceName/stop', async (req: Request, res: Response) => {
  const { serviceName } = req.params;
  try {
    await execAsync(`docker stop ${serviceName}`);
    res.json({ success: true, message: `Service ${serviceName} stopped successfully.` });
  } catch (error) {
    handleError(res, error);
  }
});

// POST /services/:serviceName/restart - Restart a specific service
router.post('/:serviceName/restart', async (req: Request, res: Response) => {
  const { serviceName } = req.params;
  try {
    await execAsync(`docker restart ${serviceName}`);
    res.json({ success: true, message: `Service ${serviceName} restarted successfully.` });
  } catch (error) {
    handleError(res, error);
  }
});

// GET /services/:serviceName/logs - Fetch logs of a specific service
router.get('/:serviceName/logs', async (req: Request, res: Response) => {
  const { serviceName } = req.params;
  try {
    const { stdout } = await execAsync(`docker logs --tail 100 ${serviceName}`);
    const logs = stdout.trim();
    res.json({ success: true, service: serviceName, logs });
  } catch (error) {
    handleError(res, error);
  }
});

export default router;