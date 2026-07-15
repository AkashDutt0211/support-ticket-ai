import {
  ApiError,
  ValidationApiError,
  type ApiErrorBody,
  type ApiSuccess,
  type ValidationIssue,
} from '../types/api';

const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001/api';

interface RequestOptions {
  method?: string;
  body?: unknown;
  signal?: AbortSignal;
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, signal } = options;

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
      signal,
    });
  } catch {
    throw new ApiError('Cannot reach server. Is the backend running?', 0, 'NETWORK_ERROR');
  }

  const payload: unknown = await response.json().catch(() => null);

  if (response.ok) {
    return (payload as ApiSuccess<T>).data;
  }

  if (response.status === 400 && payload && typeof payload === 'object' && 'errors' in payload) {
    throw new ValidationApiError((payload as { errors: ValidationIssue[] }).errors);
  }

  if (payload && typeof payload === 'object' && 'error' in payload) {
    const error = (payload as { error: ApiErrorBody }).error;
    throw new ApiError(error.message, response.status, error.code);
  }

  throw new ApiError('Request failed', response.status, 'REQUEST_FAILED');
}
