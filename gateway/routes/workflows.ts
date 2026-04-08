import express, { Request, Response } from 'express';
import { WorkflowManager } from '../services/WorkflowManager';
import { validateWorkflowPayload } from '../middlewares/validateWorkflowPayload';

const router = express.Router();
const workflowManager = new WorkflowManager();

// Route to get all workflows
router.get('/', async (req: Request, res: Response) => {
    try {
        const workflows = await workflowManager.getAllWorkflows();
        res.status(200).json(workflows);
    } catch (error) {
        console.error('Error fetching workflows:', error);
        res.status(500).json({ error: 'Failed to fetch workflows' });
    }
});

// Route to get a single workflow by ID
router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const workflow = await workflowManager.getWorkflowById(id);
        if (!workflow) {
            return res.status(404).json({ error: 'Workflow not found' });
        }
        res.status(200).json(workflow);
    } catch (error) {
        console.error(`Error fetching workflow with ID ${id}:`, error);
        res.status(500).json({ error: 'Failed to fetch workflow' });
    }
});

// Route to create a new workflow
router.post('/', validateWorkflowPayload, async (req: Request, res: Response) => {
    const workflowData = req.body;
    try {
        const newWorkflow = await workflowManager.createWorkflow(workflowData);
        res.status(201).json(newWorkflow);
    } catch (error) {
        console.error('Error creating workflow:', error);
        res.status(500).json({ error: 'Failed to create workflow' });
    }
});

// Route to update an existing workflow
router.put('/:id', validateWorkflowPayload, async (req: Request, res: Response) => {
    const { id } = req.params;
    const workflowData = req.body;
    try {
        const updatedWorkflow = await workflowManager.updateWorkflow(id, workflowData);
        if (!updatedWorkflow) {
            return res.status(404).json({ error: 'Workflow not found' });
        }
        res.status(200).json(updatedWorkflow);
    } catch (error) {
        console.error(`Error updating workflow with ID ${id}:`, error);
        res.status(500).json({ error: 'Failed to update workflow' });
    }
});

// Route to delete a workflow
router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deleted = await workflowManager.deleteWorkflow(id);
        if (!deleted) {
            return res.status(404).json({ error: 'Workflow not found' });
        }
        res.status(200).json({ message: 'Workflow deleted successfully' });
    } catch (error) {
        console.error(`Error deleting workflow with ID ${id}:`, error);
        res.status(500).json({ error: 'Failed to delete workflow' });
    }
});

// Route to execute a workflow
router.post('/:id/execute', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await workflowManager.executeWorkflow(id);
        if (!result) {
            return res.status(404).json({ error: 'Workflow not found or execution failed' });
        }
        res.status(200).json({ message: 'Workflow executed successfully', result });
    } catch (error) {
        console.error(`Error executing workflow with ID ${id}:`, error);
        res.status(500).json({ error: 'Failed to execute workflow' });
    }
});

export default router;