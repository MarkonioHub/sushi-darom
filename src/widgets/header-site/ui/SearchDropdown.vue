<script setup lang="ts">
  import { type ProductSearchResult } from '@/entities/product';

  interface Props {
    searchResult: ProductSearchResult[];
  }

  interface Emits {
    closeSearch: [];
  }

  const { searchResult } = defineProps<Props>();

  const placeholderImageSrc = '/products/placeholder.jpg';
  const emit = defineEmits<Emits>();
</script>

<template>
  <div
    :class="[
      'absolute',
      'top-[calc(100%+5px)]',
      'lg:left-0',
      'lg:right-0',
      'left-[-50px]',
      'right-[-60px]',
      'bg-[#fff]',
      'z-[1]',
      'rounded-[8px]',
      'max-h-[calc(100vh-var(--header-height-with-search)-20px)]',
      'overflow-y-auto',
    ]"
  >
    <NuxtLink
      v-for="searchItem in searchResult"
      :key="searchItem.slug"
      :to="`/products/${searchItem.slug}`"
      @click="emit('closeSearch')"
      :class="[
        'flex',
        'gap-[12px]',
        'items-center',
        'p-[15px]',
        'cursor-pointer',
        'hover:bg-[var(--secondary-background)]',
      ]"
    >
      <NuxtImg
        :src="`${searchItem.image || placeholderImageSrc}`"
        :class="['w-[48px]', 'h-[48px]', 'rounded-[50%]', 'shrink-0']"
      />
      <div :class="['font-[700]']">{{ searchItem.name }}</div>
    </NuxtLink>
  </div>
</template>

<style scoped></style>
