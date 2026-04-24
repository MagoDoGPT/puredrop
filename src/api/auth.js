/**
 * Auth API.
 * Today: any email+password "logs in" as DEMO_USER, persisted to localStorage.
 * Tomorrow: real /auth/login & /auth/register endpoints with JWT.
 */
import { simulateLatency, setAuthToken } from './client';

const SESSION_KEY = 'puredrop_auth_v1';

const DEMO_USER = {
  id: 'usr_demo',
  name: 'Sarah Mitchell',
  email: 'sarah.mitchell@example.com',
  phone: '+44 7700 900123',
  memberSince: '2024-03-15',
};

export async function login({ email, name }) {
  // SWAP: const data = await request('/auth/login', { method: 'POST', body: { email, password } });
  //       setAuthToken(data.token); return data.user;
  await simulateLatency();
  const user = { ...DEMO_USER, email: email || DEMO_USER.email, name: name || DEMO_USER.name };
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  setAuthToken('demo-token'); // placeholder
  return user;
}

export async function register({ email, password, name }) {
  // SWAP: const data = await request('/auth/register', { method: 'POST', body: { email, password, name } });
  //       setAuthToken(data.token); return data.user;
  await simulateLatency();
  return login({ email, name, password });
}

export async function loginAsDemo() {
  // Convenience for the "Preview member area" button — not a real endpoint.
  await simulateLatency(200);
  const user = { ...DEMO_USER };
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  setAuthToken('demo-token');
  return user;
}

export async function logout() {
  // SWAP: await request('/auth/logout', { method: 'POST' });
  localStorage.removeItem(SESSION_KEY);
  setAuthToken(null);
}

export function getCurrentUser() {
  // SWAP: return request('/auth/me'); — and make this async
  const raw = localStorage.getItem(SESSION_KEY);
  return raw ? JSON.parse(raw) : null;
}

export async function updateProfile(patch) {
  // SWAP: return request('/auth/me', { method: 'PATCH', body: patch });
  await simulateLatency();
  const current = getCurrentUser();
  if (!current) throw new Error('Not authenticated');
  const updated = { ...current, ...patch };
  localStorage.setItem(SESSION_KEY, JSON.stringify(updated));
  return updated;
}
