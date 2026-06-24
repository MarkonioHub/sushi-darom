<script setup lang="ts">
  import { ButtonSite } from '@/shared/ui';

  const share = [
    { text: 'Яндекс Карты', style: ['text-[#fc3f1d]'] },
    { text: 'Google Maps', style: ['text-[#1A73E8]'] },
    { text: '2ГИС', style: ['text-[#11B979]'] },
  ];
</script>

<template>
  <div :class="['lg:p-[40px]', 'font-[600]', 'p-[20px]']">
    <h3 :class="['lg:text-[32px]', 'mb-[12px]', 'text-[20px]', 'pr-[30px]', 'lg:p-0']">
      Мы получили ваш отзыв
    </h3>
    <p
      :class="[
        'text-[var(--color-secondary)]',
        'text-[16px]',
        'leading-[20px]',
        'max-w-[408px]',
        'mb-[15px]',
      ]"
    >
      Спасибо за вашу обратную связь! Нам будет приятно, если вы поделитесь ею на любимой карте.
    </p>
    <div
      :class="[
        'border',
        'border-[var(--border-color)]',
        'p-[20px]',
        'rounded-[16px]',
        'bg-[#f8fafc]',
        'mb-[20px]',
      ]"
    >
      <h4 :class="['lg:text-[20px]', 'mb-[6px]', 'font-[600]', 'text-[16px]']">
        Выберите сервис для публикации
      </h4>
      <p :class="['text-[var(--color-secondary)]', 'mb-[10px]']">
        Мы автоматически откроем город и скопируем текст отзыва
      </p>
      <div :class="['grid', 'lg:grid-cols-2', 'gap-[12px]', 'grid-cols-1']">
        <div
          v-for="item in share"
          :key="item.text"
          :class="[
            'flex',
            'items-center',
            'gap-[10px]',
            'border',
            'border-[var(--border-color)]',
            'p-[6px_9px]',
            'rounded-[14px]',
            'hover:border-[var(--border-color-active)]',
            'transition-colors',
            'duration-[var(--transition-duration)]',
            'cursor-pointer',
          ]"
        >
          <div
            :class="[
              ...item.style,
              'flex',
              'items-center',
              'justify-center',
              'w-[48px]',
              'h-[48px]',
              'rounded-[12px]',
              'bg-[#f3f4f6]',
            ]"
          >
            <IconApp name="app:share-yandex" class="h-[32px] w-[32px]" />
          </div>
          <span :class="['font-[600]']">{{ item.text }}</span>
        </div>
      </div>
    </div>
    <ButtonSite :type="'link'" :to="'/'" :class="['w-[100%]']">На главную</ButtonSite>
  </div>
</template>

<style scoped></style>
