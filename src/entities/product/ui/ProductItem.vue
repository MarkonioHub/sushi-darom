<script setup lang="ts">
  import { CounterProduct } from '@/shared/ui/counter-product';
  import type { Product } from '@/entities/product';
  import { formatPriceWithCurrency } from '@/shared/lib';

  interface Props {
    product: Product;
  }

  const { product } = defineProps<Props>();
  const to = computed(() => `/products/${product.slug}`);
  const imageSrc = computed(() => product.image || '/products/placeholder.jpg');
</script>

<template>
  <div :class="['flex', 'flex-col', 'group', 'max-w-[400px]', 'lg:max-w-[100%]']">
    <NuxtLink
      :to="to"
      :class="['relative', 'overflow-hidden', 'aspect-square', 'mb-[24px]', 'rounded-[16px]']"
    >
      <NuxtImg
        :src="imageSrc"
        :class="[
          'group-hover:scale-[1.06]',
          'transition-transform',
          'duration-[0.4s]',
          'h-[100%]',
          'w-[100%]',
          'object-cover',
        ]"
      />
      <!--      <div :class="['absolute', 'left-[16px]', 'top-[16px]', 'flex', 'flex-wrap', 'gap-[5px]']">-->
      <!--        <div-->
      <!--          :class="['p-[4px_8px]', 'rounded-[20px]', 'text-[12px]', 'leading-[100%]', 'font-[600]']"-->
      <!--          style="background: rgb(255, 25, 25); color: rgb(255, 255, 255)"-->
      <!--        >-->
      <!--          -50%-->
      <!--        </div>-->
      <!--      </div>-->
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
      <NuxtLink to="#" :class="['text-[24px]', 'font-[600]', 'mb-[8px]']">
        {{ product.name }}
      </NuxtLink>
      <div :class="['text-[var(--color-secondary)]', 'text-[16px]', 'leading-[20px]', 'mb-[20px]']">
        {{ product.description }}
      </div>
      <div class="mt-auto flex items-center justify-between">
        <div>
          <div class="flex items-center">
            <div :class="['text-[24px]', 'font-[600]', 'leading-[30px]']">
              {{ formatPriceWithCurrency(product.price) }}
            </div>
            <div
              v-if="product.oldPrice"
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
          <div class="text-[var(--color-secondary)]">
            <span v-if="product.pieces">{{ product.pieces }}</span>
            <span v-if="product.pieces && product.weight">/</span>
            <span v-if="product.weight">{{ product.weight }}</span>
          </div>
        </div>
        <CounterProduct />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
