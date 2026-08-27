<script setup lang="ts">
  import { fetchPromo } from '../model/api';

  const route = useRoute();

  const slug = computed(() => {
    return typeof route.query.promo === 'string' ? route.query.promo : '';
  });

  const { data: promo } = await useAsyncData(
    () => `promo-modal-${slug.value}`,
    () => fetchPromo(slug.value)
  );
</script>

<template>
  <div v-if="promo" :class="['flex', 'flex-col', 'max-h-[80vh]']">
    <NuxtImg :src="promo.imageHorizontal" />
    <div :class="['grow', 'overflow-y-auto', 'p-[15px]', 'lg:p-[30px]']">
      <div
        :class="[
          'mb-[10px]',
          'text-[14px]',
          'font-[600]',
          'leading-[20px]',
          'lg:mb-[20px]',
          'lg:text-[32px]',
          'lg:leading-[38px]',
        ]"
      >
        {{ promo.name }}
      </div>
      <div
        :class="[
          'text-[12px]',
          'leading-[16px]',
          'text-[var(--color-secondary)]',
          'lg:text-[16px]',
          'lg:leading-[18px]',
        ]"
        v-html="promo.content"
      ></div>
    </div>
  </div>
  <div v-else>Извините, акция не найдена</div>
</template>

<style scoped></style>
