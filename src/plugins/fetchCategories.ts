import { useCategoryStore } from '@/entities/category';

export default defineNuxtPlugin(async () => {
  const categoryStore = useCategoryStore();
  if (!categoryStore.categories.length) {
    await categoryStore.fetchCategories();
  }
});
