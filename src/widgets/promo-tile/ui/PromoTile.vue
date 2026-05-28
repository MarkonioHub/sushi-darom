<script setup lang="ts">
  import { usePromoModal } from '@/entities/promo';

  const { pushQuery } = usePromoModal();
</script>

<template>
  <div class="[mb-[80px]]">
    <ContainerSite>
      <h1 :class="['lg:text-[40px]', 'font-[600]', 'mb-[30px]', 'text-[30px]']">Акции</h1>
      <div :class="['flex', 'flex-wrap', 'sm:gap-[20px]', 'gap-[10px]']">
        <div
          @click="pushQuery('1')"
          :class="[
            'cursor-pointer',
            'rounded-[8px]',
            'lg:rounded-[16px]',
            'xl:w-[calc(25%-15px)]',
            'w-[calc(50%-5px)]',
            'sm:w-[calc(33.33%-14px)]',
            'lg:w-[calc(33.33%-14px)]',
            'border',
            'border-solid',
            'border-[transparent]',
            'hover:border-[#000]',
            'transition-all',
            'duration-[var(--transition-duration)]',
          ]"
          v-for="(item, index) in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]"
          :key="index"
        >
          <NuxtImg
            src="/examples/promo-vertical.png"
            :class="['lg:rounded-[16px_16px_0_0]', 'rounded-[8px_8px_0_0]']"
          />
          <div
            :class="[
              'bg-[#ffffff]',
              'lg:rounded-[16px]',
              'translate-y-[-10px]',
              'lg:translate-y-[-20px]',
              'lg:p-[10px]',
              'p-[6px]',
              'rounded-[8px]',
            ]"
          >
            <div
              :class="[
                'text-[13px]',
                'leading-[20px]',
                'lg:text-[20px]',
                'lg:leading-[24px]',
                'font-[600]',
                'text-ellipsis',
                'overflow-hidden',
                'whitespace-nowrap',
              ]"
            >
              УСПЕЙ ВЗЯТЬ ЭКСКЛЮЗИВ!
            </div>
            <div
              :class="[
                'text-[12px]',
                'leading-[16px]',
                'lg:text-[16px]',
                'lg:leading-[20px]',
                'text-[var(--color-secondary)]',
                'text-ellipsis',
                'overflow-hidden',
                'whitespace-nowrap',
              ]"
            >
              Мы собрали все ваши любимые роллы в один Фирменный сет и добавили то, чего нет ни у
              кого.
            </div>
          </div>
        </div>
      </div>
    </ContainerSite>
  </div>
</template>

<style scoped></style>
