<script setup lang="ts">
  import { CounterBasket } from '@/shared/ui/';
</script>

<template>
  <div :class="['flex', 'flex-col', 'group']">
    <NuxtLink
      to="#"
      :class="['relative', 'overflow-hidden', 'aspect-square', 'mb-[24px]', 'rounded-[16px]']"
    >
      <NuxtImg
        src="/examples/set.png"
        :class="['group-hover:scale-[1.06]', 'transition-transform', 'duration-[0.4s]']"
      />
      <div :class="['absolute', 'left-[16px]', 'top-[16px]', 'flex', 'flex-wrap', 'gap-[5px]']">
        <div
          :class="['p-[4px_8px]', 'rounded-[20px]', 'text-[12px]', 'leading-[100%]', 'font-[600]']"
          style="background: rgb(255, 25, 25); color: rgb(255, 255, 255)"
        >
          -50%
        </div>
      </div>
    </NuxtLink>
    <div
      :class="[
        'flex',
        'flex-col',
        'grow',
        'group-hover:translate-y-[-5px]',
        'transition-transform',
        'duration-[0.4s]',
        'transform-gpu',
        'will-change-transform',
      ]"
    >
      <NuxtLink to="#" :class="['text-[24px]', 'font-[600]', 'mb-[8px]']">Сет Сетотерапия</NuxtLink>
      <div :class="['text-[var(--color-secondary)]', 'text-[16px]', 'leading-[20px]', 'mb-[20px]']">
        Роллы: Тоямо, Красный краб. Запечённые: Ламанш, Сырный дуэт. Жареные: Далматин, ЧикенГо,
        Макки-Такки
      </div>
      <div class="mt-auto flex items-center justify-between">
        <div>
          <div class="flex items-center">
            <div :class="['text-[24px]', 'font-[600]', 'leading-[30px]']">1 299 ₽</div>
            <div
              :class="[
                'ml-[10px]',
                'opacity-[0.5]',
                'before:bg-[#ef2525]',
                'before:absolute',
                'before:h-[1px]',
                'before:w-[100%]',
                'before:top-[50%]',
                'relative',
                'self-end',
              ]"
            >
              2 598 ₽
            </div>
          </div>
          <div class="text-[var(--color-secondary)]">56 шт/ 1740 гр</div>
        </div>
        <CounterBasket />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
