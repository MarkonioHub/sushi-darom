<script setup lang="ts">
  import { useModalStore } from '@/shared/model/modalStore';
  const modalStore = useModalStore();

  onMounted(() => {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        modalStore.close();
      }
    });
  });
</script>

<template>
  <Transition name="fade">
    <div
      v-if="modalStore.isOpen"
      :class="
        modalStore.className +
        ' fixed bottom-[50px] left-[50%] top-[50px] z-[1001] w-[100%] translate-x-[-50%] overflow-hidden rounded-[16px] bg-[#ffffff] lg:bottom-[100px] lg:top-[100px]'
      "
    >
      <button
        @click="modalStore.close"
        class="absolute right-[20px] top-[20px] z-[1] flex h-[25px] w-[25px] items-center justify-center rounded-[50%] bg-[#ffffff]"
      >
        <IconApp name="app:plus" class-name="w-[18px] h-[18px] rotate-45" />
      </button>
      <component :is="modalStore.component" class="h-[100%] overflow-y-auto" />
    </div>
  </Transition>
</template>

<style scoped></style>
