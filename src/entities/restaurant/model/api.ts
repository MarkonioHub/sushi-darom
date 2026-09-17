import type { Restaurant, CreateRestaurant, UpdateRestaurant } from './types';
import { api, createCrudApi } from '@/shared/api';

export const restaurantApi = createCrudApi<Restaurant, CreateRestaurant, UpdateRestaurant>(
  '/api/admin/restaurants'
);

export function getRestaurantsByCityId(id: string) {
  return api<Restaurant[]>(`/api/admin/restaurants`, {
    method: 'GET',
    query: {
      cityId: id,
    },
  });
}
