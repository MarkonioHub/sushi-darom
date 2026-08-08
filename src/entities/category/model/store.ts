import type { Category } from './types';
import { categoryApi } from './api';

export const useCategoryStore = defineStore('categories', () => {
  const categories = ref<Category[]>([]);

  async function fetchCategories() {
    categories.value = await categoryApi.getAll();
  }

  return {
    categories,
    fetchCategories,
  };
});
