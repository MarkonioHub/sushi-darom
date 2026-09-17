<script setup lang="ts">
  import { InputSite } from '@/shared/ui/input-site';
  import { useCityStore, type City } from '@/entities/city';
  import { useModalStore } from '@/shared/ui/modal-base';

  const cityStore = useCityStore();
  const modalStore = useModalStore();
  const { cities } = storeToRefs(cityStore);

  const citySearchString = ref<string>('');

  function setCity(city: City) {
    cityStore.setCurrentCity(city);
    cityStore.setCityCookie(city.fiasId);
    modalStore.close();
  }

  const citiesSearchResult = computed(() => {
    const citySearchStringFormat = citySearchString.value.trim().toLowerCase();
    if (citySearchStringFormat) {
      return cities.value.filter((city: City) =>
        city.name.toLowerCase().includes(citySearchStringFormat)
      );
    } else {
      return cities.value;
    }
  });
</script>

<template>
  <div :class="['p-[40px]', 'flex', 'flex-col', 'h-[80vh]']">
    <TitleSite :variant="'secondary'" :class="['mb-[20px]']">Выберите город доставки</TitleSite>
    <InputSite
      :name="'city'"
      v-model="citySearchString"
      :type="'text'"
      :placeholder="'Поиск'"
      data-maska="+7 (###) ###-##-##"
      :class="['w-[100%]', 'mb-[20px]']"
    />
    <ul
      v-if="citiesSearchResult"
      :class="['flex', 'flex-col', 'gap-[5px]', 'grow', 'overflow-y-auto']"
    >
      <li v-for="city in citiesSearchResult" :key="city.id">
        <button
          @click="() => setCity(city)"
          :class="[
            'text-[20px]',
            'font-[500]',
            'hover:text-[var(--color-secondary)]',
            'transition-colors',
            'duration-[var(--transition-duration)]',
          ]"
        >
          {{ city.name }}
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
