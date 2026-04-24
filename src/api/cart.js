/**
 * Cart & checkout API.
 * Today: cart lives in CartContext (localStorage). Checkout is a stub.
 * Tomorrow:
 *   - When the user logs in, call mergeGuestCart() to push localStorage
 *     items to the server and pull the merged cart back.
 *   - createCheckoutSession() will hit Stripe via the backend and return
 *     a redirect URL.
 */
import { simulateLatency } from './client';

export async function mergeGuestCart(guestItems) {
  // SWAP: return request('/cart/merge', { method: 'POST', body: { items: guestItems } });
  await simulateLatency(300);
  return guestItems;
}

export async function getServerCart() {
  // SWAP: return request('/cart');
  return Promise.resolve([]);
}

export async function createCheckoutSession({ items, currency = 'GBP' }) {
  // SWAP: return request('/checkout/session', { method: 'POST', body: { items, currency } });
  await simulateLatency(800);
  // Real implementation: backend returns { url: 'https://checkout.stripe.com/...' }
  // and we do `window.location.href = url`.
  return {
    sessionId: 'cs_demo_' + Date.now(),
    url: null,
    demo: true,
    summary: {
      itemCount: items.reduce((n, i) => n + i.qty, 0),
      total: items.reduce((s, i) => s + i.unitPrice * i.qty, 0),
      currency,
    },
  };
}
