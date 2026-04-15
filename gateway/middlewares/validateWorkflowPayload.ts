import { Request, Response, NextFunction } from 'express';

export const validateWorkflowPayload = (req: Request, res: Response, next: NextFunction) => {
  const { name, description, steps } = req.body;

  if (!name || typeof name !== 'string') {
    return res.status(400).json({ error: 'Workflow name is required and must be a string' });
  }

  if (description && typeof description !== 'string') {
    return res.status(400).json({ error: 'Workflow description must be a string' });
  }

  if (steps && !Array.isArray(steps)) {
    return res.status(400).json({ error: 'Workflow steps must be an array' });
  }

  next();
};
