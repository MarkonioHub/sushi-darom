<script setup lang="ts">
  import { ProductSearchTile } from '@/widgets/product-search-tile';
  import { searchProducts } from '@/entities/product';

  useSeoMeta({
    title: 'Суши Даром поиск',
  });

  const route = useRoute();
  const query = computed(() => {
    return typeof route.query.search === 'string' ? route.query.search : '';
  });

  const { data: products } = await useAsyncData(
    'search-products',
    () => searchProducts(query.value),
    {
      watch: [query],
    }
  );
</script>

<template>
  <ProductSearchTile v-if="products" :products="products" />
</template>

<style scoped></style>
