<script setup lang="ts">
  import { AdminCity } from '@/widgets/admin-city';

  definePageMeta({
    layout: 'admin',
  });
  useSeoMeta({
    title: 'Админка | Города',
  });
</script>

<template>
  <AdminCity />
</template>

<style scoped></style>
