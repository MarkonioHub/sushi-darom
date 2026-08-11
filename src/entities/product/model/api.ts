import type { Product, CreateProduct, UpdateProduct } from './types';
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

export function updateProduct(id: string, data: Product) {
  return api<Product>(`/api/admin/products/${id}`, {
    method: 'PUT',
    body: createFormData(data),
  });
}
