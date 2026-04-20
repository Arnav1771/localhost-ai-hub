export type LayerId =
  | 'brain'
  | 'logic'
  | 'hands'
  | 'brainpower'
  | 'knowledge'
  | 'interface';

export interface Layer {
  id: LayerId;
  name: string;
  emoji: string;
  tagline: string;
  description: string;
  color: string;         // Tailwind color class prefix (e.g. 'violet')
  accentBg: string;     // full tailwind bg class
  accentBorder: string; // full tailwind border class
  accentText: string;   // full tailwind text class
}

export type ServiceStatus = 'unknown' | 'up' | 'down' | 'cors-blocked';

export interface HealthCheck {
  type: 'http' | 'tcp' | 'none';
  path?: string;   // e.g. '/health' — appended to localUrl for http checks
  port?: number;   // for tcp checks
}

export interface Service {
  id: string;
  name: string;
  layer: LayerId;
  tags: string[];
  description: string;
  localUrl: string;
  port: number;
  docsUrl?: string;
  githubUrl?: string;
  icon: string;           // emoji or short string
  startHint: string;      // command to start this service
  healthCheck: HealthCheck;
  status?: ServiceStatus;
  lastChecked?: number;   // timestamp
  pinned?: boolean;
}
