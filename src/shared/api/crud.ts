import { api } from '@/shared/api/client';

export function createCrudApi<T, CreateT, UpdateT>(baseUrl: string) {
  return {
    getAll() {
      return api<T[]>(baseUrl);
    },
    getById(id: string) {
      return api<T>(`${baseUrl}/${id}`);
    },
    getBySlug(slug: string) {
      return api<T>(`${baseUrl}/slug/${encodeURIComponent(slug)}`);
    },
    create(data: CreateT) {
      return api<T>(baseUrl, {
        method: 'POST',
        body: data as Record<string, unknown>,
      });
    },
    update(id: string, data: UpdateT) {
      return api<T>(`${baseUrl}/${id}`, {
        method: 'PUT',
        body: data as Record<string, unknown>,
      });
    },
    delete(id: string) {
      return api<void>(`${baseUrl}/${id}`, {
        method: 'DELETE',
      });
    },
  };
}
