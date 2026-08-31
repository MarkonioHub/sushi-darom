<script setup lang="ts">
  interface Props {
    ariaLabel?: string;
    disabled?: boolean;
  }
  const { ariaLabel, disabled } = defineProps<Props>();
  const model = defineModel<boolean>();

  function toggle() {
    model.value = !model.value;
  }
</script>

<template>
  <button
    :class="[
      'group',
      'w-[44px]',
      'h-[24px]',
      'bg-[rgba(0,0,0,.15)]',
      'rounded-[12px]',
      'cursor-pointer',
      'relative',
      'disabled:cursor-not-allowed',
      'disabled:opacity-[0.5]',
      model ? 'bg-[var(--color-orange)]' : '',
    ]"
    @click="toggle"
    type="button"
    role="switch"
    :aria-checked="model"
    :aria-label="ariaLabel"
    :disabled="disabled"
  >
    <span
      :class="[
        'absolute',
        'top-[2px]',
        'left-[2px]',
        'w-[20px]',
        'h-[20px]',
        'bg-[#ffffff]',
        'rounded-[50%]',
        'shadow-[0_1px_3px_rgba(0,0,0,.15)]',
        'transition-transform',
        'duration-[var(--transition-duration)]',
        model ? 'translate-x-[20px]' : '',
      ]"
    ></span>
  </button>
</template>

<style scoped></style>
