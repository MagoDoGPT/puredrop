/**
 * Products API.
 * Today: pulls from local data/products.js.
 * Tomorrow: replace mock bodies with `request('/products', ...)`.
 */
import {
  products as productsData,
  getProductByHandle as findByHandle,
  getRelatedProducts as findRelated,
  getProductsByCategory as findByCategory,
  getSignatureProduct as findSignature,
} from '../data/products';

export async function listProducts({ category } = {}) {
  // SWAP: return request(`/products${category ? `?category=${category}` : ''}`);
  return Promise.resolve(findByCategory(category));
}

export async function getProduct(handle) {
  // SWAP: return request(`/products/${handle}`);
  return Promise.resolve(findByHandle(handle));
}

export async function getRelated(handle) {
  // SWAP: return request(`/products/${handle}/related`);
  return Promise.resolve(findRelated(handle));
}

export async function getSignature() {
  // SWAP: return request('/products/signature');
  return Promise.resolve(findSignature());
}

// Re-export raw data for sync UIs that don't need async (Shop grid, Carousel).
// When backend is wired, refactor these consumers to use listProducts() instead.
export { productsData as productsSync };
