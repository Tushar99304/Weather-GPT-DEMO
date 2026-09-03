/**
 * backendClient.ts — the ONLY module that talks to the FastAPI backend.
 *
 * Base URL is SAME-ORIGIN by default (empty string) so the app works behind the FastAPI
 * static host AND behind the Vite dev proxy (vite.config proxies /api and /health -> :8000).
 * VITE_API_BASE_URL may override it (e.g. https://api.example.com/api) for split deploys.
 *
 * No API keys, tokens or secrets are ever read here — the backend holds all credentials.
 */
import type {
  BackendClimateResponse,
  BackendHealth,
  BackendOverviewResponse,
  BackendQueryResponse,
} from '../types/backend';

const RAW_BASE = (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? '';
// If a full origin is configured (e.g. http://localhost:8000/api) use it as-is; an empty
// value means "same origin" -> relative paths ("" + "/api/query").
export const API_BASE_URL = RAW_BASE.replace(/\/+$/, '');

export class BackendError extends Error {
  readonly status?: number;
  readonly kind: 'network' | 'http' | 'bad_payload';
  constructor(
    message: string,
    status?: number,
    kind: 'network' | 'http' | 'bad_payload' = 'network',
  ) {
    super(message);
    this.name = 'BackendError';
    this.status = status;
    this.kind = kind;
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE_URL}${path}`, {
      headers: { 'Content-Type': 'application/json', ...(init?.headers ?? {}) },
      ...init,
    });
  } catch (err) {
    throw new BackendError(
      `backend unreachable at ${path}: ${err instanceof Error ? err.message : String(err)}`,
      undefined,
      'network',
    );
  }
  if (!res.ok) {
    throw new BackendError(`backend returned HTTP ${res.status} for ${path}`, res.status, 'http');
  }
  try {
    return (await res.json()) as T;
  } catch (err) {
    throw new BackendError(`bad JSON from ${path}: ${String(err)}`, res.status, 'bad_payload');
  }
}

export interface QueryParams {
  message: string;
  locationHint?: string;
  activity?: string;
  latitude?: number;
  longitude?: number;
  includePipeline?: boolean;
}

/** POST /api/query — the full grounded pipeline (chat, dashboard, advisory, alerts). */
export function queryBackend(params: QueryParams): Promise<BackendQueryResponse> {
  return request<BackendQueryResponse>('/api/query', {
    method: 'POST',
    body: JSON.stringify({
      message: params.message,
      location_hint: params.locationHint,
      activity: params.activity,
      latitude: params.latitude,
      longitude: params.longitude,
      include_pipeline: params.includePipeline ?? false,
    }),
  });
}

/** GET /health — secret-free provider/LLM/alert configuration for connection status. */
export function fetchHealth(): Promise<BackendHealth> {
  return request<BackendHealth>('/health');
}

/** GET /api/overview — read-only current-conditions summary for the map/dashboard. */
export function fetchOverview(): Promise<BackendOverviewResponse> {
  return request<BackendOverviewResponse>('/api/overview');
}

/** GET /api/climate?place= — research/repro historical trends (NEVER official IMD data). */
export function fetchClimate(place: string): Promise<BackendClimateResponse> {
  return request<BackendClimateResponse>(
    `/api/climate?place=${encodeURIComponent(place)}`,
  );
}
