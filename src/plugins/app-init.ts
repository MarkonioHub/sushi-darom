import { useCityStore } from '@/entities/city';
import { useCategoryStore } from '@/entities/category';
import { useProductStore } from '@/entities/product';

export default defineNuxtPlugin(async () => {
  const cityStore = useCityStore();
  const categoryStore = useCategoryStore();
  const productStore = useProductStore();
  if (!cityStore.cities.length) {
    await cityStore.fetchCities();
    await categoryStore.fetchCategories();
    await productStore.fetchProducts();
  }
});
