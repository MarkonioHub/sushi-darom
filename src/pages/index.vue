<script setup lang="ts">
  import { PromoSlider } from '@/widgets/promo-slider';
  import { CategoryNav } from '@/widgets/category-nav';
  import { ProductTile } from '@/widgets/product-tile';

  useSeoMeta({
    title: 'Заказать доставку роллов в Краснодаре',
    description: `Суши Даром в Краснодаре предлагает быструю и удобную доставку суши и роллов.`,
  });
</script>

<template>
  <PromoSlider />
  <CategoryNav />
  <ProductTile />
</template>

<style scoped></style>
