import type { City } from './types';
import { getCities } from './api';

export const useCityStore = defineStore('city', () => {
  const cities = ref<City[]>([]);
  const currentCity = ref<City>();

  async function fetchCities() {
    cities.value = await getCities();
  }

  return {
    cities,
    fetchCities,
    currentCity,
  };
});
