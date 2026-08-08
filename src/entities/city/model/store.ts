import type { City } from './types';
import { cityApi } from './api';

export const useCityStore = defineStore('city', () => {
  const cities = ref<City[]>([]);
  const currentCity = ref<City>();

  async function fetchCities() {
    cities.value = await cityApi.getAll();
  }

  return {
    cities,
    fetchCities,
    currentCity,
  };
});
