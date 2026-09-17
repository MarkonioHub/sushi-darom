<script setup lang="ts">
  import { AdminRestaurants } from '@/widgets/admin-restaurants';

  definePageMeta({
    layout: 'admin',
  });
  useSeoMeta({
    title: 'Админка | Рестораны',
  });
</script>

<template>
  <AdminRestaurants />
</template>

<style scoped></style>
