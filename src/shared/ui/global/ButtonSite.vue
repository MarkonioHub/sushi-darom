<script setup lang="ts">
  type ButtonVariant = 'primary' | 'secondary';

  type Props =
    | { type: 'link'; to: string; href?: never; variant?: ButtonVariant }
    | { type: 'external'; href: string; to?: never; variant?: ButtonVariant }
    | {
        type: 'button';
        variant?: ButtonVariant;
        buttonType?: 'submit' | 'button';
        disabled?: boolean;
        href?: never;
        to?: never;
      };

  const props = defineProps<Props>();

  const variant = props.variant || 'primary';
  const buttonType = props.type === 'button' ? props.buttonType || 'button' : undefined;

  const variantStyles: Record<ButtonVariant, string[]> = {
    primary: [
      'bg-[var(--color-orange)]',
      'text-[#ffffff]',
      'hover:bg-[var(--color-orange-hover)]',
      'transition-colors',
      'duration-[var(--transition-duration)]',
    ],
    secondary: [''],
  };

  const className = computed(() => [
    ...variantStyles[variant],
    'text-[16px]',
    'no-underline',
    'rounded-[8px]',
    'p-[12px_32px]',
    'inline-flex',
    'justify-center',
    'font-[600]',
  ]);
</script>

<template>
  <a v-if="props.type === 'external'" :href="props.href" :class="className">
    <slot></slot>
  </a>

  <NuxtLink v-else-if="props.type === 'link'" :to="props.to" :class="className">
    <slot></slot>
  </NuxtLink>

  <button v-else :disabled="props.disabled" :type="buttonType" :class="className">
    <slot></slot>
  </button>
</template>

<style scoped></style>
