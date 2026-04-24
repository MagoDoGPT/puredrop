/**
 * Contact, newsletter & quote-request API.
 * Today: validates payload and resolves. Tomorrow: real /contact, /newsletter.
 */
import { simulateLatency } from './client';

export async function sendContactMessage({ name, email, topic, message, productHandle }) {
  // SWAP: return request('/contact', { method: 'POST', body: { name, email, topic, message, productHandle } });
  await simulateLatency(600);
  if (!email || !message) throw new Error('Missing required fields');
  return { ok: true, ticketId: 'CT-' + Date.now().toString(36).toUpperCase() };
}

export async function subscribeNewsletter(email) {
  // SWAP: return request('/newsletter', { method: 'POST', body: { email } });
  await simulateLatency(400);
  if (!email || !email.includes('@')) throw new Error('Invalid email');
  return { ok: true };
}

export async function requestQuote({ productHandle, name, email, message }) {
  // SWAP: return request('/quotes', { method: 'POST', body: { productHandle, name, email, message } });
  return sendContactMessage({
    name,
    email,
    topic: 'Quote request',
    message,
    productHandle,
  });
}
