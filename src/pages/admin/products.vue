<script setup lang="ts">
  import { AdminProduct } from '@/widgets/admin-product';

  definePageMeta({
    layout: 'admin',
  });
  useSeoMeta({
    title: 'Админка | Продукты',
  });
</script>

<template>
  <AdminProduct />
</template>

<style scoped></style>
