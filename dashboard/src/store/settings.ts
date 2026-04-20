import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ServiceStatus } from '../types';

interface ServiceOverride {
  port?: number;
  url?: string;
}

interface SettingsState {
  theme: 'dark' | 'light';
  baseHost: string;
  healthCheckEnabled: boolean;
  healthCheckInterval: number; // seconds
  serviceOverrides: Record<string, ServiceOverride>;
  serviceStatuses: Record<string, { status: ServiceStatus; lastChecked: number }>;
  pinnedServices: string[];

  setTheme: (t: 'dark' | 'light') => void;
  setBaseHost: (h: string) => void;
  setHealthCheckEnabled: (v: boolean) => void;
  setHealthCheckInterval: (v: number) => void;
  setServiceOverride: (id: string, override: ServiceOverride) => void;
  setServiceStatus: (id: string, status: ServiceStatus) => void;
  togglePin: (id: string) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      theme: 'dark',
      baseHost: 'localhost',
      healthCheckEnabled: true,
      healthCheckInterval: 30,
      serviceOverrides: {},
      serviceStatuses: {},
      pinnedServices: ['openwebui', 'flowise', 'ai-gateway', 'ollama'],

      setTheme: (t) => set({ theme: t }),
      setBaseHost: (h) => set({ baseHost: h }),
      setHealthCheckEnabled: (v) => set({ healthCheckEnabled: v }),
      setHealthCheckInterval: (v) => set({ healthCheckInterval: v }),
      setServiceOverride: (id, override) =>
        set((s) => ({
          serviceOverrides: { ...s.serviceOverrides, [id]: { ...s.serviceOverrides[id], ...override } },
        })),
      setServiceStatus: (id, status) =>
        set((s) => ({
          serviceStatuses: {
            ...s.serviceStatuses,
            [id]: { status, lastChecked: Date.now() },
          },
        })),
      togglePin: (id) => {
        const pins = get().pinnedServices;
        set({
          pinnedServices: pins.includes(id) ? pins.filter((p) => p !== id) : [...pins, id],
        });
      },
    }),
    { name: 'ai-hub-settings' }
  )
);
