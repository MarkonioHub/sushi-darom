<script setup lang="ts">
  import type { Product } from '@/entities/product';
  import { CounterProduct } from '@/shared/ui/counter-product';
  import { formatPriceWithCurrency } from '@/shared/lib';
  import ProductAccordion from './ProductAccordion.vue';

  interface Props {
    product: Product;
  }

  const { product } = defineProps<Props>();

  const productPrice = computed(() => {
    return formatPriceWithCurrency(product.price);
  });

  const placeholderImageSrc = '/products/placeholder.jpg';

  const imageSrc = computed(() => {
    return product.image || placeholderImageSrc;
  });
</script>

<template>
  <div :class="['mb-[80px]', 'lg:mb-[40px]']">
    <ContainerSite>
      <div v-if="product" :class="['flex', 'gap-[40px]', 'lg:flex-row', 'flex-col']">
        <div :class="['lg:w-[calc(50%-20px)]', 'w-100%[]']">
          <NuxtImg
            :src="imageSrc"
            alt=""
            :class="[
              'object-cover',
              'lg:max-h-[600px]',
              'lg:max-w-[600px]',
              'max-h-[400px]',
              'max-w-[400px]',
              'rounded-[12px]',
              'aspect-[1/1]',
              'w-[100%]',
            ]"
          />
        </div>
        <div :class="['lg:w-[calc(50%-20px)]', 'w-[100%]']">
          <div
            :class="[
              'p-[24px]',
              'rounded-[12px]',
              'border',
              'border-[var(--border-color)]',
              'mb-[24px]',
            ]"
          >
            <TitleSite :tag="'h1'">{{ product.name }}</TitleSite>
            <div
              v-if="product.pieces || product.weight"
              :class="[
                'flex',
                'items-center',
                'gap-[4px]',
                'mb-[30px]',
                'text-[var(--color-secondary)]',
              ]"
            >
              <span v-if="product.pieces">{{ product.pieces }} шт</span>
              <span v-if="product.pieces && product.weight">/</span>
              <span v-if="product.weight">{{ product.weight }} гр</span>
            </div>
            <div :class="['flex', 'items-center', 'justify-between']">
              <TitleSite :variant="'secondary'">{{ productPrice }}</TitleSite>
              <CounterProduct />
            </div>
          </div>
          <p v-if="product.description" :class="['mb-[24px]', 'text-[var(--color-secondary)]']">
            {{ product.description }}
          </p>
          <ProductAccordion v-if="product.compound" :title="'Состав'">
            <p>{{ product.compound }}</p>
          </ProductAccordion>
          <ProductAccordion v-if="product.allergens" :title="'Аллергены'">
            <p>{{ product.allergens }}</p>
          </ProductAccordion>
          <ProductAccordion
            v-if="product.proteins || product.carbs || product.fats || product.calories"
            :title="'Пищевая ценность'"
          >
            <div :class="['flex', 'flex-wrap', 'justify-between', 'gap-[20px]']">
              <div v-if="product.proteins">
                <div :class="['text-[var(--color-secondary)]']">Белки</div>
                <div :class="['text-[18px]', 'font-[700]']">{{ product.proteins }}</div>
              </div>
              <div v-if="product.carbs">
                <div :class="['text-[var(--color-secondary)]']">Углеводы</div>
                <div :class="['text-[18px]', 'font-[700]']">{{ product.carbs }}</div>
              </div>
              <div v-if="product.fats">
                <div :class="['text-[var(--color-secondary)]']">Жиры</div>
                <div :class="['text-[18px]', 'font-[700]']">{{ product.fats }}</div>
              </div>
              <div v-if="product.calories">
                <div :class="['text-[var(--color-secondary)]']">Калорийность в 100 гр.</div>
                <div :class="['text-[18px]', 'font-[700]']">{{ product.calories }}</div>
              </div>
            </div>
          </ProductAccordion>
        </div>
      </div>
      <div v-else>К сожалению продукт не найден</div>
    </ContainerSite>
  </div>
</template>

<style scoped></style>
