<script setup lang="ts">
  import { useCityStore } from '@/entities/city';

  const cityStore = useCityStore();
  const { currentCity } = storeToRefs(cityStore);
</script>

<template>
  <div
    :class="[
      'border-t',
      'border-solid',
      'border-[var(--border-color)]',
      'bg-[var(--primary-background)]',
      'py-[20px]',
    ]"
  >
    <div :class="['text-center', 'leading-[20px]', 'opacity-[0.5]']">
      {{ new Date().getFullYear() }} ©
    </div>
    <div :class="['text-center', 'leading-[20px]', 'opacity-[0.5]']" v-if="currentCity">
      Адрес регистрации: г. {{ currentCity.name }}
    </div>
  </div>
</template>

<style scoped></style>
