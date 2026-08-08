<script setup lang="ts">
  type variant = 'primary' | 'secondary';
  interface Props {
    tag?: string;
    variant?: variant;
  }

  const props = withDefaults(defineProps<Props>(), {
    tag: 'div',
    variant: 'primary',
  });

  const variantStyle: Record<variant, string[]> = {
    primary: ['lg:text-[40px]', 'text-[32px]'],
    secondary: ['lg:text-[32px]', 'text-[24px]'],
  };

  const className = computed(() => [...variantStyle[props.variant], 'mb-[10px]', 'font-[600]']);
</script>

<template>
  <component :is="tag" :class="className"><slot /></component>
</template>

<style scoped></style>
