import type { Product, CreateProduct, UpdateProduct, ProductSearchResult } from './types';
import { api, createCrudApi } from '@/shared/api';
import { createFormData } from '@/shared/lib';

export const productApi = createCrudApi<Product, CreateProduct, UpdateProduct>(
  '/api/admin/products'
);

export function createProduct(data: CreateProduct) {
  return api<Product>('/api/admin/products', {
    method: 'POST',
    body: createFormData(data),
  });
}

export function updateProduct(id: string, data: UpdateProduct) {
  return api<Product>(`/api/admin/products/${id}`, {
    method: 'PUT',
    body: createFormData(data),
  });
}

export function searchProductsPreview(query: string, options?: { limit: 20 }) {
  const params = new URLSearchParams({
    search: query,
  });
  if (options?.limit) {
    params.set('limit', String(options.limit));
  }
  return api<ProductSearchResult[]>(`/api/admin/products/search-preview?${params.toString()}`);
}

export function searchProducts(query: string, options?: { limit: 40 }) {
  const params = new URLSearchParams({
    search: query,
  });
  if (options?.limit) {
    params.set('limit', String(options.limit));
  }
  return api<Product[]>(`/api/admin/products/search?${params.toString()}`);
}
