import { useCityStore } from '@/entities/city';
import { useCategoryStore } from '@/entities/category';

export default defineNuxtPlugin(async () => {
  const cityStore = useCityStore();
  const categoriesStore = useCategoryStore();
  if (!cityStore.cities.length) {
    await cityStore.fetchCities();
    await categoriesStore.fetchCategories();
  }
});
