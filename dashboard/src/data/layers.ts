import { Layer } from '../types';

export const LAYERS: Layer[] = [
  {
    id: 'brain',
    name: 'The Brain',
    emoji: '🧠',
    tagline: 'Model Runtime',
    description:
      'The engine room. Local LLMs served at warp speed — Ollama, LocalAI, and LM Studio give you GPT‑4-class intelligence with zero cloud dependency. Every other layer calls into this one.',
    color: 'violet',
    accentBg: 'bg-violet-900/30',
    accentBorder: 'border-violet-500/40',
    accentText: 'text-violet-400',
  },
  {
    id: 'logic',
    name: 'The Logic & Glue',
    emoji: '⚙️',
    tagline: 'Automation & Orchestration',
    description:
      'The connective tissue of the stack. n8n and Activepieces wire every service together with visual workflows — no duct tape required. Build automation that would take weeks in minutes.',
    color: 'amber',
    accentBg: 'bg-amber-900/30',
    accentBorder: 'border-amber-500/40',
    accentText: 'text-amber-400',
  },
  {
    id: 'hands',
    name: 'The Hands',
    emoji: '🤝',
    tagline: 'Browser & Web Automation',
    description:
      'Your AI agents take the wheel. Skyvern and LaVague drive real browsers to fill forms, scrape data, click buttons, and do anything a human can do on the web — autonomously.',
    color: 'emerald',
    accentBg: 'bg-emerald-900/30',
    accentBorder: 'border-emerald-500/40',
    accentText: 'text-emerald-400',
  },
  {
    id: 'brainpower',
    name: 'The Brain Power',
    emoji: '⚡',
    tagline: 'Multi-Agent Frameworks',
    description:
      'Teams of autonomous AI agents working in parallel. CrewAI, AutoGen, and SuperAGI coordinate specialist agents — researcher, coder, critic — to tackle complex multi-step problems nobody thought a local machine could handle.',
    color: 'rose',
    accentBg: 'bg-rose-900/30',
    accentBorder: 'border-rose-500/40',
    accentText: 'text-rose-400',
  },
  {
    id: 'knowledge',
    name: 'The Knowledge',
    emoji: '📚',
    tagline: 'RAG & Vector Storage',
    description:
      'Your private second brain. AnythingLLM ingests your PDFs, wikis, and notes; Chroma and Qdrant store the embeddings. Ask anything about your own data — with total privacy.',
    color: 'cyan',
    accentBg: 'bg-cyan-900/30',
    accentBorder: 'border-cyan-500/40',
    accentText: 'text-cyan-400',
  },
  {
    id: 'interface',
    name: 'The Interface',
    emoji: '🖥️',
    tagline: 'User-Facing UIs',
    description:
      'The face of the operation. Open WebUI delivers a polished ChatGPT-style frontend, Flowise gives you a drag-and-drop agent builder, and LiteLLM normalises every model behind a single OpenAI-compatible API.',
    color: 'sky',
    accentBg: 'bg-sky-900/30',
    accentBorder: 'border-sky-500/40',
    accentText: 'text-sky-400',
  },
];

export const LAYER_MAP: Record<string, Layer> = Object.fromEntries(
  LAYERS.map((l) => [l.id, l])
);
