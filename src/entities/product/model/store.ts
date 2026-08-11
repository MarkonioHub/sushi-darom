import type { Product } from './types';
import { productApi } from './api';

export const useProductStore = defineStore('products', () => {
  const products = ref<Product[]>([]);

  async function fetchProducts() {
    products.value = await productApi.getAll();
  }

  return {
    products,
    fetchProducts,
  };
});
