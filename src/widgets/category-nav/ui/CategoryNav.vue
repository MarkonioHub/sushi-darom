<script setup lang="ts">
  import { useDragScroll } from '@/shared/lib';
  import { TitleSite } from '@/shared/ui';

  const tabsContainer = useTemplateRef<HTMLElement>('element');
  const { isDragging, onMouseDown, onMouseMove, onMouseUpOrLeave } = useDragScroll(tabsContainer);
  const route = useRoute();
  const tabs = new Map<string, HTMLElement>();

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
      <TitleSite :variant="'secondary'">Меню</TitleSite>
    </ContainerSite>
  </div>
  <div class="sticky top-[var(--header-height)] z-[10] bg-[#ffffff] p-[0_0_10px] lg:py-[10px]">
    <ContainerSite>
      <nav>
        <ul
          ref="element"
          @mousedown="onMouseDown"
          @mousemove="onMouseMove"
          @mouseup="onMouseUpOrLeave"
          @mouseleave="onMouseUpOrLeave"
          @dragstart.prevent
          style="touch-action: pan-x; scroll-behavior: smooth"
          :class="[
            'hide-scrollbar',
            '-mx-[16px]',
            'flex',
            'cursor-grab',
            'active:cursor-grabbing',
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
            v-for="item in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]"
            :key="item"
            @click="!isDragging && scrollToCategory(`slug-${item}`)"
            :ref="(el) => setCategoryTab(el, `slug-${item}`)"
            :class="[
              'snap-start',
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
