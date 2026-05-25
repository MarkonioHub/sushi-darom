<script setup lang="ts">
  import { useDragScroll } from '@/shared/lib';
  const { element, pointerDown, pointerMove, pointerUp } = useDragScroll();
</script>

<template>
  <div class="mb-[10px] scroll-mt-[var(--header-height)] lg:mb-[16px]" id="menu">
    <ContainerSite>
      <div class="text-[24px] font-[600] lg:text-[32px]">Меню</div>
    </ContainerSite>
  </div>
  <div class="sticky top-[var(--header-height)] z-[10] bg-[#ffffff] p-[0_0_10px] lg:py-[10px]">
    <ContainerSite>
      <nav>
        <ul
          ref="element"
          @pointerdown="pointerDown"
          @pointermove="pointerMove"
          @pointerup="pointerUp"
          :class="[
            'hide-scrollbar',
            '-mx-[16px]',
            'flex',
            'cursor-grab',
            'select-none',
            'snap-x',
            'gap-[12px]',
            'overflow-x-auto',
            'px-[16px]',
            'lg:mx-0',
            'lg:pl-0',
          ]"
        >
          <li
            v-for="(item, index) in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]"
            :key="index"
            :class="[
              'bg-[var(--secondary-background)]',
              'p-[8px_16px]',
              'rounded-[24px]',
              'text-[16px]',
              'hover:bg-[var(--tertiary-background)]',
              'transition-colors',
              'duration-[var(--transition-duration)]',
              'cursor-pointer',
              'shrink-0',
            ]"
          >
            Категория {{ item }}
          </li>
        </ul>
      </nav>
    </ContainerSite>
  </div>
</template>

<style scoped></style>
