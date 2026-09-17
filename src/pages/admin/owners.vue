<script setup lang="ts">
  import { AdminOwner } from '@/widgets/admin-owner';

  definePageMeta({
    layout: 'admin',
  });
  useSeoMeta({
    title: 'Админка | Предприниматели',
  });
</script>

<template>
  <AdminOwner />
</template>

<style scoped></style>
