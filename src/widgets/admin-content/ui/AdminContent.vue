<script setup lang="ts">
  import { ButtonSite, TitleSite } from '@/shared/ui';
  import { AdminCityForm } from '@/features/admin-city-form';
  import { useModalStore } from '@/shared/model';
  import { useCityStore } from '@/entities/city';
  const modalStore = useModalStore();
  const cityStore = useCityStore();
</script>

<template>
  <div>
    <ContainerSite>
      <TitleSite>Города</TitleSite>
      <ul :class="['mb-[20px]', 'flex', 'flex-wrap', 'gap-[20px]']">
        <li
          v-for="city in cityStore.cities"
          :key="city.id"
          :class="['border', 'border-[var(--color-orange)]', 'p-[20px]']"
        >
          <div v-for="(value, key) in city" :key="value">{{ key }} : {{ value }}</div>
        </li>
      </ul>
      <ButtonSite :type="'button'" @click="modalStore.open(AdminCityForm, 'small')">
        Добавить город
      </ButtonSite>
    </ContainerSite>
  </div>
</template>

<style scoped></style>
