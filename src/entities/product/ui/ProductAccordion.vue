<script setup lang="ts">
  import { useAccordion } from '@/shared/lib';

  const props = defineProps({
    title: { type: String },
  });
  const { toggle, isOpen } = useAccordion();
</script>

<template>
  <div :class="['border-b', 'border-[var(--border-color)]', 'p-[20px_0]']">
    <div :class="['pb-[10px]', 'cursor-pointer', 'flex', 'justify-between']" @click="toggle()">
      <div :class="['text-[20px]', 'font-[700]']">{{ title }}</div>
      <IconApp
        name="app:plus"
        :class="
          'h-[14px] w-[14px] transition-transform duration-[var(--transition-duration)] ' +
          `${isOpen() ? ' rotate-45' : ''}`
        "
      />
    </div>
    <transition name="accordion">
      <div v-show="isOpen()">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<style scoped></style>
