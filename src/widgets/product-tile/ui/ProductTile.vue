<script setup lang="ts">
  import { ProductCard } from '@/entities/product';
</script>

<template>
  <section class="mb-[80px] mt-[40px]">
    <ContainerSite>
      <h3 class="mb-[20px] text-[24px] font-[600] lg:text-[32px]">ШОК Цена</h3>
      <ul class="mb-[24px] flex flex-wrap gap-[12px]">
        <li
          v-for="(tab, index) in [1, 2, 3, 4, 5, 6, 7, 8, 9]"
          :key="index"
          :class="[
            'border',
            'border-solid',
            'border-[#191c23]',
            'rounded-[999px]',
            'p-[4px_8px]',
            'flex',
            'items-center',
            'gap-[4px]',
            'flex-wrap',
            'cursor-pointer',
            'hover:bg-[var(--tertiary-background)]',
            'transition-colors',
          ]"
        >
          <NuxtImg src="/public/examples/tag.png" class="h-[19px]" />
          Таб {{ tab }}
        </li>
      </ul>
      <div :class="['flex', 'flex-wrap', 'gap-[40px_20px]']">
        <ProductCard
          v-for="(product, index) in [1, 2, 3, 4, 5, 6, 7, 8, 9]"
          :key="index"
          :class="[
            'xl:w-[calc(25%-15px)]',
            'w-[100%]',
            'sm:w-[calc(50%-10px)]',
            'lg:w-[calc(33.33%-14px)]',
          ]"
        />
      </div>
    </ContainerSite>
  </section>
</template>

<style scoped></style>
