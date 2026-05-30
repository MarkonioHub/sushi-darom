<script setup lang="ts">
  import { useModalStore } from '@/shared/model';
  const modalStore = useModalStore();

  const onKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      modalStore.close();
    }
  };

  onMounted(() => {
    window.addEventListener('keydown', onKeydown);
  });

  onUnmounted(() => {
    window.removeEventListener('keydown', onKeydown);
  });

  const modalWidths: Record<string, string> = {
    promo: 'max-w-[744px]',
  };

  const className = computed(() => [
    modalWidths[modalStore.size],
    'fixed',
    'bottom-[0]',
    'lg:left-[50%]',
    'top-[50px]',
    'z-[1001]',
    'w-[100%]',
    'lg:translate-x-[-50%]',
    'left-0',
    'right-0',
    'overflow-hidden',
    'rounded-[16px_16px_0_0]',
    'bg-[#ffffff]',
    'lg:bottom-[70px]',
    'lg:top-[70px]',
    'lg:rounded-[16px]',
  ]);
</script>

<template>
  <Transition name="fade">
    <div v-if="modalStore.isOpen" :class="className">
      <button
        @click="modalStore.close"
        :class="[
          'absolute',
          'right-[20px]',
          'top-[20px]',
          'z-[1]',
          'flex',
          'h-[25px]',
          'w-[25px]',
          'items-center',
          'justify-center',
          'rounded-[50%]',
          'bg-[#ffffff]',
        ]"
      >
        <IconApp name="app:plus" class-name="w-[18px] h-[18px] rotate-45" />
      </button>
      <component :is="modalStore.component" class="h-[100%] overflow-y-auto" />
    </div>
  </Transition>
</template>

<style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity var(--transition-duration) ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  .fade-enter-to,
  .fade-leave-from {
    opacity: 1;
  }
  @media (max-width: 1024px) {
    .fade-enter-active,
    .fade-leave-active {
      transition:
        opacity,
        transform var(--transition-duration) ease;
    }
    .fade-enter-from,
    .fade-leave-to {
      transform: translateY(100%);
      opacity: 0;
    }
    .fade-enter-to,
    .fade-leave-from {
      transform: translateY(0);
      opacity: 1;
    }
  }
</style>
