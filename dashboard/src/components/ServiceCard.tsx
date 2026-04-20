import React, { useState } from 'react';
import { Service } from '../types';
import { LAYER_MAP } from '../data/layers';
import { useSettingsStore } from '../store/settings';
import StatusBadge from './StatusBadge';

interface ServiceCardProps {
  service: Service;
  onOpen?: (svc: Service) => void;
  compact?: boolean;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onOpen, compact = false }) => {
  const [copied, setCopied] = useState(false);
  const { serviceStatuses, pinnedServices, togglePin } = useSettingsStore();

  const layer = LAYER_MAP[service.layer];
  const statusData = serviceStatuses[service.id];
  const status = statusData?.status ?? 'unknown';
  const isPinned = pinnedServices.includes(service.id);

  const copyUrl = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(service.localUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  const openService = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(service.localUrl, '_blank', 'noopener,noreferrer');
  };

  const handlePin = (e: React.MouseEvent) => {
    e.stopPropagation();
    togglePin(service.id);
  };

  return (
    <div
      className={`group relative flex flex-col bg-zinc-900 border ${layer.accentBorder} rounded-xl p-4 cursor-pointer
        hover:bg-zinc-800 hover:shadow-lg transition-all duration-200 ${compact ? 'gap-2' : 'gap-3'}`}
      onClick={() => onOpen?.(service)}
    >
      {/* Pin button */}
      <button
        onClick={handlePin}
        className={`absolute top-3 right-3 text-xs p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity
          ${isPinned ? 'text-amber-400 opacity-100' : 'text-zinc-500 hover:text-zinc-300'}`}
        title={isPinned ? 'Unpin' : 'Pin to Dashboard'}
      >
        {isPinned ? '📌' : '📍'}
      </button>

      {/* Header */}
      <div className="flex items-start gap-3">
        <span className="text-2xl leading-none mt-0.5">{service.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-zinc-100 text-sm leading-tight truncate">{service.name}</h3>
            <StatusBadge status={status} pulse />
          </div>
          <span className={`text-[10px] font-medium uppercase tracking-wider ${layer.accentText} mt-0.5 block`}>
            {layer.emoji} {layer.name}
          </span>
        </div>
      </div>

      {/* Description */}
      {!compact && (
        <p className="text-zinc-400 text-xs leading-relaxed line-clamp-2">{service.description}</p>
      )}

      {/* URL */}
      <div className="flex items-center gap-1.5 bg-zinc-800 rounded-lg px-2.5 py-1.5 font-mono text-xs text-zinc-300 border border-zinc-700/50">
        <span className="text-zinc-500">🔗</span>
        <span className="truncate flex-1">{service.localUrl}</span>
      </div>

      {/* Tags */}
      {!compact && (
        <div className="flex flex-wrap gap-1">
          {service.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="bg-zinc-800 text-zinc-400 text-[10px] px-1.5 py-0.5 rounded border border-zinc-700/40">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2 mt-auto pt-1">
        <button
          onClick={openService}
          className={`flex-1 py-1.5 rounded-lg text-xs font-semibold text-white transition-colors
            bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400`}
        >
          Open ↗
        </button>
        <button
          onClick={copyUrl}
          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-800 text-zinc-300 hover:bg-zinc-700 border border-zinc-700 transition-colors"
        >
          {copied ? '✓' : 'Copy URL'}
        </button>
        {service.docsUrl && (
          <a
            href={service.docsUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-800 text-zinc-400 hover:bg-zinc-700 border border-zinc-700 transition-colors"
          >
            Docs
          </a>
        )}
      </div>
    </div>
  );
};

export default ServiceCard;
