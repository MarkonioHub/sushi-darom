<script setup lang="ts">
  import {
    YandexMap,
    YandexMapDefaultFeaturesLayer,
    YandexMapDefaultSchemeLayer,
    YandexMapMarker,
  } from 'vue-yandex-maps';

  const config = useRuntimeConfig();
</script>

<template>
  <div :class="['lg:h-[450px]', 'h-[400px]']">
    <ClientOnly>
      <YandexMap
        :apikey="config.public.yandexMapsApiKey"
        :settings="{
          location: {
            center: [38.975313, 45.03547],
            zoom: 13,
          },
        }"
      >
        <YandexMapDefaultSchemeLayer />
        <YandexMapDefaultFeaturesLayer />
        <YandexMapMarker
          :settings="{
            coordinates: [38.975313, 45.03547],
          }"
        >
          <div class="h-5 w-5 rounded-full bg-red-500" />
        </YandexMapMarker>
      </YandexMap>
    </ClientOnly>
  </div>
</template>

<style scoped></style>
