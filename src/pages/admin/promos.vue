<script setup lang="ts">
  import { AdminPromo } from '@/widgets/admin-promo';

  definePageMeta({
    layout: 'admin',
  });
  useSeoMeta({
    title: 'Админка | Акции',
  });
</script>

<template>
  <AdminPromo />
</template>

<style scoped></style>
