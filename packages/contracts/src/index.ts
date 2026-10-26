export type Session = { authenticated: false } | { authenticated: true; subject: string; displayName: string; membershipReady: boolean };
export type Capability = { service: string; domain: string; stage: string; businessFeaturesReady: boolean };
export type RemoteProps = { apiBase: string };
export class ApiError extends Error {
  constructor(public status: number) { super(status === 401 ? 'Inicia sesión para continuar.' : 'No pudimos conectar con el servicio. Inténtalo nuevamente.'); }
}
export async function getJson<T>(url: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(url, { credentials: 'same-origin', signal, headers: { Accept: 'application/json' } });
  if (!response.ok) throw new ApiError(response.status);
  return response.json() as Promise<T>;
}
export function parseSession(value: unknown): Session {
  if (!value || typeof value !== 'object' || !('authenticated' in value)) throw new Error('Respuesta de sesión inválida');
  if (value.authenticated === false) return { authenticated: false };
  const x = value as Record<string, unknown>;
  if (x.authenticated !== true || typeof x.subject !== 'string' || typeof x.displayName !== 'string' || typeof x.membershipReady !== 'boolean') throw new Error('Respuesta de sesión inválida');
  return { authenticated: true, subject: x.subject, displayName: x.displayName, membershipReady: x.membershipReady };
}
