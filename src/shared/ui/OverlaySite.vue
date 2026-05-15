<script setup lang="ts">
  import { useMobileMenuStore, useOverlayStore } from '@/shared/model';
  const overlayStore = useOverlayStore();
  const mobileMenuStore = useMobileMenuStore();

  function close() {
    mobileMenuStore.close();
    overlayStore.close();
  }
</script>

<template>
  <transition name="fade">
    <div
      v-show="overlayStore.visible"
      class="fixed inset-0 z-[999] cursor-pointer bg-[rgba(0,0,0,0.7)]"
      @click="close"
    ></div>
  </transition>
</template>

<style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.25s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  .fade-enter-to,
  .fade-leave-from {
    opacity: 1;
  }
</style>
