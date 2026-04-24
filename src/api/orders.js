/**
 * Orders & subscriptions API.
 * Today: in-memory mocks scoped to the current "logged in" demo user.
 * Tomorrow: real /orders, /subscriptions, /orders/track endpoints.
 */
import { simulateLatency } from './client';

const MOCK_ORDERS = [
  {
    id: 'PD-2026-0412',
    date: '2026-04-12',
    status: 'In transit',
    tracking: 'RM123456789GB',
    total: 90.10,
    items: [
      { name: 'Replacement Cartridges (2-pack)', qty: 1, price: 42.00, icon: 'filter' },
      { name: 'Shower Filter', qty: 1, price: 48.10, icon: 'shower' },
    ],
  },
  {
    id: 'PD-2026-0201',
    date: '2026-02-01',
    status: 'Delivered',
    tracking: 'RM987654321GB',
    total: 85.00,
    items: [
      { name: 'The Carafe', qty: 1, price: 85.00, icon: 'carafe' },
    ],
  },
  {
    id: 'PD-2025-1108',
    date: '2025-11-08',
    status: 'Delivered',
    tracking: 'RM456789012GB',
    total: 180.00,
    items: [
      { name: 'Home Purifier', qty: 1, price: 180.00, icon: 'purifier' },
    ],
  },
  {
    id: 'PD-2025-0815',
    date: '2025-08-15',
    status: 'Delivered',
    tracking: 'RM321654987GB',
    total: 121.50,
    items: [
      { name: 'Tap Filter', qty: 1, price: 65.00, icon: 'tap' },
      { name: 'Replacement Cartridges (2-pack)', qty: 1, price: 42.00, icon: 'filter' },
      { name: 'Shipping', qty: 1, price: 14.50, icon: 'drop' },
    ],
  },
];

const MOCK_SUBSCRIPTION = {
  id: 'SUB-0042',
  product: 'The Carafe — Filter Refills',
  sku: '4-stage cartridge (2-pack)',
  nextDelivery: '2026-06-10',
  frequency: 'Every 3 months',
  status: 'Active',
  price: 35.70,
  originalPrice: 42.00,
  startedOn: '2024-03-15',
  deliveriesCompleted: 8,
};

let subscriptionState = { ...MOCK_SUBSCRIPTION };

export async function listOrders() {
  // SWAP: return request('/orders');
  return Promise.resolve(MOCK_ORDERS);
}

export async function getSubscription() {
  // SWAP: return request('/subscriptions/current');
  return Promise.resolve({ ...subscriptionState });
}

export async function pauseSubscription() {
  // SWAP: return request('/subscriptions/current/pause', { method: 'POST' });
  await simulateLatency(200);
  subscriptionState = { ...subscriptionState, status: 'Paused' };
  return { ...subscriptionState };
}

export async function resumeSubscription() {
  // SWAP: return request('/subscriptions/current/resume', { method: 'POST' });
  await simulateLatency(200);
  subscriptionState = { ...subscriptionState, status: 'Active' };
  return { ...subscriptionState };
}

export async function cancelSubscription() {
  // SWAP: return request('/subscriptions/current', { method: 'DELETE' });
  await simulateLatency(200);
  subscriptionState = { ...subscriptionState, status: 'Cancelled' };
  return { ...subscriptionState };
}

export async function skipNextDelivery() {
  // SWAP: return request('/subscriptions/current/skip', { method: 'POST' });
  await simulateLatency(200);
  return { newNextDelivery: '2026-09-10' };
}

export async function trackOrder({ orderNumber, email }) {
  // SWAP: return request(`/orders/track?order=${orderNumber}&email=${email}`);
  await simulateLatency(500);
  return {
    order: orderNumber,
    email,
    status: 'shipped',
    carrier: 'Royal Mail 24',
    tracking: 'RM' + orderNumber.toUpperCase() + 'GB',
    eta: 'Thursday, 23 April',
    currentStage: 2,
  };
}
