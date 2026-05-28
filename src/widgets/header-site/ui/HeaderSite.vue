<script setup lang="ts">
  import { HEADER_NAV } from '@/shared/const';
  import { LogoSite } from '@/shared/ui';
  import { useAnchorScroll } from '@/shared/lib';
  import { useMobileMenuStore, useOverlayStore } from '@/shared/model';

  const { navigateToAnchorScroll } = useAnchorScroll();
  const mobileMenuStore = useMobileMenuStore();
  const overlayStore = useOverlayStore();

  function openMenu() {
    mobileMenuStore.open();
    overlayStore.open();
  }
</script>

<template>
  <header
    :class="[
      'sticky',
      'top-0',
      'z-[10]',
      'border-y',
      'border-solid',
      'border-[color:var(--tertiary-background)]',
      'bg-[#ffffff]',
      'lg:py-[5px]',
      'py-[12px]',
    ]"
  >
    <ContainerSite>
      <div class="mx-[-5px] flex items-center justify-between lg:justify-normal">
        <div class="cursor-pointer p-[5px] lg:hidden" @click="openMenu">
          <IconApp name="app:menu" class-name="w-[24px] h-[24px]" />
        </div>
        <LogoSite :class="['lg:order-none', 'lg:mr-[56px]', 'order-2']" />
        <nav class="hidden lg:block">
          <ul class="flex gap-[30px]">
            <li v-for="item in HEADER_NAV" :key="item.text" :class="['flex']">
              <button
                v-if="item.hash"
                @click="navigateToAnchorScroll(item.to, item.hash)"
                class="p-[10px] transition-colors duration-[var(--transition-duration)] hover:text-[var(--color-secondary)]"
              >
                {{ item.text }}
              </button>
              <NuxtLink
                v-else-if="'to' in item"
                :to="item.to"
                class="p-[10px] transition-colors duration-[var(--transition-duration)] hover:text-[var(--color-secondary)]"
              >
                {{ item.text }}
              </NuxtLink>
              <a
                v-else
                :href="item.href"
                target="_blank"
                rel="noreferrer"
                class="p-[10px] transition-colors duration-[var(--transition-duration)] hover:text-[var(--color-secondary)]"
              >
                {{ item.text }}
              </a>
            </li>
          </ul>
        </nav>
        <div
          class="group order-1 flex cursor-pointer flex-col items-center p-[5px] lg:order-none lg:ml-auto"
        >
          <IconApp
            name="app:search"
            class-name="w-[18px] h-[18px] lg:w-[16px] lg:h-[16px] lg:mb-[7px]"
          />
          <div
            class="hidden text-[12px] transition-colors duration-[var(--transition-duration)] group-hover:text-[var(--color-secondary)] lg:block"
          >
            Поиск
          </div>
        </div>
        <div
          class="group order-3 flex cursor-pointer flex-col items-center p-[5px] lg:order-none lg:ml-[40px]"
        >
          <IconApp
            name="app:user"
            class-name="w-[24px] h-[20px] lg:w-[20px] lg:h-[20px] lg:mb-[5px]"
          />
          <div
            class="hidden text-[12px] transition-colors duration-[var(--transition-duration)] group-hover:text-[var(--color-secondary)] lg:block"
          >
            Профиль
          </div>
        </div>
        <NuxtLink
          to="/basket"
          class="group order-4 flex flex-col items-center p-[5px] lg:order-none lg:ml-[40px]"
        >
          <IconApp
            name="app:basket"
            class-name="w-[24px] h-[24px] lg:w-[20px] lg:h-[20px] lg:mb-[5px]"
          />
          <div
            class="hidden text-[12px] transition-colors duration-[var(--transition-duration)] group-hover:text-[var(--color-secondary)] lg:block"
          >
            Корзина
          </div>
        </NuxtLink>
      </div>
    </ContainerSite>
  </header>
</template>

<style scoped></style>
