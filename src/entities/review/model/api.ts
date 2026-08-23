import { api, createCrudApi } from '@/shared/api';
import { createFormData } from '@/shared/lib';
import { type CreateReview, type Review, type UpdateReview } from '@/entities/review';

export const reviewApi = createCrudApi<Review, CreateReview, UpdateReview>('/api/admin/reviews');

export function createReview(data: CreateReview) {
  return api<Review>(`/api/admin/reviews/`, {
    method: 'POST',
    body: createFormData(data),
  });
}
