<script setup lang="ts">
  import { PromoSlider } from '@/widgets/promo-slider';
  import { CategoryNav } from '@/widgets/category-nav';
  import { ProductTile } from '@/widgets/product-tile';
  import { productApi } from '@/entities/product';
  import { fetchPromos } from '@/entities/promo';

  useSeoMeta({
    title: 'Заказать доставку роллов в Краснодаре',
    description: `Суши Даром в Краснодаре предлагает быструю и удобную доставку суши и роллов.`,
  });

  const { data: products } = await useAsyncData('products', () => productApi.getAll());
  const { data: promos } = await useAsyncData('promos-slider', () => fetchPromos(10));
</script>

<template>
  <PromoSlider v-if="promos" :promos="promos" />
  <CategoryNav />
  <ProductTile v-if="products" :products="products" />
</template>

<style scoped></style>
