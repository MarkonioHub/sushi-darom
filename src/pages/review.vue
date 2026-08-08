<script setup lang="ts">
  import { BreadCrumbs } from '@/shared/ui/bread-crumbs';
  import { ReviewSection } from '@/widgets/review-section';

  useSeoMeta({
    title: 'Оставить отзыв Суши Даром в Краснодаре',
    description: `Оставьте свой отзыв о доставке «Суши Даром» в Краснодаре. Поделитесь мнением
    о качестве роллов, сервисе и скорости доставки. Нам важен каждый отзыв!`,
  });

  definePageMeta({
    breadcrumb: 'Оставить отзыв',
  });
</script>

<template>
  <BreadCrumbs />
  <ReviewSection />
</template>

<style scoped></style>
