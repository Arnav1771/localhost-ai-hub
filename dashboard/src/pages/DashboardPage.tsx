import React, { useEffect } from 'react';
import { SERVICES } from '../data/services';
import { LAYERS } from '../data/layers';
import { useSettingsStore } from '../store/settings';
import { checkServiceHealth } from '../utils/healthCheck';
import ServiceCard from '../components/ServiceCard';
import ServiceDetailDrawer from '../components/ServiceDetailDrawer';
import { Service } from '../types';

const DashboardPage: React.FC = () => {
  const { serviceStatuses, setServiceStatus, pinnedServices, healthCheckEnabled } = useSettingsStore();
  const [selectedService, setSelectedService] = React.useState<Service | null>(null);

  // Run health checks on mount + interval
  useEffect(() => {
    if (!healthCheckEnabled) return;

    const runChecks = () => {
      Promise.all(
        SERVICES.map(async (svc) => {
          const status = await checkServiceHealth(svc);
          setServiceStatus(svc.id, status);
        })
      );
    };

    runChecks();
    const interval = setInterval(runChecks, 30_000);
    return () => clearInterval(interval);
  }, [healthCheckEnabled, setServiceStatus]);

  const totalServices = SERVICES.length;
  const onlineCount = Object.values(serviceStatuses).filter((s) => s.status === 'up').length;
  const offlineCount = Object.values(serviceStatuses).filter((s) => s.status === 'down').length;
  const unknownCount = totalServices - onlineCount - offlineCount;
  const pinnedServiceList = SERVICES.filter((s) => pinnedServices.includes(s.id));

  // Layer stats
  const layerStats = LAYERS.map((layer) => {
    const layerServices = SERVICES.filter((s) => s.layer === layer.id);
    const upCount = layerServices.filter((s) => serviceStatuses[s.id]?.status === 'up').length;
    return { layer, total: layerServices.length, up: upCount };
  });

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Hero */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-zinc-100">
          🤖 Local AI Operating System
        </h1>
        <p className="text-zinc-400 text-sm">
          {totalServices} services · 6 layers · 100% private · zero cloud
        </p>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard label="Total Services" value={totalServices} icon="📦" color="text-brand-400" />
        <StatCard label="Online" value={onlineCount} icon="🟢" color="text-emerald-400" />
        <StatCard label="Offline" value={offlineCount} icon="🔴" color="text-red-400" />
        <StatCard label="Unknown" value={unknownCount} icon="⚪" color="text-zinc-400" />
      </div>

      {/* Layer overview */}
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 mb-3">Architecture Layers</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {layerStats.map(({ layer, total, up }) => (
            <div
              key={layer.id}
              className={`${layer.accentBg} border ${layer.accentBorder} rounded-xl p-3 text-center`}
            >
              <div className="text-2xl mb-1">{layer.emoji}</div>
              <div className={`text-xs font-semibold ${layer.accentText} leading-tight`}>{layer.name}</div>
              <div className="text-zinc-500 text-[10px] mt-1">{up}/{total} online</div>
            </div>
          ))}
        </div>
      </div>

      {/* Pinned services */}
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 mb-3">
          📌 Pinned Services
        </h2>
        {pinnedServiceList.length === 0 ? (
          <p className="text-zinc-500 text-sm">No services pinned. Click the pin icon on any service card.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {pinnedServiceList.map((svc) => (
              <ServiceCard key={svc.id} service={svc} onOpen={setSelectedService} />
            ))}
          </div>
        )}
      </div>

      {/* Quick access to all layers */}
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 mb-3">
          🚀 All Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {SERVICES.map((svc) => (
            <ServiceCard key={svc.id} service={svc} onOpen={setSelectedService} />
          ))}
        </div>
      </div>

      {/* Detail drawer */}
      <ServiceDetailDrawer service={selectedService} onClose={() => setSelectedService(null)} />
    </div>
  );
};

interface StatCardProps {
  label: string;
  value: number;
  icon: string;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon, color }) => (
  <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex items-center gap-3">
    <span className="text-2xl">{icon}</span>
    <div>
      <div className={`text-2xl font-bold ${color}`}>{value}</div>
      <div className="text-zinc-500 text-xs">{label}</div>
    </div>
  </div>
);

export default DashboardPage;
