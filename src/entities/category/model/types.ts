export interface Category {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
}

export interface CreateCategory {
  name: string;
  slug: string;
  isActive: boolean;
}

export interface UpdateCategory {
  name: string;
  slug: string;
  isActive: boolean;
}
