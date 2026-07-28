import { useCityStore } from '@/entities/city';

export default defineNuxtPlugin(async () => {
  const cityStore = useCityStore();
  if (!cityStore.cities.length) {
    await cityStore.fetchCities();
  }
});
