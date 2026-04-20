import React, { useState } from 'react';
import { Service } from '../types';
import { LAYER_MAP } from '../data/layers';
import { useSettingsStore } from '../store/settings';
import StatusBadge from './StatusBadge';

interface ServiceDetailDrawerProps {
  service: Service | null;
  onClose: () => void;
}

export const ServiceDetailDrawer: React.FC<ServiceDetailDrawerProps> = ({ service, onClose }) => {
  const [copied, setCopied] = useState<string | null>(null);
  const { serviceStatuses } = useSettingsStore();

  if (!service) return null;

  const layer = LAYER_MAP[service.layer];
  const statusData = serviceStatuses[service.id];
  const status = statusData?.status ?? 'unknown';

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(null), 1800);
    });
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-zinc-900 border-l border-zinc-800 z-50 overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className={`${layer.accentBg} border-b ${layer.accentBorder} p-6`}>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{service.icon}</span>
              <div>
                <h2 className="text-xl font-bold text-zinc-100">{service.name}</h2>
                <span className={`text-sm font-medium ${layer.accentText}`}>
                  {layer.emoji} {layer.name} · {layer.tagline}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-zinc-400 hover:text-zinc-200 p-1 transition-colors text-xl"
            >
              ✕
            </button>
          </div>
          <div className="mt-3">
            <StatusBadge status={status} pulse />
            {statusData?.lastChecked && (
              <span className="text-xs text-zinc-500 ml-2">
                checked {new Date(statusData.lastChecked).toLocaleTimeString()}
              </span>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Description */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">About</h3>
            <p className="text-zinc-300 text-sm leading-relaxed">{service.description}</p>
          </div>

          {/* Local URL */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">Local URL</h3>
            <div className="flex items-center gap-2 bg-zinc-800 rounded-lg px-3 py-2 border border-zinc-700">
              <span className="font-mono text-sm text-zinc-200 flex-1 truncate">{service.localUrl}</span>
              <button
                onClick={() => copy(service.localUrl, 'url')}
                className="text-xs text-zinc-400 hover:text-zinc-200 shrink-0 transition-colors"
              >
                {copied === 'url' ? '✓ Copied' : 'Copy'}
              </button>
            </div>
          </div>

          {/* Start Hint */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">Start Command</h3>
            <div className="relative bg-zinc-950 rounded-lg border border-zinc-700 p-3">
              <pre className="font-mono text-sm text-emerald-400 whitespace-pre-wrap break-all">{service.startHint}</pre>
              <button
                onClick={() => copy(service.startHint, 'cmd')}
                className="absolute top-2 right-2 text-xs text-zinc-500 hover:text-zinc-300 transition-colors bg-zinc-800 px-2 py-0.5 rounded"
              >
                {copied === 'cmd' ? '✓' : 'Copy'}
              </button>
            </div>
          </div>

          {/* Tags */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">Tags</h3>
            <div className="flex flex-wrap gap-1.5">
              {service.tags.map((tag) => (
                <span key={tag} className={`${layer.accentBg} ${layer.accentText} ${layer.accentBorder} border text-xs px-2 py-0.5 rounded-full`}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Health check info */}
          {service.healthCheck.type !== 'none' && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">Health Check</h3>
              <div className="bg-zinc-800 rounded-lg p-3 border border-zinc-700 font-mono text-xs text-zinc-300">
                {service.healthCheck.type === 'http' && (
                  <span>GET {service.localUrl}{service.healthCheck.path}</span>
                )}
                {service.healthCheck.type === 'tcp' && (
                  <span>TCP port {service.healthCheck.port ?? service.port}</span>
                )}
              </div>
            </div>
          )}

          {/* Links */}
          <div className="flex flex-col gap-2 pt-2">
            <a
              href={service.localUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl text-sm font-semibold text-white text-center
                bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 transition-colors"
            >
              Open {service.name} ↗
            </a>
            {service.docsUrl && (
              <a
                href={service.docsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl text-sm font-medium text-zinc-300 text-center
                  bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 transition-colors"
              >
                Documentation ↗
              </a>
            )}
            {service.githubUrl && (
              <a
                href={service.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl text-sm font-medium text-zinc-300 text-center
                  bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 transition-colors"
              >
                GitHub ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceDetailDrawer;
