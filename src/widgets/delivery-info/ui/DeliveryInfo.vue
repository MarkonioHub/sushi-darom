<script setup lang="ts">
  import { CONTACTS } from '@/shared/const';
  import { MapDelivery } from '@/shared/ui';

  const pickupList = [
    {
      title: 'Краснодар, ул. Лизы Чайкиной, 2/1',
      time: 'пн-вс: 10:00 - 21:45',
      info_1: 'ИП Бабаева Лариса Бейтуллаевна',
      info_2: 'ИНН 230300697524',
      info_3: 'ОГРН 318237500371822',
    },
    {
      title: 'Краснодар, п. Российский, ул. им. Комарова В.М., 34',
      time: 'пн-вс: 10:00 - 21:45',
      info_1: 'ИП Бабаева Лариса Бейтуллаевна',
      info_2: 'ИНН 230300697524',
      info_3: 'ОГРН 318237500371822',
    },
    {
      title: 'Краснодар, ул. 1-заречная, 33',
      time: 'пн-вс: 10:00 - 21:45',
      info_1: 'ИП Бабаева Лариса Бейтуллаевна',
      info_2: 'ИНН 230300697524',
      info_3: 'ОГРН 318237500371822',
    },
    {
      title: 'Краснодар, ул. Котлярова, 21',
      time: 'пн-вс: 10:00 - 21:45',
      info_1: 'ИП Пак Игорь Вячеславович',
      info_2: 'ИНН 233613379170',
      info_3: 'ОГРН 320237500113072',
    },
    {
      title: 'Краснодар, ул. Карасунская, 98/1',
      time: 'пн-вс: 10:00 - 21:45',
      info_1: 'ИП Пак Игорь Вячеславович',
      info_2: 'ИНН 233613379170',
      info_3: 'ОГРН 320237500113072',
    },
  ];
</script>

<template>
  <div :class="['lg:mb-[80px]', 'mb-[40px]']">
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
          <a :href="`tel:${CONTACTS.phone}`" :class="['text-[20px]']">{{ CONTACTS.phone }}</a>
          <IconApp name="app:phone" class-name="w-[20px] h-[20px]" />
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
          v-for="(item, index) in pickupList"
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
            <IconApp name="app:map-pin" class-name="w-[17px] h-[17px]" />
          </div>
          <div>
            <div :class="['text-[16px]', 'mb-[4px]']">{{ item.title }}</div>
            <div>{{ item.time }}</div>
            <div :class="['text-[var(--color-secondary)]']">{{ item.info_1 }}</div>
            <div>
              <span :class="['text-[var(--color-secondary)]']">{{ item.info_2 }}</span>
              <span :class="['text-[var(--color-secondary)]']">{{ item.info_2 }}</span>
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
  </div>
</template>

<style scoped></style>
