export interface City {
  id: string;
  name: string;
  slug: string;
  phone: string;
}

export interface CreateCity {
  name: string;
  slug: string;
  phone: string;
}

export interface UpdateCity {
  name: string;
  slug: string;
  phone: string;
}
