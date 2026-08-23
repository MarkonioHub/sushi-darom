import type { City } from './types';
import { cityApi } from './api';

export const useCityStore = defineStore('city', () => {
  const cities = ref<City[]>([]);
  const currentCity = ref<City>();

  async function fetchCities() {
    cities.value = await cityApi.getAll();
    if (cities.value[0]) setCurrentCity(cities.value[0]);
  }

  function setCurrentCity(city: City) {
    currentCity.value = city;
  }

  return {
    cities,
    fetchCities,
    currentCity,
  };
});
