<script setup lang="ts">
  import { BreadCrumbs } from '@/shared/ui';
  import { DeliveryInfo } from '@/widgets/delivery-info';

  useSeoMeta({
    title: 'Доставка и самовывоз Суши Даром в Краснодаре',
    description: 'Информация о доставке и самовывозе Суши Даром в Краснодаре',
  });

  definePageMeta({
    breadcrumb: 'Доставка и самовывоз',
  });
</script>

<template>
  <BreadCrumbs />
  <DeliveryInfo />
</template>

<style scoped></style>
