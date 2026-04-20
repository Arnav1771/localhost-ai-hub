# 🤖 localhost-ai-hub

> **The Local AI Operating System** — 25+ open-source AI tools, 6 architectural layers, unified control dashboard. Zero cloud. 100% private. 100% yours.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-61dafb)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38bdf8)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green)](LICENSE)

---

## 🎯 Core Vision

**A full-stack AI OS combining six specialised layers:**

| Layer | Name | Role |
|-------|------|------|
| 🧠 | **The Brain** | Local model runtime (Ollama, LocalAI, LM Studio) |
| ⚙️ | **The Logic & Glue** | Workflow automation (n8n, Activepieces, Windmill) |
| 🤝 | **The Hands** | Browser automation (Skyvern, LaVague) |
| ⚡ | **The Brain Power** | Multi-agent frameworks (CrewAI, AutoGen, SuperAGI) |
| 📚 | **The Knowledge** | RAG & vector storage (AnythingLLM, Chroma, Qdrant) |
| 🖥️ | **The Interface** | User-facing UIs (Open WebUI, Flowise, LiteLLM) |

All integrated through a **unified control dashboard** with real-time monitoring, service catalog, and health checks.

---

## 🚀 Quick Start

```bash
# 1. Clone
git clone https://github.com/Arnav1771/localhost-ai-hub.git
cd localhost-ai-hub

# 2. Install dependencies
npm run install-all

# 3. Start the Gateway (port 3001) + Dashboard (port 3000)
npm run dev:gateway  # Terminal 1
npm run dev:dashboard  # Terminal 2
```

**Visit the dashboard**: http://localhost:3000

---

## 📊 System Architecture: 6 Layers + 25 Services

### 🧠 LAYER 1: THE BRAIN (Model Runtime)

| Service | Port | Description |
|---------|------|-------------|
| **Ollama** | 11434 | Primary LLM engine — Llama 3, DeepSeek, Mistral, Phi, etc. GPU-accelerated with auto-download. |
| **LocalAI** | 8080 | Drop-in OpenAI API replacement. Supports LLaMA, GPT-J, Whisper, Stable Diffusion, function calling. |
| **LM Studio** | 1234 | Desktop UI for downloading, testing, and serving local models with built-in OpenAI-compatible server. |
| **GPT4All** | 4891 | Run powerful local AI models on any CPU. Chat with docs entirely offline. |

### ⚙️ LAYER 2: THE LOGIC & GLUE (Workflow Automation)

| Service | Port | Description |
|---------|------|-------------|
| **n8n** | 5678 | Enterprise automation standard — 400+ integrations, AI nodes, visual builder, self-hostable. |
| **Activepieces** | 8000 | Open-source Zapier alternative with a gorgeous UI. Build automations without code. |
| **Windmill** | 8001 | Turn scripts into workflows, APIs, and UIs. Supports Python, TypeScript, Bash, Go. |

### 🤝 LAYER 3: THE HANDS (Browser & Web Automation)

| Service | Port | Description |
|---------|------|-------------|
| **Skyvern** | 8080 | AI-powered browser automation using vision + LLMs. No brittle selectors — reads pages like a human. |
| **LaVague** | 7860 | Large Action Model framework. Describe your goal in plain English; LaVague handles browser actions. |
| **Playwright UI** | 9323 | Microsoft Playwright test runner with visual trace viewer. Record, replay, debug browser sessions. |

### ⚡ LAYER 4: THE BRAIN POWER (Multi-Agent Frameworks)

| Service | Port | Description |
|---------|------|-------------|
| **CrewAI** | 8100 | Role-playing autonomous AI agents. Researcher + writer + critic crews tackle complex tasks. |
| **AutoGen Studio** | 8081 | Microsoft's multi-agent framework with visual Studio UI. Build and debug agent pipelines visually. |
| **SuperAGI** | 3000 | Infrastructure for autonomous AI agents with tools, memory, and performance telemetry. |
| **OpenHands** | 3001 | Autonomous software development agent. Writes code, runs tests, browses docs, and ships. |

### 📚 LAYER 5: THE KNOWLEDGE (RAG & Vector Storage)

| Service | Port | Description |
|---------|------|-------------|
| **AnythingLLM** | 3010 | All-in-one private AI assistant for documents. Ingest PDFs, URLs; chat with total privacy. |
| **Chroma** | 8200 | AI-native open-source embedding database. Fast similarity search, built-in embedding functions. |
| **Qdrant** | 6333 | High-performance vector similarity search written in Rust. Handles billions of vectors. |
| **Weaviate** | 8300 | Cloud-native vector database with built-in ML models, semantic search, and GraphQL. |
| **Mem0** | 8400 | Persistent memory layer for AI applications. Remembers preferences and context across sessions. |

### 🖥️ LAYER 6: THE INTERFACE (User-Facing UIs)

| Service | Port | Description |
|---------|------|-------------|
| **Open WebUI** | 8501 | Best open-source ChatGPT-style UI for local models. RAG, web search, plugins, user management. |
| **Flowise** | 3100 | Drag-and-drop UI for LLM apps. Build LangChain flows and agents without writing code. |
| **LiteLLM** | 4000 | Unified API gateway for 100+ LLMs. One OpenAI-compatible endpoint with load balancing + fallbacks. |
| **Text Gen WebUI** | 7861 | The OG gradio UI (oobabooga). Extension ecosystem, fine-tuning support, notebook mode. |
| **AI Gateway** | 3001 | This hub's own Express gateway. Unified health checks, service proxying, REST API. |

---

## 🔄 How They Work Together

### "The Complete Loop"
```
User → Open WebUI → AI Gateway → Route to:
  ├── AnythingLLM / Chroma (knowledge needs)
  ├── n8n / Activepieces (automation logic)
  ├── Skyvern / LaVague (web tasks)
  └── CrewAI / AutoGen (multi-agent)
       ↓
   Ollama / LocalAI (model inference)
       ↓
   Results → User
```

### "Multi-Agent Example"
```
Task: "Research and write a blog post about AI"
  ↓
CrewAI creates a crew:
  ├── Researcher Agent → uses Skyvern to gather web data
  ├── Analyst Agent → processes via n8n workflow
  ├── Writer Agent → drafts with Ollama (Llama 3)
  └── Editor Agent → reviews with AutoGen feedback loop
       ↓
   Final output → stored in AnythingLLM workspace
```

---

## 📦 Project Structure

```
localhost-ai-hub/
├── package.json                    (Root workspace manager)
├── tsconfig.json                   (Root TypeScript config)
├── docker-compose.yml              (Service orchestration)
├── .env.example                    (Configuration template)
│
├── gateway/                        (Express API Gateway — port 3001)
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       └── server.ts               (Express app + service proxying)
│
├── dashboard/                      (React Control Dashboard — port 3000)
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.ts
│   └── src/
│       ├── App.tsx                 (Root layout + navigation)
│       ├── types/index.ts          (Service, Layer TypeScript types)
│       ├── data/
│       │   ├── services.ts         (25 services seed data — edit here)
│       │   └── layers.ts           (6 layer definitions + descriptions)
│       ├── store/
│       │   └── settings.ts         (Zustand persisted settings)
│       ├── components/
│       │   ├── ServiceCard.tsx     (Service card with actions)
│       │   ├── StatusBadge.tsx     (Online/Offline/CORS badge)
│       │   └── ServiceDetailDrawer.tsx
│       ├── pages/
│       │   ├── DashboardPage.tsx   (Overview + pinned services)
│       │   ├── ServicesPage.tsx    (Search/filter service catalog)
│       │   ├── LayersPage.tsx      (Grouped by layer accordion)
│       │   ├── SetupPage.tsx       (Checklist setup guide)
│       │   └── SettingsPage.tsx    (Config + health check diagnostics)
│       └── utils/
│           └── healthCheck.ts      (Browser-based HTTP health probing)
│
└── docs/
    ├── ARCHITECTURE.md
    └── SETUP.md
```

---

## 🛠️ Dashboard Features

### 1. Dashboard (`/`)
- Stats cards: total services, online count, offline count
- Architecture layer overview with per-layer online/total counts
- Pinned services quick-access grid (customisable)
- Full service grid with status badges

### 2. Services Catalog
- Grid view of all 25 services
- Search by name, description, or tags
- Filter by layer (Brain, Logic, Hands, etc.)
- Service cards with: Open, Copy URL, Docs actions
- Per-service status badges (Online / Offline / CORS / Unknown)

### 3. Layers View
- Accordion sections grouped by the 6 architectural layers
- Expandable layer headers with service count
- Full service cards per layer
- Colour-coded by layer

### 4. Setup Guide
- Interactive checklist with progress tracking
- Prerequisite verification (Docker, Node, Git, hardware)
- Copy-to-clipboard commands for every step
- Persistent checkmark state (localStorage)

### 5. Settings
- Base host override (default: `localhost`)
- Toggle background health checks on/off
- Health check interval slider (10s – 5 min)
- Per-service port override
- Diagnostics: ping individual services or all at once
- Reset all settings to defaults

---

## 🔌 API Endpoints (Gateway)

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/health` | GET | Gateway health check |
| `/api` | GET | API info |
| `/api/status` | GET | Gateway status |
| `/api/services` | GET | Live service status list |

---

## 📦 Tech Stack

| Component | Tech |
|-----------|------|
| API Gateway | Node.js + Express + TypeScript |
| Dashboard | React 18 + Vite + TypeScript |
| Styling | Tailwind CSS 3 (dark mode first) |
| State | Zustand (persisted to localStorage) |
| Service Orchestration | Docker Compose |

---

## 🔐 Environment Variables

```bash
# Copy and edit
cp .env.example .env
```

```env
GATEWAY_PORT=3001
NODE_ENV=development
```

---

## 🚀 Commands

```bash
# Install all dependencies (root workspace)
npm run install-all

# Development
npm run dev:gateway     # Gateway on :3001
npm run dev:dashboard   # Dashboard on :3000

# Production build
npm run build-all
npm run build:gateway
npm run build:dashboard

# Start production gateway
npm start
```

---

## ✏️ Customising Services

Edit `dashboard/src/data/services.ts` to add, remove, or modify services:

```ts
{
  id: 'my-service',
  name: 'My Service',
  layer: 'brain',             // brain | logic | hands | brainpower | knowledge | interface
  tags: ['llm', 'local'],
  description: 'Short description shown on the card.',
  localUrl: 'http://localhost:9999',
  port: 9999,
  icon: '🔥',
  startHint: 'docker compose up my-service',
  healthCheck: { type: 'http', path: '/health' },
}
```

Per-service port overrides are also available in the **Settings** page (no code changes needed).

---

## ⚠️ Health Check Limitations

Browser-based health checks have inherent limitations:

- **HTTP checks**: Fetch the configured path from the browser. If the service has no CORS headers, the browser will block the request. The dashboard will show `CORS blocked` rather than `down`.
- **TCP checks**: Cannot be done from a browser context. Services configured with `type: 'tcp'` will always show `Unknown`.
- **Recommendation**: For accurate health monitoring, run the API gateway which can perform server-side checks.

---

## 📞 Support

- **GitHub**: https://github.com/Arnav1771/localhost-ai-hub
- **Setup Guide**: Open the dashboard → Setup tab
- **Docs**: `/docs/ARCHITECTURE.md` and `/docs/SETUP.md`

---

**Version**: 2.0.0 — Local AI OS Dashboard  
**License**: MIT
