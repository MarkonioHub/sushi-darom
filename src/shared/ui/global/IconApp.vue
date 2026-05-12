<script setup lang="ts">
interface Props {
  name: string;
  className?: string;
}
withDefaults(defineProps<Props>(), {
  className: 'text-[20px]',
});
</script>

<template>
  <Icon :name="name" :class="className"/>
</template>

<style scoped></style>
