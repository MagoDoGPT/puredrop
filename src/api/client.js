/**
 * PureDrop API client — central fetch wrapper.
 *
 * Today: every api/* module returns mock data via Promise.resolve.
 * Tomorrow: each api/* function will call `request()` below with the
 * appropriate path/method and the rest of the app keeps working untouched.
 *
 * To switch to a real backend:
 *   1. Set VITE_API_URL in .env
 *   2. In each api/*.js file, replace the mock body with `return request(...)`
 *   3. Wire `getAuthToken` to read from your auth store (today: localStorage)
 */

export const API_URL = import.meta.env.VITE_API_URL || '';

const AUTH_TOKEN_KEY = 'puredrop_auth_token';

export function getAuthToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function setAuthToken(token) {
  if (token) localStorage.setItem(AUTH_TOKEN_KEY, token);
  else localStorage.removeItem(AUTH_TOKEN_KEY);
}

export class ApiError extends Error {
  constructor(message, status, body) {
    super(message);
    this.status = status;
    this.body = body;
  }
}

/**
 * Tiny fetch wrapper. Not used yet — kept ready for the swap.
 */
export async function request(path, { method = 'GET', body, headers = {} } = {}) {
  const token = getAuthToken();
  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  let data = null;
  const text = await res.text();
  if (text) {
    try { data = JSON.parse(text); } catch { data = text; }
  }

  if (!res.ok) {
    throw new ApiError(data?.message || res.statusText, res.status, data);
  }
  return data;
}

/**
 * Simulated latency for write operations so loading states are testable.
 * Reads stay instant. Remove these when real `request()` calls land.
 */
export const simulateLatency = (ms = 400) =>
  new Promise((resolve) => setTimeout(resolve, ms));
