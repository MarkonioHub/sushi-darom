<script setup lang="ts">
  import { PromoSlider } from '@/widgets/promo-slider';
  import { CategoryNav } from '@/widgets/category-nav';
  import { ProductTile } from '@/widgets/product-tile';
  import { productApi } from '@/entities/product';

  useSeoMeta({
    title: 'Заказать доставку роллов в Краснодаре',
    description: `Суши Даром в Краснодаре предлагает быструю и удобную доставку суши и роллов.`,
  });

  const { data: products } = await useAsyncData('products', () => productApi.getAll());
</script>

<template>
  <PromoSlider />
  <CategoryNav />
  <ProductTile v-if="products" :products="products" />
</template>

<style scoped></style>
