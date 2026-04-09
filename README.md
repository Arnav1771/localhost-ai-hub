# localhost-ai-hub 🚀

**Express Gateway + React Dashboard Monorepo**

A production-ready full-stack application with:
- ✅ **Express API Gateway** (Node.js + TypeScript) on port 3001
- ✅ **React Dashboard** (React + Vite + TypeScript) on port 3000
- ✅ **Vercel Deployment** (Free tier compatible)
- ✅ **Discord Bot Integration** (Deploy with one command)

---

## 🎯 Quick Start

### Install All Dependencies
```bash
npm run install-all
```

### Development
```bash
# Terminal 1 - Start Gateway (port 3001)
npm run dev:gateway

# Terminal 2 - Start Dashboard (port 3000)
npm run dev:dashboard
```

**Visit**: http://localhost:3000

### Build for Production
```bash
npm run build-all
```

### Deploy to Vercel
```bash
# Push to GitHub
git push origin main

# In Discord:
/deploy repo: arnav1771/localhost-ai-hub
```

---

## 📊 Project Structure

```
localhost-ai-hub/
├── package.json                  (Root - Workspace manager)
├── tsconfig.json                 (Root - TypeScript config)
├── vercel.json                   (Vercel deployment config)
│
├── gateway/                      (Express API Server)
│   ├── package.json             
│   ├── tsconfig.json
│   └── src/
│       └── server.ts            (Express app)
│
└── dashboard/                    (React Frontend)
    ├── package.json
    ├── tsconfig.json
    ├── vite.config.ts
    ├── index.html
    └── src/
        ├── App.tsx
        ├── main.tsx
        └── index.css
```

---

## 🔌 API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/health` | GET | Health check |
| `/api` | GET | API info |
| `/api/status` | GET | Gateway status |
| `/api/echo` | POST | Echo request |

---

## 🤖 Discord Bot Commands

```bash
# Deploy to Vercel
/deploy repo: arnav1771/localhost-ai-hub

# Update & redeploy
/update repo: arnav1771/localhost-ai-hub changes: description

# Validate tokens
/keys

# Check status
/status

# Show help
/help
```

---

## 📦 Tech Stack

| Component | Tech | Version |
|-----------|------|---------|
| Backend | Node.js + Express + TypeScript | 18 / 4.18 / 5.0 |
| Frontend | React + Vite + TypeScript | 18.2 / 4.3 / 5.0 |
| Styling | Tailwind CSS | 3.3 |
| State | Zustand | 4.3 |
| Deployment | Vercel | Free Tier |

---

## 🚀 Commands

```bash
# Install all
npm run install-all

# Build all
npm run build-all

# Build individual
npm run build:gateway
npm run build:dashboard

# Development
npm run dev:gateway
npm run dev:dashboard

# Production
npm start
```

---

## 📚 Documentation

- **Setup Guides**: See `/packages/localhost-ai-hub/` in the turmux_builder repo
- **Full Setup**: https://github.com/Arnav1771/localhost-ai-hub
- **API Docs**: See endpoints section above

---

## 🔐 Environment Variables

Create `.env` file:
```bash
GATEWAY_PORT=3001
NODE_ENV=development
REACT_APP_API_URL=http://localhost:3001/api
```

---

## ✅ Features

✅ Express API with CORS & Security (Helmet)  
✅ React Dashboard with real-time status updates  
✅ TypeScript throughout for type safety  
✅ Vite for fast builds  
✅ Dual-build Vercel configuration  
✅ WebSocket support  
✅ Logging with Winston  
✅ Production-ready error handling  

---

## 📞 Support

- **Documentation**: See setup guides in repo
- **GitHub**: https://github.com/Arnav1771/localhost-ai-hub
- **Discord**: Use `/help` command

---

**Status**: ✅ Production Ready  
**Created**: April 9, 2026  
**Version**: 1.0.0

---

# ARCHIVED - OLD BUILD - The ultimate all-in-one AI agent orchestration system integrating 25+ open-source AI tools. Complete local "AI Operating System" with orchestration, browser automation, multi-agent teams, knowledge management, and unified dashboard - zero cloud, 100% private.

CORE VISION:
Full-stack AI OS combining: The Brain (Ollama models), The Logic & Glue (n8n/Activepieces automation), The Hands (Skyvern/LaVague browser automation), The Brain Power (CrewAI/AutoGen agents), The Knowledge (AnythingLLM RAG), and The Interface (Open WebUI) - all integrated through unified orchestration hub with real-time monitoring.

🎯 SYSTEM ARCHITECTURE: 6 Layers + 25 Services

═══════════════════════════════════════════════════════════════

LAYER 1: THE BRAIN (Model Runtime)
═══════════════════════════════════════════════════════════════

1. OLLAMA (Primary Model Engine)
   - Local model runtime (Llama 3.3 70B, DeepSeek, Mistral, Phi, etc.)
   - REST API on localhost:11434
   - Auto-download + auto-update model catalog
   - GPU acceleration (CUDA/Metal/ROCm)
   - Vision model support

2. LM STUDIO (Professional Model Manager)
   - Desktop UI for downloading + testing models
   - Advanced quantization options
   - Model benchmarking tools
   - localhost:1234

3. LOCALAI (OpenAI API Compatibility)
   - Drop-in replacement for OpenAI API
   - localhost:8000/v1/chat/completions
   - Image generation + voice support
   - Function calling support
   - Streaming responses

4. VLLM (High-Performance Model Hosting)
   - Multi-GPU model serving
   - Batch processing optimization
   - High throughput inference
   - localhost:8001

═══════════════════════════════════════════════════════════════

LAYER 2: THE HANDS (Browser & Web Automation)
═══════════════════════════════════════════════════════════════

5. SKYVERN (AI Browser Agent)
   - Sees screenshots like a human
   - Autonomous clicking + form filling
   - Multi-step workflows
   - localhost:8882

6. LAVAGUE (DOM-Based Browser Control)
   - English-to-Playwright/Selenium conversion
   - Reads webpage DOM structures
   - Lightweight, model-agnostic
   - localhost:8883

7. STEEL (Stealthy Browser Engine)
   - Anti-bot detection built-in
   - Premium headless browser
   - Cloudflare bypass support
   - localhost:8884

8. OPENMANUS (Local-First Web Agent)
   - Long-running browser tasks
   - Adaptive wait strategies
   - Element detection + clicking
   - localhost:8885

9. AGENT-E (DOM Distillation)
   - Simplifies webpages for smaller models
   - Reduces token count by 90%
   - Optimal for Phi/Mistral models
   - localhost:8886

10. ZEROSTEP (English Browser Automation)
    - Plain English script control
    - Vision-based element detection
    - Cross-platform compatibility
    - localhost:8887

═══════════════════════════════════════════════════════════════

LAYER 3: THE LOGIC & GLUE (Workflow Automation)
═══════════════════════════════════════════════════════════════

11. N8N (Enterprise Automation Standard)
    - Complex multi-step workflows
    - 500+ integrations out-of-box
    - Conditional logic + error handling
    - localhost:5678

12. ACTIVEPIECES (User-Friendly Automation)
    - Open-source Zapier alternative
    - Drag-drop workflow builder
    - No-code triggers + actions
    - localhost:3002

13. HUGINN (Set-It-and-Forget-It Agent)
    - Web monitoring + scraping
    - Automated action triggers
    - Natural language agent definition
    - localhost:3000

14. RELAY (Modern AI-First Automation)
    - Agent-native workflow platform
    - LLM-powered decision making
    - localhost:5000

═══════════════════════════════════════════════════════════════

LAYER 4: THE BRAIN POWER (Multi-Agent Orchestration)
═══════════════════════════════════════════════════════════════

15. CREWAI (Role-Based Agent Teams)
    - Define agent roles + responsibilities
    - Collaborative task execution
    - Memory persistence
    - Tool integration
    - localhost:integrated

16. AUTOGEN (Microsoft Agent Framework)
    - Multi-agent conversation loop
    - Automatic task delegation
    - Self-healing workflows
    - localhost:integrated

17. OPENDEVIN (Autonomous Software Engineer)
    - AI software development agent
    - GitHub integration
    - Terminal + code execution
    - localhost:3879

═══════════════════════════════════════════════════════════════

LAYER 5: THE KNOWLEDGE (Data + RAG Management)
═══════════════════════════════════════════════════════════════

18. ANYTHINGLLM (Knowledge Base Builder)
    - Convert local files/PDFs to RAG
    - Multi-workspace support
    - Embedding model selection
    - localhost:3001

19. FLOWISE (Visual LLM Chain Builder)
    - Drag-drop AI application builder
    - Memory management (short/long-term)
    - Vector DB integration
    - localhost:3000

20. LANGFLOW (Modular RAG Pipelines)
    - Advanced node-based pipeline design
    - Custom component development
    - Granular control over AI logic
    - localhost:3004

21. DIFY (AI Development Platform)
    - Visual workflow + agent builder
    - Integrated knowledge base management
    - Performance monitoring dashboard
    - localhost:5173

22. SUPABASE (Local Postgres + Vectors)
    - Full Postgres database
    - Vector extension for AI memory
    - Real-time subscriptions
    - localhost:5432

═══════════════════════════════════════════════════════════════

LAYER 6: THE INTERFACE (User Dashboard + Chat)
═══════════════════════════════════════════════════════════════

23. OPEN WEBUI (Professional Chat Interface)
    - ChatGPT-like multi-model interface
    - Advanced tools/functions system
    - Document Q&A workspace
    - Model comparison mode
    - Admin oversight dashboard
    - localhost:8080

24. JAN (Minimalist Desktop Client)
    - Cross-platform (Windows/Mac/Linux)
    - Lightweight chat interface
    - Zero-config model loading
    - localhost:1337

25. UNIFIED CONTROL DASHBOARD (Custom Built)
    - Central management for all 25 services
    - Real-time service health + metrics
    - Agent task orchestration controls
    - Unified authentication (JWT)
    - API gateway + load balancing
    - localhost:3173

═══════════════════════════════════════════════════════════════

UNIFIED CONTROL DASHBOARD (Custom Built):
- Dashboard showing status of all 25 services
- Real-time metrics + health checks
- Unified authentication system (JWT)
- Service orchestration controls
- Monitoring + logging aggregation (ELK stack optional)
- API gateway for all services
- Environment variable management
- Docker Compose orchestration
- Auto-restart on failure
- GPU resource allocation

═══════════════════════════════════════════════════════════════

HOW THEY WORK TOGETHER:

"The Complete Loop"
1. User gives command to Open WebUI or Jan
2. Open WebUI sends request to Unified Dashboard
3. Dashboard routes to appropriate service:
   - Knowledge needs → AnythingLLM/Flowise/Langflow
   - Complex logic → N8N/Activepieces/Huginn/Relay  
   - Web tasks → Skyvern/LaVague/Steel/OpenManus/Agent-E
   - Multi-agent → CrewAI/AutoGen teams coordinate
4. Models in Ollama/LocalAI/vLLM process the request
5. Results return through Dashboard
6. User sees unified response in chat

"Browser Automation Example"
1. Agent requests "Scrape weather from weather.com"
2. Skyvern/LaVague/Steel receives task
3. Agent-E simplifies page DOM
4. LaVague controls browser via Playwright
5. Agent-E + Ollama model reads simplified DOM
6. Extracts structured data
7. Sends to N8N for workflow processing
8. Results stored in Supabase
9. AnythingLLM indexes for future queries

"Multi-Agent Orchestration Example"
1. Task: "Write a blog post about AI"
2. CrewAI/AutoGen creates teams:
   - Researcher agent: Uses Huginn to monitor blogs
   - Analyst agent: Processes data from N8N
   - Writer agent: Uses Ollama for writing
   - Editor agent: Reviews and refines
3. Agents communicate, share memory in Supabase
4. Final output posted to Relay/scheduled

═══════════════════════════════════════════════════════════════

CORE FEATURES & WORKFLOWS:

1. AGENT ORCHESTRATION SYSTEM
   - Define 5-10 AI agents with different specializations
   - Each agent has access to: Ollama models, tools, vector DB
   - CrewAI + Dify manage inter-agent communication
   - Collaborative problem solving
   - Output validation + feedback loops

2. INTELLIGENT DOCUMENT PROCESSING
   - AnythingLLM ingests documents (PDFs, websites, local files)
   - Automatic embedding creation (vector DB)
   - Flowise retrieval chains reference embeddings
   - Natural question answering over documents
   - Citation + source tracking

3. WEB INTELLIGENCE GATHERING
   - Lightpanda automates web interactions
   - Click buttons, fill forms, extract data
   - AI vision analyzes screenshots
   - Data feeds into knowledge base
   - Real-time web monitoring

4. WORKFLOW AUTOMATION
   - Activepieces: Trigger workflows (time-based, event-based)
   - Node-RED: System-level automation (file operations, commands)
   - Integration with external APIs
   - Database synchronization (PostgreSQL, MongoDB)
   - Slack/Discord notifications

5. API COMPATIBILITY LAYER
   - LocalAI provides OpenAI-compatible endpoints
   - LocalAI + vLLM handle high-throughput requests
   - Allows ChatGPT plugins to use local models
   - Drop-in replacement for existing applications
   - Function calling like ChatGPT
   - Streaming responses

6. ADVANCED WEB INTELLIGENCE
   - Skyvern + LaVague + Steel: Browser automation
   - Agent-E: Simplifies DOM for smaller models
   - OpenManus: Long-running web tasks
   - Huginn: Autonomous monitoring + triggers
   - Real-time web data into N8N workflows

7. ENTERPRISE WORKFLOW ORCHESTRATION
   - N8N: Complex multi-step automation (500+ integrations)
   - Activepieces: User-friendly no-code workflows
   - Relay: AI-first workflow platform
   - Huginn: Set-it-and-forget-it monitoring
   - Conditional logic + error recovery

8. ADVANCED REASONING & MEMORY
   - Flowise: Complex multi-step LLM chains
   - Langflow: Modular pipeline design
   - Dify: Visual workflow composition
   - Supabase vectors: Persistent AI memory
   - CrewAI/AutoGen: Multi-agent memory sharing

9. DISTRIBUTED MULTI-AGENT COORDINATION
   - CrewAI: Specialized agent teams (Researcher, Writer, etc.)
   - AutoGen: Conversational agent loops
   - OpenDevin: Autonomous software engineer
   - Agent communication via memory + message passing
   - Shared Supabase vector database

10. MONITORING, ANALYTICS & CONTROL
    - Real-time service health dashboard
    - Model inference performance metrics
    - Browser automation success rates
    - Workflow execution logs
    - API usage tracking + quotas
    - Resource allocation (CPU/GPU/RAM)
    - Error tracking + alerting

11. SECURITY & ISOLATION
    - 100% localhost (zero internet exposure by default)
    - Per-workspace isolation (Dify/AnythingLLM/Huginn)
    - API key management + rotation
    - JWT authentication + RBAC
    - Audit logging for compliance
    - SQLite/PostgreSQL local data storage
    - Optional VPN/firewall wrapper

═══════════════════════════════════════════════════════════════

TECH STACK (Updated for 25 Services):

Backend Layer:
- Node.js + Express (unified API gateway)
- Python FastAPI (service orchestration)
- Docker Compose (25-service management)
- PostgreSQL + Supabase (vector-enabled database)
- QDrant (vector database option)
- Redis (caching + job queues)

Model Runtime Services:
- Ollama (primary LLM engine - Llama, DeepSeek, Mistral)
- LM Studio (model management UI)
- LocalAI (OpenAI API compatibility)
- vLLM (high-performance serving)

Browser Automation Services:
- Skyvern (AI browser agent)
- LaVague (DOM-based control)
- Steel (stealthy browser)
- OpenManus (long-running tasks)
- Agent-E (DOM simplification)
- ZeroStep (English automation)

Workflow Automation Services:
- N8N (enterprise standard)
- Activepieces (user-friendly alternative)
- Huginn (monitoring + triggers)
- Relay (AI-first platform)

Multi-Agent Services:
- CrewAI (role-based teams)
- AutoGen (conversational loops)
- OpenDevin (autonomous engineer)

Knowledge Management Services:
- AnythingLLM (RAG builder)
- Flowise (LLM chain builder)
- Langflow (modular pipeline)
- Dify (platform + RAG)
- Supabase (vector database)

User Interface Services:
- Open WebUI (professional chat)
- Jan (minimal desktop client)
- Custom Dashboard (React control panel)

Frontend Architecture:
- React + TypeScript
- WebSocket real-time updates
- Material-UI + Tailwind CSS
- Mobile-responsive design
- Dark mode + accessibility

Infrastructure:
- Docker Compose (orchestration)
- .env file configuration
- Health check endpoints
- Service discovery via internal DNS
- Named volumes for persistence
- GPU resource allocation
- Network isolation layers

═══════════════════════════════════════════════════════════════

PROJECT STRUCTURE:

localhost-ai-hub/
├── docker-compose.yml (Main service orchestration)
├── .env.example (Configuration template)
├── services/ (25 integrated services)
│   ├── models/
│   │   ├── ollama/ (LLM runtime)
│   │   ├── lm-studio/ (Model management)
│   │   ├── localai/ (OpenAI compatibility)
│   │   └── vllm/ (High-performance serving)
│   ├── browser-automation/
│   │   ├── skyvern/ (AI browser agent)
│   │   ├── lavague/ (DOM control)
│   │   ├── steel/ (Stealthy browser)
│   │   ├── openmanus/ (Long-running tasks)
│   │   ├── agent-e/ (DOM simplification)
│   │   └── zerostep/ (English automation)
│   ├── workflow-automation/
│   │   ├── n8n/ (Enterprise standard)
│   │   ├── activepieces/ (User-friendly)
│   │   ├── huginn/ (Monitoring)
│   │   └── relay/ (AI-first)
│   ├── agents/
│   │   ├── crewai/ (Role-based teams)
│   │   ├── autogen/ (Conversational loops)
│   │   └── opendevin/ (Autonomous engineer)
│   ├── knowledge/
│   │   ├── anythingllm/ (RAG builder)
│   │   ├── flowise/ (LLM chains)
│   │   ├── langflow/ (Modular pipelines)
│   │   ├── dify/ (Platform)
│   │   └── supabase/ (Vector database)
│   ├── interface/
│   │   ├── open-webui/ (Professional chat)
│   │   └── jan/ (Minimal client)
│   └── orchestration/
│       └── unified-dashboard/ (Control panel)
│
├── gateway/
│   ├── server.ts (API gateway + orchestration)
│   ├── routes/
│   │   ├── services.ts (service management)
│   │   ├── agents.ts (agent configuration)
│   │   ├── workflows.ts (workflow execution)
│   │   ├── documents.ts (knowledge base)
│   │   ├── monitoring.ts (health + metrics)
│   │   └── auth.ts (authentication)
│   ├── middleware/
│   │   ├── auth.ts
│   │   ├── logging.ts
│   │   └── error-handling.ts
│   ├── controllers/
│   │   ├── service-controller.ts
│   │   ├── agent-controller.ts
│   │   ├── workflow-controller.ts
│   │   └── monitoring-controller.ts
│   ├── services/
│   │   ├── ollama-client.ts
│   │   ├── dify-client.ts
│   │   ├── docker-manager.ts
│   │   └── health-checker.ts
│   ├── websocket/
│   │   └── realtime-events.ts
│   ├── config/
│   │   ├── service-config.ts
│   │   └── model-config.ts
│   └── db/
│       └── schema.sql
│
├── dashboard/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ServiceStatus.tsx
│   │   │   ├── AgentManager.tsx
│   │   │   ├── WorkflowBuilder.tsx
│   │   │   ├── MonitoringPanel.tsx
│   │   │   └── SettingsPanel.tsx
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Services.tsx
│   │   │   ├── Agents.tsx
│   │   │   ├── Workflows.tsx
│   │   │   └── Admin.tsx
│   │   ├── hooks/
│   │   │   ├── useServices.ts
│   │   │   ├── useWebSocket.ts
│   │   │   └── useMetrics.ts
│   │   ├── App.tsx
│   │   └── index.css
│   ├── package.json
│   └── Dockerfile
│
├── config/
│   ├── agent-definitions.js (Agent roles + capabilities)
│   ├── model-config.js (Model selection per service)
│   ├── api-mappings.js (Service endpoint mapping)
│   ├── workflow-templates.js (Pre-built workflows)
│   └── security-rules.js (Access control)
│
├── scripts/
│   ├── init.sh (First-time setup)
│   ├── start.sh (Start all services)
│   ├── stop.sh (Graceful shutdown)
│   ├── cleanup.sh (Remove volumes + data)
│   ├── health-check.sh (Verify all services)
│   ├── download-models.sh (Pre-cache LLMs)
│   └── logs.sh (Centralized logging)
│
├── docs/
│   ├── SETUP.md (Installation guide)
│   ├── ARCHITECTURE.md (System design)
│   ├── QUICK_START.md (5-minute demo)
│   ├── API_REFERENCE.md (All endpoints)
│   ├── WORKFLOWS.md (Pre-built templates)
│   ├── AGENTS.md (Agent definitions)
│   ├── TROUBLESHOOTING.md (Common issues)
│   └── DEPLOYMENT.md (Production guide)
│
├── examples/
│   ├── 01-simple-chat.ts (Ollama + Open WebUI)
│   ├── 02-research-agent.ts (CrewAI + AutoGen team)
│   ├── 03-document-qa.ts (AnythingLLM + Flowise)
│   ├── 04-web-scraping.ts (Skyvern + LaVague automation)
│   ├── 05-workflow-automation.ts (N8N + Activepieces)
│   ├── 06-multi-agent-orchestra.ts (Full 25-service system)
│   ├── 07-browser-agent.ts (OpenManus + Steel + Agent-E)
│   ├── 08-monitoring-agent.ts (Huginn + CrewAI)
│   └── 09-enterprise-workflow.ts (N8N + Relay + CrewAI)
│
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── requirements.txt
├── package.json
└── README.md

═══════════════════════════════════════════════════════════════

DEPLOYMENT ARCHITECTURE:

Local Development:
- docker-compose.yml with all 12 services
- Volume mounts for data persistence
- Environment-based configuration
- Local network (localhost)

Production (Optional Cloud):
- Docker Swarm or Kubernetes
- Cloud storage for models
- Multi-replica services
- Load balancing
- TLS certificates
- Rate limiting + auth

═══════════════════════════════════════════════════════════════

API ENDPOINTS (Gateway):

Service Management:
- GET  /api/services           → List all services + status
- POST /api/services/{id}/restart → Restart service
- GET  /api/health             → System health check
- GET  /api/metrics            → Performance metrics

Agent Management:
- GET  /api/agents             → List configured agents
- POST /api/agents             → Create new agent
- POST /api/agents/{id}/task   → Assign task to agent
- GET  /api/agents/{id}/status → Agent status + memory

Workflow Execution:
- POST /api/workflows/execute  → Run workflow
- GET  /api/workflows/{id}     → Workflow status
- GET  /api/workflows/history  → Execution history
- WEBSOCKET /ws/workflows/{id} → Real-time updates

OpenAI Compatibility (via LocalAI):
- POST /v1/chat/completions    → Chat completions
- POST /v1/completions         → Text completions
- GET  /v1/models              → Available models

═══════════════════════════════════════════════════════════════

KEY DIFFERENTIATORS:

1. COMPLETE SYSTEM
   - Not just a chat interface - full orchestration platform
   - All tools integrated under single dashboard
   - No internet required (100% localhost)

2. MULTI-AGENT ORCHESTRATION
   - CrewAI teamwork for complex reasoning
   - Dify workflows for visual designs
   - Collaborative problem-solving

3. ADVANCED KNOWLEDGE MANAGEMENT
   - AnythingLLM: Document ingestion
   - Vector DB: Semantic search
   - Retrieval chains: Context-aware responses

4. BROWSER INTELLIGENCE
   - Skyvern + LaVague: Automated web interactions
   - Steel: Stealth browsing
   - OpenManus: Long-running tasks
   - Agent-E: Page simplification
   - Real-time web data gathering
   - AI vision + DOM analysis

5. ENTERPRISE AUTOMATION & INTEGRATION
   - N8N: 500+ integrations
   - Activepieces: User-friendly workflows
   - Relay: AI-native automation
   - Huginn: Autonomous monitoring
   - External API + database connections

6. MULTI-AGENT COORDINATION
   - CrewAI teams with specialized roles
   - AutoGen conversational loops
   - OpenDevin autonomous engineer
   - Shared vector memory (Supabase)
   - Agent-to-agent messaging

7. DEVELOPMENT FRIENDLY
   - OpenAI compatibility (LocalAI + vLLM)
   - Extensive API documentation (50+ endpoints)
   - Pre-built examples (9+ workflows)
   - Docker-based (works everywhere)
   - WebSocket real-time support

═══════════════════════════════════════════════════════════════

QUICK START (3 Steps):

1. Install Docker + Docker Compose
2. Clone repo + run: docker-compose up
3. Open http://localhost:3173 (dashboard)

All 25 services start automatically. Models auto-download. Ready in ~2 minutes.

═══════════════════════════════════════════════════════════════

MONITORING & OBSERVABILITY:

- Real-time service health dashboard
- Model inference latency tracking
- Agent task execution metrics
- API usage analytics
- Error rate monitoring
- Vector DB query performance
- GPU/CPU/Memory utilization graphs
- Centralized logging (ELK stack optional)
- Alert system for failures

═══════════════════════════════════════════════════════════════

SECURITY FEATURES:

- JWT authentication
- Role-based access control (RBAC)
- API key management
- Rate limiting per endpoint
- Input validation + sanitization
- SQL injection prevention
- CORS configuration
- Audit logging
- Data encryption at rest
- Isolated containers + networks

## 🎯 Project Highlights

| Feature | Details |
|---------|---------|
| **Services** | 25 integrated open-source tools |
| **Models** | Ollama + LM Studio + LocalAI + vLLM (Llama, DeepSeek, Mistral, Phi) |
| **Browser Agents** | 6 automation frameworks (Skyvern, LaVague, Steel, OpenManus, Agent-E, ZeroStep) |
| **Automation** | N8N + Activepieces + Huginn + Relay |
| **Multi-Agents** | CrewAI + AutoGen + OpenDevin teams |
| **Knowledge** | AnythingLLM + Flowise + Langflow + Dify + Supabase vectors |
| **Interface** | Open WebUI + Jan + Unified dashboard |
| **Deployment** | Docker Compose (docker-compose up) |
| **Setup Time** | ~2 minutes total |
| **Data** | 100% local + private (no cloud required) |

## 💡 Why Build This?

1. **Complete AI Environment** - Everything needed for serious AI development
2. **No API Costs** - All models run locally (free)
3. **Maximum Privacy** - All data stays on your machine
4. **Developer Friendly** - Extensive documentation + examples
5. **Production Ready** - Can be deployed to servers/cloud
6. **Educational** - Learn how AI orchestration works
7. **Customizable** - Extend with custom agents + tools
8. **Scalable** - Runs on laptops or enterprise servers

## 🚀 Next Steps

After building:
1. Test with example workflows
2. Create custom agents
3. Integrate external APIs
4. Deploy to production
5. Extend with plugins

---

**Build Time:** 5-7 days | **Difficulty:** ⚠️ Advanced | **Team Size:** 2-3 devs