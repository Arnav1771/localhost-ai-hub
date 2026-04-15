import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Agent {
  id: string;
  name: string;
  type: string;
  config: Record<string, any>;
}

const Agents: React.FC = () => {
    const [agents, setAgents] = useState<Agent[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [newAgentName, setNewAgentName] = useState<string>('');
    const [newAgentType, setNewAgentType] = useState<string>('research');

    useEffect(() => {
        const fetchAgents = async () => {
            try {
                const response = await axios.get('/api/agents');
                setAgents(response.data || []);
            } catch (err) {
                setError('Failed to fetch agents');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchAgents();
    }, []);

    const handleAddAgent = async () => {
        if (!newAgentName.trim()) {
            setError('Agent name is required');
            return;
        }

        try {
            const response = await axios.post('/api/agents', {
                name: newAgentName,
                type: newAgentType,
                config: {},
            });
            setAgents([...agents, response.data]);
            setNewAgentName('');
            setNewAgentType('research');
        } catch (err) {
            setError('Failed to add agent');
            console.error(err);
        }
    };

    const handleDeleteAgent = async (id: string) => {
        try {
            await axios.delete(`/api/agents/${id}`);
            setAgents(agents.filter(agent => agent.id !== id));
        } catch (err) {
            setError('Failed to delete agent');
            console.error(err);
        }
    };

    return (
        <div className="page">
            <div className="page-header">
                <h2>Manage AI Agents</h2>
                <p>Create and configure autonomous AI agents</p>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="card">
                <h3>Create New Agent</h3>
                <input
                    type="text"
                    value={newAgentName}
                    onChange={(e) => setNewAgentName(e.target.value)}
                    placeholder="Enter agent name"
                />
                <select value={newAgentType} onChange={(e) => setNewAgentType(e.target.value)}>
                    <option value="research">Research Agent</option>
                    <option value="writer">Writer Agent</option>
                    <option value="analyst">Analyst Agent</option>
                    <option value="developer">Developer Agent</option>
                </select>
                <button onClick={handleAddAgent}>Create Agent</button>
            </div>

            <div className="card">
                <h3>Active Agents</h3>
                {loading ? (
                    <p>Loading agents...</p>
                ) : agents.length > 0 ? (
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {agents.map(agent => (
                            <li key={agent.id} style={{ marginBottom: '15px', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }}>
                                <h4>{agent.name}</h4>
                                <p><strong>Type:</strong> {agent.type}</p>
                                <button onClick={() => handleDeleteAgent(agent.id)} style={{ backgroundColor: '#dc3545' }}>
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No agents created yet. Create one to get started!</p>
                )}
            </div>
        </div>
    );
};

export default Agents;