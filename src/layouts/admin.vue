<script setup lang="ts">
  import { ModalBase, OverlaySite } from '@/shared/ui';
  import { AdminHeader } from '@/widgets/admin-header';
</script>

<template>
  <AdminHeader />
  <div class="admin">
    <slot />
  </div>
  <OverlaySite />
  <ModalBase />
</template>

<style scoped></style>
