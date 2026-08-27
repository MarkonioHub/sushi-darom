export interface Promo {
  id: string;
  slug: string;
  name: string;
  content: string;
  imageVertical: string;
  imageHorizontal: string;
}

export interface CreatePromo {
  slug: string;
  name: string;
  content: string;
  imageVertical?: File | null;
  imageHorizontal?: File | null;
}

export interface UpdatePromo {
  slug: string;
  name: string;
  content: string;
  imageVertical?: File | null;
  imageHorizontal?: File | null;
}
