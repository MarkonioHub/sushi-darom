import type { Owner, CreateOwner, UpdateOwner } from './types';
import { createCrudApi } from '@/shared/api';

export const ownerApi = createCrudApi<Owner, CreateOwner, UpdateOwner>('/api/admin/owners');
