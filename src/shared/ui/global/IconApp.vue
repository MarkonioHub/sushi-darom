<script setup lang="ts">
  interface Props {
    name: string;
    className?: string;
  }
  defineProps<Props>();
</script>

<template>
  <Icon :name="name" :class="className" />
</template>

<style scoped></style>
