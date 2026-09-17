export interface Restaurant {
  id: string;
  cityId?: string;
  name: string;
  address: string;
  ownerId?: string;
  latitude: number;
  longitude: number;
  openingTime: string;
  closingTime: string;
  isActive: boolean;
}

export interface CreateRestaurant {
  cityId?: string;
  name: string;
  address: string;
  ownerId?: string;
  latitude: number;
  longitude: number;
  openingTime: string;
  closingTime: string;
  isActive: boolean;
}

export interface UpdateRestaurant {
  cityId?: string;
  name: string;
  address: string;
  ownerId?: string;
  latitude: number;
  longitude: number;
  openingTime: string;
  closingTime: string;
  isActive: boolean;
}
