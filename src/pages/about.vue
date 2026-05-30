<script setup lang="ts">
  import { BreadCrumbs } from '@/shared/ui';
  import { AboutInfo } from '@/widgets/about-info';

  useSeoMeta({
    title: 'Информация о сервисе доставки японской кухни Суши Даром в Краснодаре',
    description: `Суши Даром в Краснодаре предлагает быструю и удобную доставку суши и роллов.
    Закажите вкусные блюда японской кухни дешево и наслаждайтесь качеством без лишних затрат.
    Узнайте больше и сделайте заказ прямо сейчас!`,
  });

  definePageMeta({
    breadcrumb: 'О нас',
  });
</script>

<template>
  <BreadCrumbs />
  <AboutInfo />
</template>

<style scoped></style>
