<script setup lang="ts">
  import { InputSite } from '@/shared/ui/input-site';

  const city = ref<string>('');
</script>

<template>
  <div>
    <TitleSite :variant="'secondary'" :class="['mb-[20px]']">Выберите город доставки</TitleSite>
    <InputSite
      :name="'city'"
      v-model="city"
      :type="'text'"
      :placeholder="'Поиск'"
      data-maska="+7 (###) ###-##-##"
      :class="['w-[100%]']"
    />
    <ul>
      <li>
        <button>Краснодар</button>
      </li>
      <li>
        <button>Сочи</button>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
