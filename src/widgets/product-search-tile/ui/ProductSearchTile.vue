<script setup lang="ts">
  import { ProductItem } from '@/entities/product/ui';
  import type { Product } from '@/entities/product';

  interface Props {
    products: Product[];
  }

  const { products } = defineProps<Props>();
</script>

<template>
  <section
    class="mb-[80px] mt-[40px] scroll-mt-[calc(var(--header-height)+var(--header-category-nav))]"
  >
    <ContainerSite>
      <TitleSite class="mb-[20px]" :variant="'secondary'" :tag="'h3'">Результаты поиска</TitleSite>
      <div :class="['flex', 'flex-wrap', 'gap-[40px_20px]']">
        <ProductItem
          v-for="(product, index) in products"
          :product="product"
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
