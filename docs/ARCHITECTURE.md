# Architecture: Local AI Operating System

## Overview

localhost-ai-hub is a **unified control dashboard and orchestration hub** for a collection of self-hosted AI services. It is not one tool — it is the integration layer that makes 25+ local AI tools work together under one roof.

```
┌─────────────────────────────────────────────────────────────────┐
│                   Unified Control Dashboard                      │
│              (React + TypeScript — localhost:3000)               │
└───────────────────────────┬─────────────────────────────────────┘
                            │ REST API
┌───────────────────────────▼─────────────────────────────────────┐
│                   Express API Gateway                            │
│              (Node.js + TypeScript — localhost:3001)             │
└─┬──────┬──────┬──────┬──────┬──────────────────────────────────┘
  │      │      │      │      │
  ▼      ▼      ▼      ▼      ▼
[Brain] [Logic] [Hands] [BrainPower] [Knowledge] [Interface]
```

---

## 6 Architectural Layers

### 🧠 Layer 1: The Brain (Model Runtime)
The engine room. Every other layer calls into this one for inference.

- **Ollama** (`:11434`) — primary LLM engine; Llama 3, Mistral, DeepSeek, etc.
- **LocalAI** (`:8080`) — OpenAI-compatible API drop-in
- **LM Studio** (`:1234`) — desktop model management + local server
- **GPT4All** (`:4891`) — CPU-first local AI models

### ⚙️ Layer 2: The Logic & Glue (Automation)
The connective tissue of the stack. Wires all services together.

- **n8n** (`:5678`) — enterprise automation; 400+ integrations
- **Activepieces** (`:8000`) — open-source Zapier alternative
- **Windmill** (`:8001`) — scripts-to-workflows platform

### 🤝 Layer 3: The Hands (Browser Automation)
Your AI agents take the wheel and operate the web.

- **Skyvern** (`:8080`) — vision + LLM-powered browser automation
- **LaVague** (`:7860`) — Large Action Model for web agents
- **Playwright UI** (`:9323`) — test runner + trace viewer

### ⚡ Layer 4: The Brain Power (Multi-Agent)
Teams of autonomous AI agents working in parallel.

- **CrewAI** (`:8100`) — role-based agent crews
- **AutoGen Studio** (`:8081`) — Microsoft multi-agent framework
- **SuperAGI** (`:3000`) — autonomous AI agent infrastructure
- **OpenHands** (`:3001`) — autonomous software development agent

### 📚 Layer 5: The Knowledge (RAG & Vectors)
Your private second brain — all your data, queryable by AI.

- **AnythingLLM** (`:3010`) — all-in-one RAG for documents
- **Chroma** (`:8200`) — AI-native vector database
- **Qdrant** (`:6333`) — high-performance vector search (Rust)
- **Weaviate** (`:8300`) — cloud-native vector DB + GraphQL
- **Mem0** (`:8400`) — persistent memory layer for agents

### 🖥️ Layer 6: The Interface (User-Facing UIs)
The polished face of the operation.

- **Open WebUI** (`:8501`) — ChatGPT-style UI for local models
- **Flowise** (`:3100`) — drag-and-drop LLM app builder
- **LiteLLM** (`:4000`) — unified API proxy for 100+ LLMs
- **Text Gen WebUI** (`:7861`) — oobabooga Gradio interface
- **AI Gateway** (`:3001`) — this hub's own Express API gateway

---

## Dashboard Architecture

```
dashboard/src/
├── types/index.ts          # Service, Layer, ServiceStatus types
├── data/
│   ├── services.ts         # 25 services configuration (edit here)
│   └── layers.ts           # 6 layer definitions + descriptions
├── store/
│   └── settings.ts         # Zustand persisted settings
├── components/
│   ├── ServiceCard.tsx      # Reusable service card UI
│   ├── StatusBadge.tsx      # Online/Offline/CORS/Unknown badge
│   └── ServiceDetailDrawer.tsx
├── pages/
│   ├── DashboardPage.tsx    # Overview + stats + pinned services
│   ├── ServicesPage.tsx     # Search/filter service catalog
│   ├── LayersPage.tsx       # Accordion grouped by layer
│   ├── SetupPage.tsx        # Interactive checklist setup guide
│   └── SettingsPage.tsx     # Config + diagnostics
└── utils/
    └── healthCheck.ts       # Browser-based HTTP health probing
```

### State Management
All persistent state is stored in **localStorage** via Zustand's `persist` middleware under the key `ai-hub-settings`. This includes:
- Theme preference
- Base host override
- Health check settings
- Per-service port overrides
- Pinned services list
- Cached service statuses

### Health Checks
Health checks are performed browser-side via `fetch()`. Limitations:
- CORS restrictions may prevent fetching from services without CORS headers → shown as `cors-blocked`
- TCP checks cannot be performed in browser → shown as `unknown`
- All check failures are handled gracefully (no crashes)

---

## Data Flow: Request Lifecycle

```
1. User opens dashboard at localhost:3000
2. DashboardPage mounts → triggers health checks for all services
3. Each service status is stored in Zustand (persisted localStorage)
4. Status badges update reactively across all components
5. User clicks "Open ↗" → window.open(service.localUrl)
6. User configures settings → saved to localStorage immediately
```

---

## Adding a New Service

Edit `dashboard/src/data/services.ts`:

```typescript
{
  id: 'unique-id',
  name: 'Display Name',
  layer: 'brain',    // one of the 6 layer IDs
  tags: ['tag1', 'tag2'],
  description: '1–2 line description shown on the card.',
  localUrl: 'http://localhost:PORT',
  port: PORT,
  docsUrl: 'https://...',        // optional
  githubUrl: 'https://...',      // optional
  icon: '🔥',                    // emoji
  startHint: 'docker compose up service-name',
  healthCheck: {
    type: 'http',                // http | tcp | none
    path: '/health',             // for http type
  },
}
```

---

## Docker Compose

Services are orchestrated via `docker-compose.yml` in the repo root. Each service is defined with:
- Named volumes for data persistence
- Network isolation
- Health check commands
- Environment variable injection from `.env`

Start individual services:
```bash
docker compose up ollama -d
docker compose up n8n -d
docker compose up open-webui -d
```

Start everything:
```bash
docker compose up -d
```
