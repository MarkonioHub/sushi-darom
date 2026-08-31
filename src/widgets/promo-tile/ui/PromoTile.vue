<script setup lang="ts">
  import { usePromoModal } from '@/entities/promo/composables';
  import type { Promo } from '@/entities/promo';
  const { pushQuery } = usePromoModal();

  interface Props {
    promos: Promo[];
  }

  const { promos } = defineProps<Props>();
</script>

<template>
  <section :class="['mb-[80px]']">
    <ContainerSite>
      <TitleSite :class="['mb-[30px]']" :tag="'h1'">Акции</TitleSite>
      <div :class="['flex', 'flex-wrap', 'sm:gap-[20px]', 'gap-[10px]']">
        <div
          v-for="promo in promos"
          :key="promo.id"
          @click="pushQuery(promo.slug)"
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
            'overflow-hidden',
            'hover:border-[#000]',
            'transition-all',
            'duration-[var(--transition-duration)]',
          ]"
        >
          <NuxtImg :src="promo.imageVertical" />
          <div :class="['bg-[#ffffff]', 'lg:p-[10px]', 'p-[6px]']">
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
              {{ promo.name }}
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
                'h-[22px]',
              ]"
              v-html="promo.content"
            ></div>
          </div>
        </div>
      </div>
    </ContainerSite>
  </section>
</template>

<style scoped></style>
