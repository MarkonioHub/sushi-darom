<script setup lang="ts">
  import { useClickOutside } from '@/shared/lib';
  import type { SelectOption } from '@/shared/model';

  interface Props {
    options: SelectOption[];
    placeholder?: string;
    error?: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    placeholder: 'Выберите опцию',
  });
  const modelValue = defineModel();
  const isOpen = ref(false);
  const select = ref(null);

  const selectOption = (option: SelectOption) => {
    modelValue.value = option.value;
    isOpen.value = false;
  };

  const toggle = () => {
    isOpen.value = !isOpen.value;
  };

  const selectedLabel = computed(() => {
    const selected = props.options.find((option) => option.value === modelValue.value);
    return selected ? selected.label : '';
  });

  useClickOutside(select, () => (isOpen.value = false));
</script>

<template>
  <div ref="select" :class="['relative']">
    <div
      :class="[
        props.error ? 'border-[var(--color-error)]' : 'border-[var(--border-color)]',
        'cursor-pointer',
        'flex',
        'items-center',
        'gap-[8px]',
        'border',
        'p-[12px]',
        'rounded-[8px]',
      ]"
      @click="toggle"
    >
      <div :class="['text-[16px]', 'grow']">{{ selectedLabel || props.placeholder }}</div>
      <IconApp name="app:select-arrow" class="h-[20px] w-[20px] shrink-0" />
    </div>
    <ul
      v-if="isOpen"
      :class="[
        'absolute',
        'top-[calc(100%-5px)]',
        'left-[2px]',
        'right-[2px]',
        'bg-[#fff]',
        'z-10',
        'rounded-[8px]',
        'shadow-[2px_2px_24px_10px_#66666614]',
        'flex',
        'flex-col',
        'overflow-y-auto',
        'max-h-[240px]',
      ]"
    >
      <li
        v-for="option in props.options"
        :key="option.value"
        @click="selectOption(option)"
        :class="[
          option.value === modelValue
            ? 'cursor-default bg-[var(--secondary-background)]'
            : 'cursor-pointer',
          'p-[10px]',
          'hover:bg-[var(--secondary-background)]',
          'transition-colors',
          'duration-[var(--transition-duration)]',
        ]"
      >
        {{ option.label }}
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
