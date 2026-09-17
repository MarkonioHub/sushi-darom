<script setup lang="ts">
  import { MapDelivery } from '@/shared/ui/map-delivery';
  import { useCityStore } from '@/entities/city';
  import { getRestaurantsByCityId } from '@/entities/restaurant';

  const cityStore = useCityStore();
  const { currentCity } = storeToRefs(cityStore);

  const { data: restaurants } = await useAsyncData(
    'delivery-info',
    () => getRestaurantsByCityId(currentCity.value?.id || ''),
    {
      watch: [currentCity],
    }
  );
</script>

<template>
  <section :class="['lg:mb-[80px]', 'mb-[40px]']">
    <ContainerSite>
      <h1 :class="['lg:text-[32px]', 'font-[600]', 'mb-[16px]', 'text-[24px]', 'mb-[8px]']">
        Доставка и самовывоз
      </h1>
      <div
        :class="[
          'max-w-[480px]',
          'bg-[#f5f5f5]',
          'rounded-[16px]',
          'p-[16px_24px_20px]',
          'lg:mb-[40px]',
          'mb-[20px]',
        ]"
      >
        <div>Телефон</div>
        <div :class="['flex', 'items-center', 'justify-between']">
          <a :href="`tel:${currentCity?.phone}`" :class="['text-[20px]']">
            {{ currentCity?.phone }}
          </a>
          <IconApp name="app:phone" class="h-[20px] w-[20px]" />
        </div>
      </div>
      <h2 :class="['lg:text-[32px]', 'font-[600]', 'mb-[16px]', 'text-[24px]', 'mb-[8px]']">
        Самовывоз
      </h2>
      <ul
        :class="[
          'lg:gap-[20px_40px]',
          'gap-[16px_20px]',
          'flex-wrap',
          'flex',
          'lg:mb-[40px]',
          'mb-[20px]',
        ]"
      >
        <li
          v-for="(restaurant, index) in restaurants"
          :key="index"
          :class="['flex', 'items-center', 'gap-[10px]', 'xl:w-[30%]', 'w-[100%]', 'md:w-[40%]']"
        >
          <div
            :class="[
              'shrink-0',
              'w-[40px]',
              'h-[40px]',
              'rounded-[50%]',
              'flex',
              'items-center',
              'justify-center',
              'border',
              'border-[#dfe0e5]',
            ]"
          >
            <IconApp name="app:map-pin" class="h-[17px] w-[17px]" />
          </div>
          <div>
            <div :class="['text-[16px]', 'mb-[4px]']">{{ restaurant.address }}</div>
            <div>пн-вс: {{ restaurant.openingTime }} - {{ restaurant.closingTime }}</div>
            <div :class="['text-[var(--color-secondary)]']">{{ restaurant.owner.name }}</div>
            <div>
              <span :class="['text-[var(--color-secondary)]']">{{ restaurant.owner.inn }}</span>
              <span :class="['text-[var(--color-secondary)]']">{{ restaurant.owner.ogrn }}</span>
            </div>
          </div>
        </li>
      </ul>
      <h2 :class="['lg:text-[32px]', 'font-[600]', 'lg:mb-[16px]', 'text-[24px]', 'mb-[8px]']">
        Доставка
      </h2>
      <div :class="['lg:mb-[40px]', 'mb-[20px]']">
        Сумма заказа для бесплатной доставки - 1100 рублей.
        <br />
        Доставка осуществляется от 600 рублей, за заказы от 600 рублей до 1100 рублей - добавляется
        99 рублей за доставку.
        <br />
        <b>
          В вечерние часы среднее время доставки может быть увеличено, в зависимости от зоны
          доставки.
        </b>
        <br />
        Отдельные районы - нажмите на область на карте ниже.
        <br />
      </div>
      <MapDelivery />
    </ContainerSite>
  </section>
</template>

<style scoped></style>
