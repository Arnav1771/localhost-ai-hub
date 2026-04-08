import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Workflow, WorkflowForm } from '../components';

const Workflows: React.FC = () => {
    const [workflows, setWorkflows] = useState<Workflow[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);

    useEffect(() => {
        const fetchWorkflows = async () => {
            try {
                const response = await axios.get('/api/workflows');
                setWorkflows(response.data);
            } catch (err) {
                setError('Failed to fetch workflows');
            } finally {
                setLoading(false);
            }
        };
        fetchWorkflows();
    }, []);

    const handleCreate = async (workflow: Workflow) => {
        try {
            const response = await axios.post('/api/workflows', workflow);
            setWorkflows([...workflows, response.data]);
        } catch (err) {
            setError('Failed to create workflow');
        }
    };

    const handleUpdate = async (workflow: Workflow) => {
        if (!selectedWorkflow) return;
        try {
            const response = await axios.put(`/api/workflows/${selectedWorkflow.id}`, workflow);
            setWorkflows(workflows.map(w => (w.id === selectedWorkflow.id ? response.data : w)));
            setIsEditing(false);
            setSelectedWorkflow(null);
        } catch (err) {
            setError('Failed to update workflow');
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`/api/workflows/${id}`);
            setWorkflows(workflows.filter(workflow => workflow.id !== id));
        } catch (err) {
            setError('Failed to delete workflow');
        }
    };

    const handleEdit = (workflow: Workflow) => {
        setSelectedWorkflow(workflow);
        setIsEditing(true);
    };

    return (
        <div className="workflows-container">
            <h1>Workflows</h1>
            {loading && <p>Loading workflows...</p>}
            {error && <p className="error">{error}</p>}
            <WorkflowForm
                onSubmit={isEditing ? handleUpdate : handleCreate}
                initialData={isEditing ? selectedWorkflow : null}
                onCancel={() => {
                    setIsEditing(false);
                    setSelectedWorkflow(null);
                }}
            />
            <ul>
                {workflows.map(workflow => (
                    <li key={workflow.id}>
                        <span>{workflow.name}</span>
                        <button onClick={() => handleEdit(workflow)}>Edit</button>
                        <button onClick={() => handleDelete(workflow.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Workflows;