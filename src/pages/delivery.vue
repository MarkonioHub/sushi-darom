<script setup lang="ts">
  import { BreadCrumbs } from '@/shared/ui';
  import { DeliveryInfo } from '@/widgets/delivery-info';

  useSeoMeta({
    title: 'Доставка и самовывоз Roll House в Краснодаре',
    description: 'Информация о доставке и самовывозе Roll House в Краснодаре',
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
