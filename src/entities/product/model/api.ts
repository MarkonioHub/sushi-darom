import { api } from '@/shared/api';
import type { Product } from '@/entities/product';

export function getProducts() {
  return api<Product[]>('/api/admin/products');
}

export function getProduct(id: string) {
  return api<Product>('/api/admin/products/:id');
}
