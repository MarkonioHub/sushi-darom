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
    middle: 'max-w-[744px]',
    small: 'max-w-[620px]',
  };

  const className = computed(() => [
    'fixed',
    'left-[0]',
    'top-[0]',
    'z-[1001]',
    'w-[100%]',
    'h-[100%]',
    'flex',
    'lg:items-center',
    'items-end',
    'justify-center',
    'overflow-hidden',
    'pointer-events-none',
  ]);
</script>

<template>
  <Transition name="fade">
    <div v-if="modalStore.isOpen" :class="className">
      <div
        :class="[
          modalWidths[modalStore.size],
          'rounded-[16px_16px_0_0]',
          'bg-[#ffffff]',
          'lg:rounded-[16px]',
          'relative',
          'w-[100%]',
          'max-h-[80vh]',
          'overflow-y-auto',
          'pointer-events-auto',
        ]"
      >
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
          <IconApp name="app:plus" class="h-[18px] w-[18px] rotate-45" />
        </button>
        <component :is="modalStore.component" :class="['max-h-[80vh]']" />
      </div>
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
