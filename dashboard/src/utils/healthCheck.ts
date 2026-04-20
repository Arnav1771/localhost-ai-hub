import { Service, ServiceStatus } from '../types';

/**
 * Best-effort HTTP health check for a service.
 * Returns 'up', 'down', or 'cors-blocked'.
 */
export async function checkServiceHealth(service: Service): Promise<ServiceStatus> {
  if (service.healthCheck.type === 'none') return 'unknown';
  if (service.healthCheck.type === 'tcp') return 'unknown'; // Can't do TCP from browser

  const url =
    service.healthCheck.type === 'http' && service.healthCheck.path
      ? `${service.localUrl}${service.healthCheck.path}`
      : service.localUrl;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);

    const res = await fetch(url, {
      method: 'GET',
      signal: controller.signal,
      mode: 'cors',
    });
    clearTimeout(timeout);

    return res.ok || res.status < 500 ? 'up' : 'down';
  } catch (err: unknown) {
    if (err instanceof TypeError && err.message?.toLowerCase().includes('failed to fetch')) {
      // Could be CORS or the service is down — try no-cors to distinguish
      try {
        const controller2 = new AbortController();
        const timeout2 = setTimeout(() => controller2.abort(), 4000);
        await fetch(url, { method: 'GET', signal: controller2.signal, mode: 'no-cors' });
        clearTimeout(timeout2);
        // Got a response (opaque) — service is up but CORS blocked
        return 'cors-blocked';
      } catch {
        return 'down';
      }
    }
    if (err instanceof DOMException && err.name === 'AbortError') {
      return 'down'; // timed out
    }
    return 'down';
  }
}
