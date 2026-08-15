import { useCityStore } from '@/entities/city';
import { useCategoryStore } from '@/entities/category';

export default defineNuxtPlugin(async () => {
  const cityStore = useCityStore();
  const categoryStore = useCategoryStore();
  if (!cityStore.cities.length) {
    await cityStore.fetchCities();
    await categoryStore.fetchCategories();
  }
});
