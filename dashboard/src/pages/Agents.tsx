import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Agents: React.FC = () => {
    const [agents, setAgents] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [newAgentName, setNewAgentName] = useState<string>('');

    useEffect(() => {
        const fetchAgents = async () => {
            try {
                const response = await axios.get('/api/agents');
                setAgents(response.data);
            } catch (err) {
                setError('Failed to fetch agents');
            } finally {
                setLoading(false);
            }
        };

        fetchAgents();
    }, []);

    const handleAddAgent = async () => {
        if (!newAgentName) return;

        try {
            const response = await axios.post('/api/agents', { name: newAgentName });
            setAgents([...agents, response.data]);
            setNewAgentName('');
        } catch (err) {
            setError('Failed to add agent');
        }
    };

    const handleDeleteAgent = async (id: string) => {
        try {
            await axios.delete(`/api/agents/${id}`);
            setAgents(agents.filter(agent => agent.id !== id));
        } catch (err) {
            setError('Failed to delete agent');
        }
    };

    return (
        <div>
            <h1>Manage AI Agents</h1>
            {loading && <p>Loading agents...</p>}
            {error && <p className="error">{error}</p>}
            <div>
                <input
                    type="text"
                    value={newAgentName}
                    onChange={(e) => setNewAgentName(e.target.value)}
                    placeholder="Enter new agent name"
                />
                <button onClick={handleAddAgent}>Add Agent</button>
            </div>
            <ul>
                {agents.map(agent => (
                    <li key={agent.id}>
                        {agent.name}
                        <button onClick={() => handleDeleteAgent(agent.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Agents;