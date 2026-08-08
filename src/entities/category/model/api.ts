import type { Category, CreateCategory, UpdateCategory } from './types';
import { createCrudApi } from '@/shared/api';

export const categoryApi = createCrudApi<Category, CreateCategory, UpdateCategory>(
  '/api/admin/categories'
);
