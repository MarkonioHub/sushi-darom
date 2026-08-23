export interface Review {
  id: string;
  name: string;
  surname?: string;
  phone: string;
  email?: string;
  city: string;
  theme: string;
  message: string;
  file?: string;
}

export interface CreateReview {
  name: string;
  surname?: string;
  phone: string;
  email?: string;
  city: string;
  theme: string;
  message: string;
  file?: File | null | undefined;
}

export interface UpdateReview {
  name: string;
  surname?: string;
  phone: string;
  email?: string;
  city: string;
  theme: string;
  message: string;
  file?: File | null | undefined;
}
