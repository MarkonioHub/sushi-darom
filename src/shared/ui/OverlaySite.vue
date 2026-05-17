<script setup lang="ts">
  import { useMobileMenuStore, useModalStore, useOverlayStore } from '@/shared/model';
  const overlayStore = useOverlayStore();
  const mobileMenuStore = useMobileMenuStore();
  const modalStore = useModalStore();

  function close() {
    mobileMenuStore.close();
    overlayStore.close();
    modalStore.close();
  }
</script>

<template>
  <transition name="fade">
    <div
      v-show="overlayStore.visible"
      class="fixed inset-0 z-[999] cursor-pointer bg-[rgba(19,23,27,0.4)]"
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
