export interface Product {
  id: string;
  name: string;
  slug: string;
  categoryId?: string;
  image?: string;
  description?: string;
  allergens?: string;
  compound?: string;
  price: string;
  oldPrice?: string;
  weight?: string;
  pieces?: string;
  proteins?: string;
  carbs?: string;
  fats?: string;
  calories?: string;
}

export interface CreateProduct {
  name: string;
  slug: string;
  categoryId?: string;
  image?: string;
  imageFile?: File | null | undefined;
  description?: string;
  allergens?: string;
  compound?: string;
  price: string;
  oldPrice?: string;
  weight?: string;
  pieces?: string;
  proteins?: string;
  carbs?: string;
  fats?: string;
  calories?: string;
}

export interface UpdateProduct {
  name: string;
  slug: string;
  categoryId?: string;
  image?: string;
  imageFile?: File | null | undefined;
  description?: string;
  allergens?: string;
  compound?: string;
  price: string;
  oldPrice?: string;
  weight?: string;
  pieces?: string;
  proteins?: string;
  carbs?: string;
  fats?: string;
  calories?: string;
}

export interface ProductSearchResult {
  name: string;
  slug: string;
  image?: string;
}
