import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Workflow {
  id: string;
  name: string;
  description: string;
}

const Workflows: React.FC = () => {
    const [workflows, setWorkflows] = useState<Workflow[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [newWorkflowName, setNewWorkflowName] = useState<string>('');
    const [newWorkflowDescription, setNewWorkflowDescription] = useState<string>('');

    useEffect(() => {
        const fetchWorkflows = async () => {
            try {
                const response = await axios.get('/api/workflows');
                setWorkflows(response.data || []);
            } catch (err) {
                setError('Failed to fetch workflows');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchWorkflows();
    }, []);

    const handleCreateWorkflow = async () => {
        if (!newWorkflowName.trim()) {
            setError('Workflow name is required');
            return;
        }

        try {
            const response = await axios.post('/api/workflows', {
                name: newWorkflowName,
                description: newWorkflowDescription,
            });
            setWorkflows([...workflows, response.data]);
            setNewWorkflowName('');
            setNewWorkflowDescription('');
        } catch (err) {
            setError('Failed to create workflow');
            console.error(err);
        }
    };

    const handleDeleteWorkflow = async (id: string) => {
        try {
            await axios.delete(`/api/workflows/${id}`);
            setWorkflows(workflows.filter(workflow => workflow.id !== id));
        } catch (err) {
            setError('Failed to delete workflow');
            console.error(err);
        }
    };

    return (
        <div className="page">
            <div className="page-header">
                <h2>Workflows</h2>
                <p>Create and manage AI workflows</p>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="card">
                <h3>Create New Workflow</h3>
                <input
                    type="text"
                    value={newWorkflowName}
                    onChange={(e) => setNewWorkflowName(e.target.value)}
                    placeholder="Workflow name"
                />
                <textarea
                    value={newWorkflowDescription}
                    onChange={(e) => setNewWorkflowDescription(e.target.value)}
                    placeholder="Workflow description"
                    rows={3}
                />
                <button onClick={handleCreateWorkflow}>Create Workflow</button>
            </div>

            <div className="card">
                <h3>Existing Workflows</h3>
                {loading ? (
                    <p>Loading workflows...</p>
                ) : workflows.length > 0 ? (
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {workflows.map(workflow => (
                            <li key={workflow.id} style={{ marginBottom: '15px', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }}>
                                <h4>{workflow.name}</h4>
                                <p>{workflow.description}</p>
                                <button onClick={() => handleDeleteWorkflow(workflow.id)} style={{ backgroundColor: '#dc3545' }}>
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No workflows created yet.</p>
                )}
            </div>
        </div>
    );
};

export default Workflows;