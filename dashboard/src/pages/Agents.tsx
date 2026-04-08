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
            <h2>LocalHost AI Agent Hub: Ultimate All-In-One AI Operating System</h2>
            <p>The ultimate all-in-one AI agent orchestration system integrating 25+ open-source AI tools. Complete local "AI Operating System" with orchestration, browser automation, multi-agent teams, knowledge management, and unified dashboard - zero cloud, 100% private.</p>
            <h3>Core Vision</h3>
            <p>Full-stack AI OS combining: The Brain (Ollama models), The Logic & Glue (n8n/Activepieces automation), The Hands (Skyvern/LaVague browser automation), The Brain Power (CrewAI/AutoGen agents), The Knowledge (AnythingLLM RAG), and The Interface (Open WebUI) - all integrated through unified orchestration hub with real-time monitoring.</p>
            <h3>System Architecture</h3>
            <p>6 Layers + 25 Services</p>
            <h4>LAYER 1: THE BRAIN (Model Runtime)</h4>
            <ul>
                <li>OLLAMA (Primary Model Engine)</li>
                <li>LM STUDIO (Professional Model Manager)</li>
                <li>LOCALAI (OpenAI API Compatibility)</li>
                <li>VLLM (High-Performance Model Hosting)</li>
            </ul>
            <h4>LAYER 2: THE HANDS (Browser & Web Automation)</h4>
            <ul>
                <li>SKYVERN (AI Browser Agent)</li>
                <li>LAVAGUE (DOM-Based Browser Control)</li>
                <li>STEEL (Stealthy Browser Engine)</li>
                <li>OPENMANUS (Local-First Web Agent)</li>
                <li>AGENT-E (DOM Distillation)</li>
                <li>ZEROSTEP (English Browser Automation)</li>
            </ul>
            <h4>LAYER 3: THE LOGIC & GLUE (Workflow Automation)</h4>
            <ul>
                <li>N8N (Enterprise Automation Standard)</li>
                <li>ACTIVEPIECES (User-Friendly Automation)</li>
                <li>HUGINN (Set-It-and-Forget-It Agent)</li>
                <li>RELAY (Modern AI-First Automation)</li>
            </ul>
            <h4>LAYER 4: THE BRAIN POWER (Multi-Agent Orchestration)</h4>
            <ul>
                <li>CREWAI (Role-Based Agent Teams)</li>
                <li>AUTOGEN (Microsoft Agent Framework)</li>
                <li>OPENDEVIN (Autonomous Software Engineer)</li>
            </ul>
            <h4>LAYER 5: THE KNOWLEDGE (Data + RAG Management)</h4>
            <ul>
                <li>ANYTHINGLLM (Knowledge Base Builder)</li>
                <li>FLOWISE (Visual LLM Chain Builder)</li>
                <li>LANGFLOW (Modular RAG Pipelines)</li>
                <li>DIFY (AI Development Platform)</li>
                <li>SUPABASE (Local Postgres + Vectors)</li>
            </ul>
            <h4>LAYER 6: THE INTERFACE (User Dashboard + Chat)</h4>
            <ul>
                <li>OPEN WEBUI (Professional Chat Interface)</li>
                <li>JAN (Minimalist Desktop Client)</li>
                <li>UNIFIED CONTROL DASHBOARD (Custom Built)</li>
            </ul>
            <h3>Unified Control Dashboard (Custom Built)</h3>
            <p>Dashboard showing status of all 25 services, real-time metrics + health checks, unified authentication system (JWT), service orchestration controls, monitoring + logging aggregation, API gateway for all services, environment variable management, Docker Compose orchestration, auto-restart on failure, GPU resource allocation.</p>
            <h3>How They Work Together</h3>
            <p>The Complete Loop: User gives command to Open WebUI or Jan, which sends request to Unified Dashboard, routing to appropriate service based on needs.</p>
            <h3>Core Features & Workflows</h3>
            <p>Agent orchestration system, intelligent document processing, web intelligence gathering, workflow automation, API compatibility layer, advanced web intelligence, enterprise workflow orchestration, advanced reasoning & memory, distributed multi-agent coordination, monitoring, analytics & control, security & isolation.</p>
            <h3>Tech Stack (Updated for 25 Services)</h3>
            <p>Backend Layer: Node.js + Express, Python FastAPI, Docker Compose, PostgreSQL + Supabase, QDrant, Redis.</p>
            <p>Model Runtime Services: Ollama, LM Studio, LocalAI, vLLM.</p>
            <p>Browser Automation Services: Skyvern, LaVague, Steel, OpenManus, Agent-E, ZeroStep.</p>
            <p>Workflow Automation Services: N8N, Activepieces, Huginn, Relay.</p>
            <p>Multi-Agent Services: CrewAI, AutoGen, OpenDevin.</p>
            <p>Knowledge Management Services: AnythingLLM, Flowise, Langflow, Dify, Supabase vectors.</p>
            <p>User Interface Services: Open WebUI, Jan, Custom Dashboard.</p>
            <p>Frontend Architecture: React + TypeScript, WebSocket real-time updates, Material-UI + Tailwind CSS, mobile-responsive design, dark mode + accessibility.</p>
            <p>Infrastructure: Docker Compose, .env file configuration, health check endpoints, service discovery via internal DNS, named volumes for persistence, GPU resource allocation, network isolation layers.</p>
            <h3>Deployment Architecture</h3>
            <p>Local Development: docker-compose.yml with all 12 services, volume mounts for data persistence, environment-based configuration, local network.</p>
            <p>Production (Optional Cloud): Docker Swarm or Kubernetes, cloud storage for models, multi-replica services, load balancing, TLS certificates, rate limiting + auth.</p>
            <h3>API Endpoints (Gateway)</h3>
            <p>Service Management: GET /api/services, POST /api/services/{id}/restart, GET /api/health, GET /api/metrics.</p>
            <p>Agent Management: GET /api/agents, POST /api/agents, POST /api/agents/{id}/task, GET /api/agents/{id}/status.</p>
            <p>Workflow Execution: POST /api/workflows/execute, GET /api/workflows/{id}, GET /api/workflows/history, WEBSOCKET /ws/workflows/{id}.</p>
            <p>OpenAI Compatibility (via LocalAI): POST /v1/chat/completions, POST /v1/completions, GET /v1/models.</p>
            <h3>Key Differentiators</h3>
            <p>Complete system, multi-agent orchestration, advanced knowledge management, browser intelligence, enterprise automation & integration, multi-agent coordination, development friendly.</p>
            <h3>Quick Start (3 Steps)</h3>
            <p>1. Install Docker + Docker Compose 2. Clone repo + run: docker-compose up 3. Open http://localhost:3173 (dashboard)</p>
            <h3>Monitoring & Observability</h3>
            <p>Real-time service health dashboard, model inference latency tracking, agent task execution metrics, API usage analytics, error rate monitoring, vector DB query performance, GPU/CPU/Memory utilization graphs, centralized logging.</p>
            <h3>Security Features</h3>
            <p>JWT authentication, role-based access control, API key management, rate limiting per endpoint, input validation, SQL injection prevention, CORS configuration, audit logging, data encryption at rest, isolated containers + networks.</p>
        </div>
    );
};

export default Agents;