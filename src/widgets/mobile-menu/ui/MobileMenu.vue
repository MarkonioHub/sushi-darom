<script setup lang="ts">
  import { CONTACTS, HEADER_NAV } from '@/shared/const';
  import { useMobileMenuStore, useOverlayStore } from '@/shared/model';
  import { useResize } from '@/shared/lib';
  import { LogoSite } from '@/shared/ui';

  const mobileMenuStore = useMobileMenuStore();
  const overlayStore = useOverlayStore();

  function closeMenu() {
    mobileMenuStore.close();
    overlayStore.close();
  }

  function closeMenuOnDesktop() {
    if (window.innerWidth > 1023) closeMenu();
  }

  useResize(closeMenuOnDesktop, 100);
</script>

<template>
  <transition name="left">
    <div
      v-show="mobileMenuStore.isMobileMenuOpen"
      class="fixed left-0 top-0 z-[1000] h-[100%] w-[80%] overflow-x-auto bg-[#ffffff] p-[20px] shadow-[2px_0_5px_rgba(0,0,0,0.5)]"
    >
      <button class="absolute right-[10px] top-[10px] rotate-45 p-[10px]" @click="closeMenu">
        <IconApp name="app:plus" class-name="w-[20px] h-[20px]" />
      </button>
      <LogoSite :class="['inline-block', 'mb-[30px]', 'ml-[-8px]']" />
      <nav>
        <ul class="flex flex-col gap-[25px]">
          <li v-for="item in HEADER_NAV" :key="item.text">
            <NuxtLink
              v-if="'to' in item"
              :to="item.to"
              @click="closeMenu"
              class="ml-[-10px] p-[10px] text-[16px] transition-colors duration-[var(--transition-duration)] hover:text-[var(--color-secondary)]"
            >
              {{ item.text }}
            </NuxtLink>
            <a
              v-else
              :href="item.href"
              @click="closeMenu"
              target="_blank"
              rel="noreferrer"
              class="ml-[-10px] p-[10px] text-[16px] transition-colors duration-[var(--transition-duration)] hover:text-[var(--color-secondary)]"
            >
              {{ item.text }}
            </a>
          </li>
        </ul>
      </nav>
      <div
        class="mt-[20px] flex flex-col gap-[10px] border-t border-solid border-[var(--tertiary-background)] pt-[20px]"
      >
        <div
          class="flex cursor-pointer items-center gap-[8px] py-[10px] text-[var(--color-secondary)]"
        >
          <IconApp name="app:location" class-name="text-[12px]" />
          Краснодар
        </div>
        <NuxtLink
          to="/"
          class="flex items-center gap-[8px] py-[10px] text-[var(--color-secondary)]"
        >
          <IconApp name="app:chat" class-name="text-[12px]" />
          Оставить отзыв
        </NuxtLink>
        <a
          :href="`tel:${CONTACTS.phone}`"
          class="flex items-center gap-[8px] py-[10px] text-[var(--color-secondary)]"
        >
          <IconApp name="app:phone" class-name="text-[12px]" />
          {{ CONTACTS.phone }}
        </a>
      </div>
    </div>
  </transition>
</template>

<style scoped>
  .left-enter-active,
  .left-leave-active {
    transition: transform var(--transition-duration) ease;
  }
  .left-enter-from,
  .left-leave-to {
    transform: translateX(-100%);
  }
  .left-enter-to,
  .left-leave-from {
    transform: translateX(0);
  }
</style>
