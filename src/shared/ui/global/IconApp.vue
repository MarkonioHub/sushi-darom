<script setup lang="ts">
  interface Props {
    name: string;
  }
  defineProps<Props>();
</script>

<template>
  <Icon :name="name" />
</template>

<style scoped></style>
