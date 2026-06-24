<script setup lang="ts">
  const props = defineProps({
    type: { type: String, required: true },
    name: { type: String, required: true },
    placeholder: { type: String, default: '' },
    required: { type: Boolean, default: false },
  });

  const model = defineModel();
</script>

<template>
  <input
    v-bind="$attrs"
    v-model="model"
    :type="props.type"
    :name="props.name"
    :placeholder="props.placeholder"
    :required="props.required"
    :class="[
      'text-[16px]',
      'border',
      'border-[var(--border-color)]',
      'p-[12px]',
      'rounded-[8px]',
      'placeholder:text-[var(--color-secondary)]',
    ]"
  />
</template>

<style scoped></style>
