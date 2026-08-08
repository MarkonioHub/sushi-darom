<script setup lang="ts">
  import { AdminCategory } from '@/widgets/admin-category';

  definePageMeta({
    layout: 'admin',
  });
  useSeoMeta({
    title: 'Админка | Категории',
  });
</script>

<template>
  <AdminCategory />
</template>

<style scoped></style>
