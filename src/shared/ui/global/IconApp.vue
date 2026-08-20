<script setup lang="ts">
  interface Props {
    name: string;
  }
  defineProps<Props>();
</script>

<template>
  <Icon :name="name" v-bind="$attrs" />
</template>

<style scoped></style>
