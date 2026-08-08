import type { City, CreateCity, UpdateCity } from './types';
import { createCrudApi } from '@/shared/api';

export const cityApi = createCrudApi<City, CreateCity, UpdateCity>('/api/admin/cities');
