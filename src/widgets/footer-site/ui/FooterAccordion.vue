<script setup lang="ts">
  import { type FooterNav, useResize } from '@/shared/lib';
  import { useAccordion } from '@/shared/lib';
  import { useModalStore } from '@/shared/ui/modal-base';
  import { CookieModal } from '@/features/cookie-settings';

  interface Props {
    box: FooterNav;
  }

  const { box } = defineProps<Props>();
  const modalStore = useModalStore();

  const { toggle, isOpen } = useAccordion();

  const isDesktop = ref<boolean>();

  const checkScreen = () => {
    isDesktop.value = window.innerWidth > 768;
  };

  useResize(checkScreen, 100);

  const accordionIsOpen = () => {
    return isOpen() || isDesktop.value;
  };

  function handleAction(action: string) {
    switch (action) {
      case 'cookie-modal': {
        modalStore.open(CookieModal, 'middle');
      }
    }
  }
</script>

<template>
  <div
    :class="[
      'mt-[-8px]',
      'flex',
      'cursor-pointer',
      'items-center',
      'justify-center',
      'gap-[10px]',
      'p-[8px]',
      'text-[16px]',
      'font-[600]',
      'leading-[24px]',
      'md:ml-[-8px]',
      'md:block',
      'md:cursor-auto',
      'md:text-[20px]',
      'lg:mb-[12px]',
    ]"
    @click="toggle()"
  >
    {{ box.title }}
    <IconApp
      name="app:plus"
      :class="
        'h-[14px] w-[14px] transition-transform duration-[var(--transition-duration)] md:hidden ' +
        `${accordionIsOpen() ? ' rotate-45' : ''}`
      "
    />
  </div>
  <transition name="accordion">
    <div v-show="accordionIsOpen()" :class="['flex', 'flex-col']">
      <template v-for="item in box.list" :key="item.text">
        <NuxtLink
          v-if="item.type === 'link'"
          :to="item.to"
          :class="[
            'p-[8px]',
            'text-[16px]',
            'leading-[20px]',
            'text-[var(--color-secondary)]',
            'transition-colors',
            'duration-[var(--transition-duration)]',
            'hover:text-[var(--color-primary)]',
            'md:ml-[-8px]',
          ]"
        >
          {{ item.text }}
        </NuxtLink>
        <a
          v-if="item.type === 'external'"
          :href="item.href"
          target="_blank"
          rel="noreferrer"
          :class="[
            'ml-[-8px]',
            'p-[8px]',
            'text-[16px]',
            'leading-[20px]',
            'text-[var(--color-secondary)]',
            'transition-colors',
            'duration-[var(--transition-duration)]',
            'hover:text-[var(--color-primary)]',
          ]"
        >
          {{ item.text }}
        </a>
        <button
          v-else-if="item.type === 'button'"
          @click="() => handleAction(item.action)"
          :class="[
            'ml-[-8px]',
            'p-[8px]',
            'text-[16px]',
            'text-left',
            'leading-[20px]',
            'text-center',
            'md:text-left',
            'text-[var(--color-secondary)]',
            'transition-colors',
            'duration-[var(--transition-duration)]',
            'hover:text-[var(--color-primary)]',
          ]"
        >
          {{ item.text }}
        </button>
      </template>
    </div>
  </transition>
</template>

<style scoped></style>
