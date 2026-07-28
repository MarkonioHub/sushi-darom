import type { City, CreateCity } from './types';
import { api } from '@/shared/api';

export function getCities() {
  return api<City[]>('/api/admin/cities');
}

export function createCity(data: CreateCity) {
  return api<CreateCity>('/api/admin/cities', {
    method: 'POST',
    body: data,
  });
}
