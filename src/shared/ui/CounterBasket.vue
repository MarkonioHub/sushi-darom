<script setup lang="ts"></script>

<template>
  <div :class="['inline-flex', 'items-center']">
    <button
      :class="[
        'text-[16px]',
        'font-[600]',
        'leading-[100%]',
        'border',
        'border-solid',
        'border-[#191c23]',
        'rounded-[8px]',
        'p-[10px_18px]',
        'hover:bg-[var(--tertiary-background)]',
        'transition-colors',
      ]"
    >
      В корзину
    </button>
    <div class="flex hidden items-center gap-[5px]">
      <button
        :class="['flex', 'h-[40px]', 'w-[40px]', 'shrink-0', 'items-center', 'justify-center']"
      >
        <IconApp name="app:minus" class-name="w-[14px] h-[2px]" />
      </button>
      <div class="flex w-[14px] shrink-0 items-center justify-center text-[16px]">1</div>
      <button class="h-[40px] w-[40px] shrink-0 translate-y-[2px]">
        <IconApp name="app:plus" class-name="w-[14px] h-[14px]" />
      </button>
    </div>
  </div>
</template>

<style scoped></style>
