import React, { useState, useMemo } from 'react';
import { SERVICES } from '../data/services';
import { LAYERS } from '../data/layers';
import { Service } from '../types';
import ServiceCard from '../components/ServiceCard';
import ServiceDetailDrawer from '../components/ServiceDetailDrawer';

const ServicesPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [filterLayer, setFilterLayer] = useState<string>('all');
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const filtered = useMemo(() => {
    return SERVICES.filter((svc) => {
      const matchesLayer = filterLayer === 'all' || svc.layer === filterLayer;
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        svc.name.toLowerCase().includes(q) ||
        svc.description.toLowerCase().includes(q) ||
        svc.tags.some((t) => t.includes(q));
      return matchesLayer && matchesSearch;
    });
  }, [search, filterLayer]);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-zinc-100">Services Catalog</h1>
        <p className="text-zinc-400 text-sm mt-1">
          {SERVICES.length} services across 6 layers — browse, launch, and monitor your local AI stack.
        </p>
      </div>

      {/* Search + filter bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Search services, tags, descriptions…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-zinc-200
            placeholder-zinc-600 focus:outline-none focus:border-brand-500 transition-colors"
        />
        <select
          value={filterLayer}
          onChange={(e) => setFilterLayer(e.target.value)}
          className="bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2.5 text-sm text-zinc-300
            focus:outline-none focus:border-brand-500 transition-colors min-w-[170px]"
        >
          <option value="all">All Layers ({SERVICES.length})</option>
          {LAYERS.map((l) => {
            const count = SERVICES.filter((s) => s.layer === l.id).length;
            return (
              <option key={l.id} value={l.id}>
                {l.emoji} {l.name} ({count})
              </option>
            );
          })}
        </select>
      </div>

      {/* Results count */}
      <p className="text-zinc-500 text-xs">
        Showing {filtered.length} of {SERVICES.length} services
        {search ? ` for "${search}"` : ''}
        {filterLayer !== 'all' ? ` in ${LAYERS.find((l) => l.id === filterLayer)?.name}` : ''}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-zinc-500">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-lg font-medium">No services found</p>
          <p className="text-sm">Try a different search term or layer filter</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((svc) => (
            <ServiceCard key={svc.id} service={svc} onOpen={setSelectedService} />
          ))}
        </div>
      )}

      <ServiceDetailDrawer service={selectedService} onClose={() => setSelectedService(null)} />
    </div>
  );
};

export default ServicesPage;
