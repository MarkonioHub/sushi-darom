<script setup lang="ts">
  import { BreadCrumbs } from '@/shared/ui/bread-crumbs';
  import { ProductCard } from '@/entities/product/ui';
  import { productApi } from '@/entities/product';

  const route = useRoute();
  const slug = route.params.slug;

  const {
    data: product,
    error,
    pending,
  } = await useAsyncData(`product-${slug}`, () =>
    productApi.getBySlug(typeof slug === 'string' ? slug : '')
  );

  useSeoMeta({
    title: product.value
      ? `Заказать ${product.value.name}`
      : 'Заказать доставку роллов в Краснодаре',
  });

  definePageMeta({
    breadcrumb: 'product',
  });
</script>

<template>
  <BreadCrumbs :name="product ? product.name : ''" />
  <ProductCard v-if="product" :product="product" />
  <div v-else-if="error">
    <TitleSite>Извините, выбранный продукт не найден</TitleSite>
    <ButtonSite :type="'link'" :to="'/'">На главную</ButtonSite>
  </div>
  <div v-else-if="pending">
    <TitleSite>Загрузка...</TitleSite>
  </div>
</template>

<style scoped></style>
