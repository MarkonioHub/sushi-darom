<script setup lang="ts">
  import { useDragScroll } from '@/shared/lib';
  const { element, isDragging, pointerDown, pointerMove, pointerUp } = useDragScroll();
  const route = useRoute();

  const tabs = new Map<string, HTMLElement>();
  const tabsContainer = useTemplateRef('element');

  function scrollToCategory(slug: string) {
    const element = document.getElementById(slug);
    if (!element) return;
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  const activeSlug = computed(() => {
    return typeof route.query.category === 'string' ? route.query.category : '';
  });

  function setCategoryTab(el: Element | ComponentPublicInstance | null, slug: string) {
    if (!el) return;
    tabs.set(slug, el as HTMLElement);
  }

  watch(activeSlug, (newVal) => {
    if (!newVal) return;
    const tab = tabs.get(newVal);
    if (!tab || !tabsContainer.value) return;

    const tabsContainerCenter = tabsContainer.value.clientWidth / 2;
    const tabCenter = tab.clientWidth / 2;
    const targetScrollLeft = tab.offsetLeft - tabsContainerCenter + tabCenter;

    tabsContainer.value.scrollTo({
      left: targetScrollLeft,
      behavior: 'smooth',
    });
  });
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
            @click="!isDragging && scrollToCategory(`slug-${item}`)"
            :ref="(el) => setCategoryTab(el, `slug-${item}`)"
            :class="[
              'p-[8px_16px]',
              'rounded-[24px]',
              'text-[16px]',
              'transition-colors',
              'duration-[var(--transition-duration)]',
              'cursor-pointer',
              'shrink-0',
              activeSlug === `slug-${item}`
                ? 'bg-[var(--color-primary)] text-white'
                : 'bg-[var(--secondary-background)] hover:bg-[var(--tertiary-background)]',
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
