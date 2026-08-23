<script setup lang="ts">
  import { AdminReview } from '@/widgets/admin-review';

  definePageMeta({
    layout: 'admin',
  });
  useSeoMeta({
    title: 'Админка | Отзывы',
  });
</script>

<template>
  <AdminReview />
</template>

<style scoped></style>
