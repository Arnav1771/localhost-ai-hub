import React from 'react';
import { ServiceStatus } from '../types';

interface StatusBadgeProps {
  status: ServiceStatus;
  pulse?: boolean;
}

const STATUS_CONFIG: Record<ServiceStatus, { label: string; dot: string; bg: string; text: string }> = {
  up:           { label: 'Online',  dot: 'bg-emerald-400', bg: 'bg-emerald-900/40', text: 'text-emerald-400' },
  down:         { label: 'Offline', dot: 'bg-red-400',     bg: 'bg-red-900/40',     text: 'text-red-400'     },
  'cors-blocked':{ label: 'CORS',   dot: 'bg-amber-400',   bg: 'bg-amber-900/40',   text: 'text-amber-400'   },
  unknown:      { label: 'Unknown', dot: 'bg-zinc-500',    bg: 'bg-zinc-800/60',    text: 'text-zinc-400'    },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, pulse = false }) => {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.unknown;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${cfg.bg} ${cfg.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot} ${pulse && status === 'up' ? 'animate-pulse' : ''}`} />
      {cfg.label}
    </span>
  );
};

export default StatusBadge;
