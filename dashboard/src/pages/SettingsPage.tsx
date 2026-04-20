import React, { useState } from 'react';
import { useSettingsStore } from '../store/settings';
import { SERVICES } from '../data/services';
import { checkServiceHealth } from '../utils/healthCheck';

const SettingsPage: React.FC = () => {
  const {
    theme, setTheme,
    baseHost, setBaseHost,
    healthCheckEnabled, setHealthCheckEnabled,
    healthCheckInterval, setHealthCheckInterval,
    serviceOverrides, setServiceOverride,
    setServiceStatus,
  } = useSettingsStore();

  const [pingResults, setPingResults] = useState<Record<string, string>>({});
  const [pingLoading, setPingLoading] = useState<Record<string, boolean>>({});
  const [savedMsg, setSavedMsg] = useState(false);

  const saveHost = () => {
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2000);
  };

  const pingService = async (svcId: string) => {
    const svc = SERVICES.find((s) => s.id === svcId);
    if (!svc) return;
    setPingLoading((p) => ({ ...p, [svcId]: true }));
    try {
      const status = await checkServiceHealth(svc);
      setServiceStatus(svcId, status);
      setPingResults((r) => ({ ...r, [svcId]: status }));
    } finally {
      setPingLoading((p) => ({ ...p, [svcId]: false }));
    }
  };

  const pingAll = async () => {
    for (const svc of SERVICES) {
      pingService(svc.id);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-zinc-100">Settings</h1>
        <p className="text-zinc-400 text-sm mt-1">Configure the dashboard and service connections.</p>
      </div>

      {/* Appearance */}
      <Section title="Appearance" icon="🎨">
        <ToggleRow
          label="Dark Mode"
          description="Dark background, easy on the eyes for long hacking sessions."
          checked={theme === 'dark'}
          onChange={(v) => setTheme(v ? 'dark' : 'light')}
        />
      </Section>

      {/* Base host */}
      <Section title="Connection" icon="🔌">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-zinc-300 block mb-1.5">Base Host</label>
            <p className="text-xs text-zinc-500 mb-2">
              The hostname for all services. Default: <code className="font-mono">localhost</code>. Change if running on a LAN server.
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={baseHost}
                onChange={(e) => setBaseHost(e.target.value)}
                className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-200
                  font-mono focus:outline-none focus:border-brand-500 transition-colors"
              />
              <button
                onClick={saveHost}
                className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white text-sm font-medium rounded-lg transition-colors"
              >
                {savedMsg ? '✓ Saved' : 'Save'}
              </button>
            </div>
          </div>

          <ToggleRow
            label="Background Health Checks"
            description="Automatically probe service health endpoints at the configured interval."
            checked={healthCheckEnabled}
            onChange={setHealthCheckEnabled}
          />

          {healthCheckEnabled && (
            <div>
              <label className="text-sm font-medium text-zinc-300 block mb-1.5">
                Health Check Interval: <span className="text-brand-400">{healthCheckInterval}s</span>
              </label>
              <input
                type="range"
                min={10}
                max={300}
                step={10}
                value={healthCheckInterval}
                onChange={(e) => setHealthCheckInterval(Number(e.target.value))}
                className="w-full accent-brand-500"
              />
              <div className="flex justify-between text-[10px] text-zinc-600 mt-1">
                <span>10s</span>
                <span>5 min</span>
              </div>
            </div>
          )}
        </div>
      </Section>

      {/* Per-service port overrides */}
      <Section title="Service Port Overrides" icon="⚙️">
        <p className="text-xs text-zinc-500 mb-4">
          Override the default port for any service if you're running it on a non-standard port.
        </p>
        <div className="space-y-2">
          {SERVICES.map((svc) => {
            const override = serviceOverrides[svc.id];
            return (
              <div key={svc.id} className="flex items-center gap-3 py-2 border-b border-zinc-800/50">
                <span className="text-base">{svc.icon}</span>
                <span className="text-sm text-zinc-300 flex-1 truncate">{svc.name}</span>
                <span className="text-xs text-zinc-600 font-mono">:{svc.port}</span>
                <input
                  type="number"
                  placeholder="Override port"
                  value={override?.port ?? ''}
                  onChange={(e) =>
                    setServiceOverride(svc.id, { port: e.target.value ? Number(e.target.value) : undefined })
                  }
                  className="w-28 bg-zinc-800 border border-zinc-700 rounded-lg px-2 py-1 text-xs text-zinc-200 font-mono
                    focus:outline-none focus:border-brand-500 transition-colors"
                />
              </div>
            );
          })}
        </div>
      </Section>

      {/* Diagnostics */}
      <Section title="Diagnostics" icon="🩺">
        <p className="text-xs text-zinc-500 mb-4">
          Ping individual services or run a full stack health check. Results are saved to the service status store.
        </p>
        <button
          onClick={pingAll}
          className="mb-4 px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white text-sm font-medium rounded-lg transition-colors"
        >
          🩺 Ping All Services
        </button>
        <div className="space-y-2">
          {SERVICES.map((svc) => {
            const result = pingResults[svc.id];
            const loading = pingLoading[svc.id];
            return (
              <div key={svc.id} className="flex items-center gap-3 py-2 border-b border-zinc-800/50">
                <span className="text-base">{svc.icon}</span>
                <span className="text-sm text-zinc-300 flex-1 truncate">{svc.name}</span>
                <span className="font-mono text-xs text-zinc-500">{svc.localUrl}</span>
                {result && (
                  <span className={`text-xs font-medium ${
                    result === 'up' ? 'text-emerald-400' :
                    result === 'cors-blocked' ? 'text-amber-400' : 'text-red-400'
                  }`}>
                    {result === 'up' ? '✓ online' : result === 'cors-blocked' ? '⚠ cors' : '✗ offline'}
                  </span>
                )}
                <button
                  onClick={() => pingService(svc.id)}
                  disabled={loading}
                  className="text-xs px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg border border-zinc-700
                    transition-colors disabled:opacity-50"
                >
                  {loading ? '…' : 'Ping'}
                </button>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Data management */}
      <Section title="Data" icon="💾">
        <p className="text-xs text-zinc-500 mb-4">All settings are stored in <code className="font-mono">localStorage</code> under the key <code className="font-mono">ai-hub-settings</code>.</p>
        <button
          onClick={() => {
            if (window.confirm('Reset all settings to defaults?')) {
              localStorage.removeItem('ai-hub-settings');
              window.location.reload();
            }
          }}
          className="px-4 py-2 bg-red-900/50 hover:bg-red-900/70 text-red-400 text-sm font-medium rounded-lg border border-red-800 transition-colors"
        >
          🗑 Reset All Settings
        </button>
      </Section>
    </div>
  );
};

interface SectionProps {
  title: string;
  icon: string;
  children: React.ReactNode;
}
const Section: React.FC<SectionProps> = ({ title, icon, children }) => (
  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
    <div className="px-5 py-4 border-b border-zinc-800">
      <h2 className="text-base font-bold text-zinc-200">{icon} {title}</h2>
    </div>
    <div className="p-5">{children}</div>
  </div>
);

interface ToggleRowProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}
const ToggleRow: React.FC<ToggleRowProps> = ({ label, description, checked, onChange }) => (
  <div className="flex items-start gap-4">
    <div className="flex-1">
      <p className="text-sm font-medium text-zinc-300">{label}</p>
      {description && <p className="text-xs text-zinc-500 mt-0.5">{description}</p>}
    </div>
    <button
      onClick={() => onChange(!checked)}
      className={`relative w-10 h-5 rounded-full transition-colors shrink-0 mt-0.5
        ${checked ? 'bg-brand-500' : 'bg-zinc-700'}`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform
          ${checked ? 'translate-x-5' : 'translate-x-0'}`}
      />
    </button>
  </div>
);

export default SettingsPage;
