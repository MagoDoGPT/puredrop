/**
 * Account data API — addresses & payment methods.
 * Today: in-memory mocks (lost on reload, like the original).
 * Tomorrow: real /addresses, /payment-methods endpoints.
 */
import { simulateLatency } from './client';

let addresses = [
  {
    id: 1,
    label: 'Home',
    name: 'Sarah Mitchell',
    line1: '14 Elmsgrove Road',
    line2: 'Flat 3',
    city: 'London',
    postcode: 'SE15 4QR',
    country: 'United Kingdom',
    default: true,
  },
  {
    id: 2,
    label: 'Work',
    name: 'Sarah Mitchell',
    line1: '22 Old Street',
    line2: 'Floor 4, Studio B',
    city: 'London',
    postcode: 'EC1V 9HL',
    country: 'United Kingdom',
    default: false,
  },
];

let payments = [
  { id: 1, brand: 'Visa', last4: '4242', exp: '08/28', default: true },
  { id: 2, brand: 'Mastercard', last4: '5678', exp: '11/27', default: false },
];

/* ── Addresses ───────────────────────────────────────────── */
export async function listAddresses() {
  // SWAP: return request('/addresses');
  return Promise.resolve([...addresses]);
}

export async function deleteAddress(id) {
  // SWAP: return request(`/addresses/${id}`, { method: 'DELETE' });
  await simulateLatency(200);
  addresses = addresses.filter((a) => a.id !== id);
  return { ok: true };
}

export async function setDefaultAddress(id) {
  // SWAP: return request(`/addresses/${id}/default`, { method: 'POST' });
  await simulateLatency(200);
  addresses = addresses.map((a) => ({ ...a, default: a.id === id }));
  return [...addresses];
}

/* ── Payments (Stripe-backed in production) ──────────────── */
export async function listPayments() {
  // SWAP: return request('/payment-methods');
  return Promise.resolve([...payments]);
}

export async function deletePayment(id) {
  // SWAP: return request(`/payment-methods/${id}`, { method: 'DELETE' });
  await simulateLatency(200);
  payments = payments.filter((p) => p.id !== id);
  return { ok: true };
}

export async function setDefaultPayment(id) {
  // SWAP: return request(`/payment-methods/${id}/default`, { method: 'POST' });
  await simulateLatency(200);
  payments = payments.map((p) => ({ ...p, default: p.id === id }));
  return [...payments];
}
