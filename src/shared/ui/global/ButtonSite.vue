<script setup lang="ts">
  type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
  type ButtonSize = 'normal' | 'small';

  type Props =
    | { type: 'link'; to: string; href?: never; variant?: ButtonVariant; size?: ButtonSize }
    | { type: 'external'; href: string; to?: never; variant?: ButtonVariant; size?: ButtonSize }
    | {
        type: 'button';
        variant?: ButtonVariant;
        size?: ButtonSize;
        buttonType?: 'submit' | 'button';
        disabled?: boolean;
        href?: never;
        to?: never;
      };

  const props = defineProps<Props>();

  const variant = props.variant || 'primary';
  const size = props.size || 'normal';
  const buttonType = props.type === 'button' ? props.buttonType || 'button' : undefined;

  const variantStyles: Record<ButtonVariant, string[]> = {
    primary: [
      'bg-[var(--color-orange)]',
      'text-[#ffffff]',
      'hover:bg-[var(--color-orange-hover)]',
      'transition-colors',
      'duration-[var(--transition-duration)]',
    ],
    secondary: [
      'border',
      'border-[var(--color-primary)]',
      'bg-[#ffffff]',
      'hover:text-[var(--color-secondary)]',
      'transition-colors',
      'duration-[var(--transition-duration)]',
    ],
    tertiary: [
      'border',
      'border-[var(--color-orange)]',
      'text-[var(--color-orange)]',
      'bg-[#ffffff]',
      'hover:text-[var(--color-orange-hover)]',
      'hover:border-[var(--color-orange-hover)]',
      'transition-colors',
      'duration-[var(--transition-duration)]',
    ],
  };

  const sizeStyles: Record<ButtonSize, string[]> = {
    normal: ['text-[16px]', 'p-[12px_32px]'],
    small: ['text-[13px]', 'p-[10px_18px]'],
  };

  const className = computed(() => [
    ...variantStyles[variant],
    ...sizeStyles[size],
    'no-underline',
    'rounded-[8px]',
    'inline-flex',
    'justify-center',
    'font-[600]',
    'disabled:opacity-50',
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
    <svg
      v-if="props.disabled"
      class="h-5 w-5 animate-spin text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
    <slot v-else></slot>
  </button>
</template>

<style scoped></style>
