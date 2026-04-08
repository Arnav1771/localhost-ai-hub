import express, { Request, Response } from 'express';

const router = express.Router();

// In-memory storage for agents (replace with database integration in production)
const agents: { id: string; name: string; type: string; config: Record<string, any> }[] = [];

// Helper function to validate agent data
const validateAgentData = (data: any) => {
  if (!data.name || typeof data.name !== 'string') {
    return 'Agent name is required and must be a string.';
  }
  if (!data.type || typeof data.type !== 'string') {
    return 'Agent type is required and must be a string.';
  }
  if (!data.config || typeof data.config !== 'object') {
    return 'Agent config is required and must be an object.';
  }
  return null;
};

// Route to get all agents
router.get('/', (req: Request, res: Response) => {
  res.status(200).json({ success: true, agents });
});

// Route to create a new agent
router.post('/', (req: Request, res: Response) => {
  const { name, type, config } = req.body;

  const validationError = validateAgentData(req.body);
  if (validationError) {
    return res.status(400).json({ success: false, message: validationError });
  }

  const newAgent = {
    id: (Math.random() * 100000).toString(), // Replace with a proper UUID generator in production
    name,
    type,
    config,
  };

  agents.push(newAgent);

  res.status(201).json({ success: true, agent: newAgent });
});

// Route to get a specific agent by ID
router.get('/:id', (req: Request, res: Response) => {
  const agent = agents.find((agent) => agent.id === req.params.id);

  if (!agent) {
    return res.status(404).json({ success: false, message: 'Agent not found.' });
  }

  res.status(200).json({ success: true, agent });
});

// Route to update an existing agent by ID
router.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, type, config } = req.body;

  const validationError = validateAgentData(req.body);
  if (validationError) {
    return res.status(400).json({ success: false, message: validationError });
  }

  const agentIndex = agents.findIndex((agent) => agent.id === id);

  if (agentIndex === -1) {
    return res.status(404).json({ success: false, message: 'Agent not found.' });
  }

  agents[agentIndex] = { id, name, type, config };

  res.status(200).json({ success: true, agent: agents[agentIndex] });
});

// Route to delete an agent by ID
router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;

  const agentIndex = agents.findIndex((agent) => agent.id === id);

  if (agentIndex === -1) {
    return res.status(404).json({ success: false, message: 'Agent not found.' });
  }

  const deletedAgent = agents.splice(agentIndex, 1);

  res.status(200).json({ success: true, agent: deletedAgent[0] });
});

export default router;