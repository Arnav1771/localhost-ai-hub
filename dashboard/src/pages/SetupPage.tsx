import React from 'react';

interface CheckItem {
  id: string;
  label: string;
  description: string;
  command?: string;
  link?: string;
}

interface SetupSection {
  title: string;
  emoji: string;
  items: CheckItem[];
}

const SETUP_SECTIONS: SetupSection[] = [
  {
    title: 'Prerequisites',
    emoji: '⚙️',
    items: [
      {
        id: 'docker',
        label: 'Install Docker Desktop',
        description: 'Required to run almost all services via docker compose. Get Docker Desktop for Mac/Windows or Docker Engine for Linux.',
        link: 'https://docs.docker.com/get-docker/',
      },
      {
        id: 'docker-compose',
        label: 'Docker Compose v2',
        description: 'Bundled with Docker Desktop. For Linux run: sudo apt install docker-compose-plugin',
        command: 'docker compose version',
      },
      {
        id: 'node',
        label: 'Node.js 18+',
        description: 'Required for this dashboard and the API gateway.',
        command: 'node --version',
        link: 'https://nodejs.org',
      },
      {
        id: 'git',
        label: 'Git',
        description: 'Required to clone this repository and pull service configs.',
        command: 'git --version',
      },
    ],
  },
  {
    title: 'Hardware Requirements',
    emoji: '💻',
    items: [
      {
        id: 'ram',
        label: '16 GB RAM minimum (32 GB recommended)',
        description: 'Each local LLM can use 4–16 GB RAM depending on model size. More RAM = more models in memory.',
      },
      {
        id: 'storage',
        label: '100 GB free disk space',
        description: 'Models range from 2 GB (small) to 70 GB (70B models). Docker images add another 10–20 GB.',
      },
      {
        id: 'gpu',
        label: 'GPU (optional but recommended)',
        description: 'NVIDIA GPU with CUDA 12 speeds up inference 5–50x. CPU-only works for small models (≤ 7B parameters).',
        link: 'https://developer.nvidia.com/cuda-downloads',
      },
    ],
  },
  {
    title: 'Clone & Configure',
    emoji: '📦',
    items: [
      {
        id: 'clone',
        label: 'Clone this repository',
        description: 'Get the repo locally with all docker-compose configs included.',
        command: 'git clone https://github.com/Arnav1771/localhost-ai-hub.git && cd localhost-ai-hub',
      },
      {
        id: 'env',
        label: 'Copy environment variables',
        description: 'Copy .env.example to .env and fill in any required secrets (API keys for optional cloud fallbacks, etc.).',
        command: 'cp .env.example .env',
      },
      {
        id: 'install',
        label: 'Install Node dependencies',
        description: 'Install dashboard and gateway dependencies.',
        command: 'npm run install-all',
      },
    ],
  },
  {
    title: 'Start Core Services',
    emoji: '🚀',
    items: [
      {
        id: 'ollama',
        label: 'Start Ollama (The Brain)',
        description: 'Install Ollama and pull a model. Llama 3.2 is a good starting point.',
        command: 'ollama serve  # then: ollama pull llama3.2',
        link: 'https://ollama.com',
      },
      {
        id: 'openwebui',
        label: 'Start Open WebUI (The Interface)',
        description: 'Chat UI that connects to Ollama. Runs on port 8501.',
        command: 'docker compose up open-webui -d',
      },
      {
        id: 'anythingllm',
        label: 'Start AnythingLLM (The Knowledge)',
        description: 'RAG assistant for your documents. Runs on port 3010.',
        command: 'docker compose up anythingllm -d',
      },
      {
        id: 'n8n',
        label: 'Start n8n (The Logic & Glue)',
        description: 'Workflow automation. Runs on port 5678.',
        command: 'docker compose up n8n -d',
      },
      {
        id: 'gateway',
        label: 'Start the API Gateway + Dashboard',
        description: 'The hub\'s own Express API and this React dashboard.',
        command: 'npm run dev:gateway  # port 3001\nnpm run dev:dashboard # port 3000',
      },
    ],
  },
  {
    title: 'Verification',
    emoji: '✅',
    items: [
      {
        id: 'verify-dashboard',
        label: 'Open this dashboard',
        description: 'Visit http://localhost:3000 — you should see this page.',
        link: 'http://localhost:3000',
      },
      {
        id: 'verify-ollama',
        label: 'Verify Ollama is running',
        description: 'You should see a JSON response with model info.',
        command: 'curl http://localhost:11434/api/version',
      },
      {
        id: 'verify-health',
        label: 'Run health checks',
        description: 'In Settings, enable health checks. Service status pills will update on the Dashboard.',
        link: 'http://localhost:3000',
      },
    ],
  },
];

const SetupPage: React.FC = () => {
  const [checked, setChecked] = React.useState<Record<string, boolean>>({});
  const [copied, setCopied] = React.useState<string | null>(null);

  const toggle = (id: string) => setChecked((prev) => ({ ...prev, [id]: !prev[id] }));

  const copy = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(id);
      setTimeout(() => setCopied(null), 1800);
    });
  };

  const totalItems = SETUP_SECTIONS.flatMap((s) => s.items).length;
  const checkedCount = Object.values(checked).filter(Boolean).length;
  const progress = Math.round((checkedCount / totalItems) * 100);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-zinc-100">Setup Guide</h1>
        <p className="text-zinc-400 text-sm mt-1">
          Everything you need to get your Local AI OS running from scratch.
        </p>
      </div>

      {/* Progress */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-zinc-300">Setup Progress</span>
          <span className="text-sm font-bold text-brand-400">{checkedCount}/{totalItems} steps completed</span>
        </div>
        <div className="w-full bg-zinc-800 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-brand-600 to-brand-400 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        {progress === 100 && (
          <p className="text-emerald-400 text-sm mt-2 font-medium">🎉 All steps complete! Your AI OS is ready.</p>
        )}
      </div>

      {/* Sections */}
      <div className="space-y-6">
        {SETUP_SECTIONS.map((section) => (
          <div key={section.title} className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-zinc-800">
              <h2 className="text-base font-bold text-zinc-200">
                {section.emoji} {section.title}
              </h2>
            </div>
            <div className="divide-y divide-zinc-800/60">
              {section.items.map((item) => (
                <div
                  key={item.id}
                  className={`px-5 py-4 flex gap-4 transition-colors ${checked[item.id] ? 'bg-emerald-950/20' : ''}`}
                >
                  <button
                    onClick={() => toggle(item.id)}
                    className={`w-5 h-5 rounded border-2 shrink-0 mt-0.5 transition-colors flex items-center justify-center
                      ${checked[item.id]
                        ? 'bg-emerald-500 border-emerald-500 text-white'
                        : 'border-zinc-600 hover:border-zinc-400'
                      }`}
                  >
                    {checked[item.id] && <span className="text-xs">✓</span>}
                  </button>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${checked[item.id] ? 'text-zinc-500 line-through' : 'text-zinc-200'}`}>
                      {item.label}
                    </p>
                    <p className="text-zinc-500 text-xs mt-0.5 leading-relaxed">{item.description}</p>
                    {item.command && (
                      <div className="relative mt-2 bg-zinc-950 rounded-lg px-3 py-2 border border-zinc-800 group">
                        <pre className="font-mono text-xs text-emerald-400 whitespace-pre-wrap">{item.command}</pre>
                        <button
                          onClick={() => copy(item.command!, item.id)}
                          className="absolute top-1.5 right-2 text-[10px] text-zinc-600 group-hover:text-zinc-400 transition-colors"
                        >
                          {copied === item.id ? '✓ Copied' : 'Copy'}
                        </button>
                      </div>
                    )}
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-400 text-xs mt-1 inline-block hover:underline"
                      >
                        {item.link} ↗
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SetupPage;
