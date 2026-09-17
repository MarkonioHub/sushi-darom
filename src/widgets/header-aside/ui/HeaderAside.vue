<script setup lang="ts">
  import { useCityStore } from '@/entities/city';
  import { SelectCityModal } from '@/features/select-city-modal';
  import { useModalStore } from '@/shared/ui/modal-base';

  const modalStore = useModalStore();

  const cityStore = useCityStore();
  const { currentCity, cityCookie } = storeToRefs(cityStore);

  function openCityModal() {
    modalStore.open(SelectCityModal, 'middle');
  }
</script>

<template>
  <div>
    <ContainerSite>
      <div
        :class="[
          'flex',
          'flex-wrap',
          'items-center',
          'justify-between',
          'gap-[0_20px]',
          'py-[10px]',
          'lg:py-0',
          'xl:gap-[60px]',
        ]"
      >
        <div>
          <div
            @click="openCityModal"
            :class="[
              'cursor-pointer',
              'items-center',
              'gap-[8px]',
              'py-[10px]',
              'transition-colors',
              'duration-[var(--transition-duration)]',
              'hover:text-[var(--color-secondary)]',
              'flex',
            ]"
          >
            <IconApp name="app:location" :class="['text-[12px]']" />
            {{ currentCity?.name }}
            <IconApp
              name="app:select-arrow"
              :class="['h-[16px]', 'w-[16px]', 'shrink-0', 'ml-[-6px]']"
            />
          </div>
          <div
            v-if="!cityCookie"
            :class="[
              'absolute',
              'z-[21]',
              'bg-[#ffffff]',
              'shadow-[0px_-4px_16px_rgba(0,0,0,0.08)]',
              'p-[10px]',
            ]"
          >
            <div :class="['mb-[10px]']">Ваш город {{ currentCity?.name }}?</div>
            <ButtonSite
              :type="'button'"
              :size="'small'"
              @click="() => cityStore.setCityCookie(currentCity?.fiasId)"
            >
              Верно
            </ButtonSite>
            <ButtonSite
              @click="openCityModal"
              :type="'button'"
              :variant="'secondary'"
              :class="['ml-[10px]']"
              :size="'small'"
            >
              Нет, выбрать другой
            </ButtonSite>
          </div>
        </div>
        <div :class="['flex', 'cursor-pointer', 'items-center', 'gap-[8px]', 'lg:py-[10px]']">
          <IconApp name="app:map-pin" :class="['shrink-0', 'text-[17px]']" />
          <div :class="['shrink-0', 'font-semibold']">Самовывоз</div>
          <div :class="['text-[var(--color-secondary)]']">ул. Лизы Чайкиной, 2/1</div>
          <IconApp name="app:edit" :class="['h-[24px]', 'w-[17px]', 'shrink-0']" />
        </div>
        <div :class="['font-semibold', 'text-[var(--color-secondary)]']">
          Среднее время ожидания: 30 минут
        </div>
        <NuxtLink
          to="/review"
          :class="[
            'hidden',
            'items-center',
            'gap-[8px]',
            'transition-colors',
            'duration-[var(--transition-duration)]',
            'hover:text-[var(--color-secondary)]',
            'lg:flex',
            'lg:py-[10px]',
            'xl:ml-auto',
          ]"
        >
          <IconApp name="app:chat" :class="['text-[12px]']" />
          Оставить отзыв
        </NuxtLink>
        <a
          :href="`tel:${currentCity?.phone}`"
          :class="[
            'hidden',
            'items-center',
            'gap-[8px]',
            'transition-colors',
            'duration-[var(--transition-duration)]',
            'hover:text-[var(--color-secondary)]',
            'lg:flex',
            'lg:py-[10px]',
          ]"
        >
          <IconApp name="app:phone" :class="['text-[12px]']" />
          {{ currentCity?.phone }}
        </a>
      </div>
    </ContainerSite>
  </div>
</template>

<style scoped></style>
