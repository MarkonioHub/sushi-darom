<script setup lang="ts">
  import { PromoTile } from '@/widgets/promo-tile';
  import { BreadCrumbs } from '@/shared/ui';

  useSeoMeta({
    title: 'Акции Roll House в Краснодаре',
    description: 'Не упустите выгодные акции от Roll House в Краснодаре.',
  });

  definePageMeta({
    breadcrumb: 'Акции',
  });
</script>

<template>
  <BreadCrumbs />
  <PromoTile />
</template>

<style scoped></style>
