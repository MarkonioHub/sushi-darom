<script setup lang="ts">
  const props = defineProps({
    name: { type: String, required: true },
    placeholder: { type: String, default: '' },
    required: { type: Boolean, default: false },
  });

  const model = defineModel<string>();
</script>

<template>
  <textarea
    v-bind="$attrs"
    v-model="model"
    :name="props.name"
    :placeholder="props.placeholder"
    :required="props.required"
    :class="[
      'block',
      'text-[16px]',
      'border',
      'border-[var(--border-color)]',
      'p-[12px]',
      'rounded-[8px]',
      'w-[100%]',
      'resize-none',
      'min-h-[104px]',
    ]"
  />
</template>

<style scoped></style>
