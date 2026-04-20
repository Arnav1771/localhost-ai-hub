import React, { useState } from 'react';
import { LAYERS } from '../data/layers';
import { SERVICES_BY_LAYER } from '../data/services';
import { Service } from '../types';
import ServiceCard from '../components/ServiceCard';
import ServiceDetailDrawer from '../components/ServiceDetailDrawer';
import { useSettingsStore } from '../store/settings';

const LayersPage: React.FC = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [expanded, setExpanded] = useState<Record<string, boolean>>(
    Object.fromEntries(LAYERS.map((l) => [l.id, true]))
  );
  const { serviceStatuses } = useSettingsStore();

  const toggle = (id: string) =>
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-zinc-100">Architecture Layers</h1>
        <p className="text-zinc-400 text-sm mt-1">
          Six specialised layers form the complete Local AI OS — each a power-packed stack in its own right.
        </p>
      </div>

      {/* Layers */}
      <div className="space-y-4">
        {LAYERS.map((layer) => {
          const services = SERVICES_BY_LAYER[layer.id] ?? [];
          const upCount = services.filter((s) => serviceStatuses[s.id]?.status === 'up').length;
          const isExpanded = expanded[layer.id];

          return (
            <div
              key={layer.id}
              className={`${layer.accentBg} border ${layer.accentBorder} rounded-2xl overflow-hidden`}
            >
              {/* Layer header */}
              <button
                onClick={() => toggle(layer.id)}
                className="w-full flex items-center gap-4 p-5 text-left hover:bg-white/5 transition-colors"
              >
                <span className="text-3xl">{layer.emoji}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h2 className={`text-lg font-bold text-zinc-100`}>{layer.name}</h2>
                    <span className={`text-xs font-semibold uppercase tracking-wider ${layer.accentText} bg-zinc-900/60 px-2 py-0.5 rounded-full`}>
                      {layer.tagline}
                    </span>
                  </div>
                  <p className="text-zinc-400 text-sm mt-1 line-clamp-2">{layer.description}</p>
                </div>
                <div className="flex flex-col items-end shrink-0 gap-1">
                  <span className="text-xs text-zinc-500">{services.length} services</span>
                  {upCount > 0 && (
                    <span className="text-xs text-emerald-400">{upCount} online</span>
                  )}
                  <span className={`text-zinc-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
                    ▾
                  </span>
                </div>
              </button>

              {/* Services grid */}
              {isExpanded && (
                <div className="px-5 pb-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                    {services.map((svc) => (
                      <ServiceCard key={svc.id} service={svc} onOpen={setSelectedService} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <ServiceDetailDrawer service={selectedService} onClose={() => setSelectedService(null)} />
    </div>
  );
};

export default LayersPage;
