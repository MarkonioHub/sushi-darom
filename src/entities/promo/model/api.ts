import { api } from '@/shared/api';
import { type Promo, type CreatePromo, type UpdatePromo } from '@/entities/promo';
import { createFormData } from '@/shared/lib';

export function deletePromo(id: string) {
  return api<Promo>(`/api/admin/promos/${id}`, {
    method: 'DELETE',
  });
}

export function fetchPromos(limit?: number) {
  const params = new URLSearchParams();
  if (limit) {
    params.set('limit', String(limit));
  }
  return api<Promo[]>(`/api/admin/promos?${params.toString()}`);
}

export function fetchPromo(slug: string) {
  return api<Promo>(`/api/admin/promos/slug/${encodeURIComponent(slug)}`);
}

export function createPromo(data: CreatePromo) {
  return api<Promo>('/api/admin/promos', {
    method: 'POST',
    body: createFormData(data),
  });
}

export function updatePromo(id: string, data: UpdatePromo) {
  return api<Promo>(`/api/admin/promos/${id}`, {
    method: 'PUT',
    body: createFormData(data),
  });
}
