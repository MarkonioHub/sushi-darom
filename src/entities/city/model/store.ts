import type { City } from './types';
import { cityApi } from './api';

export const useCityStore = defineStore('city', () => {
  const cities = ref<City[]>([]);
  const currentCity = ref<City>();
  const cityCookie = useCookie<string | null>('city', {
    maxAge: 60 * 60 * 24 * 365,
  });

  async function fetchCities() {
    cities.value = await cityApi.getAll();
    setDefaultCurrentCity();
  }

  function setCurrentCity(city: City) {
    currentCity.value = city;
  }

  function setCityCookie(fiasId: string | undefined) {
    cityCookie.value = fiasId || '';
  }

  function setDefaultCurrentCity() {
    if (cities.value[0]) setCurrentCity(cities.value[0]);
  }

  return {
    cities,
    fetchCities,
    setCurrentCity,
    setDefaultCurrentCity,
    setCityCookie,
    currentCity,
    cityCookie,
  };
});
