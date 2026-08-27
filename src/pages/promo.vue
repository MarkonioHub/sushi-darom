<script setup lang="ts">
  import { PromoTile } from '@/widgets/promo-tile';
  import { BreadCrumbs } from '@/shared/ui/bread-crumbs';
  import { fetchPromos } from '@/entities/promo';

  useSeoMeta({
    title: 'Акции Суши Даром в Краснодаре',
    description: 'Не упустите выгодные акции от Суши Даром в Краснодаре.',
  });

  definePageMeta({
    breadcrumb: 'Акции',
  });

  const { data: promos } = useAsyncData('promos', () => fetchPromos());
</script>

<template>
  <BreadCrumbs />
  <PromoTile v-if="promos" :promos="promos" />
</template>

<style scoped></style>
