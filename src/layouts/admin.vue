<script setup lang="ts">
  import { ModalBase } from '@/shared/ui/modal-base';
  import { OverlaySite } from '@/shared/ui/overlay-site';
  import { AdminHeader } from '@/widgets/admin-header';
</script>

<template>
  <AdminHeader />
  <div :class="['overflow-x-auto']">
    <slot />
  </div>
  <OverlaySite />
  <ModalBase />
</template>

<style scoped></style>
