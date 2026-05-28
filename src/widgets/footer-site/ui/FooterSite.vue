<script setup lang="ts">
  import { CONTACTS, SOCIAL_LIST, FOOTER_NAV, MOB_APP } from '@/shared/const';
  import { useResize } from '@/shared/lib';
  import { LogoSite } from '~/shared/ui';

  const opened = ref<number[]>([]);
  const isDesktop = ref<boolean>();

  const checkScreen = () => {
    isDesktop.value = window.innerWidth > 768;
  };

  useResize(checkScreen, 100);

  const accordionShow = computed(() => {
    return (index: number) => {
      return opened.value.includes(index) || isDesktop.value;
    };
  });

  const toggle = (index: number) => {
    if (opened.value.includes(index)) {
      opened.value = opened.value.filter((i) => i !== index);
    } else {
      opened.value.push(index);
    }
  };
</script>

<template>
  <footer class="bg-[var(--primary-background)] py-[25px] md:py-[50px]">
    <ContainerSite>
      <div
        class="flex flex-col flex-wrap items-center justify-between gap-[20px] text-center md:flex-row md:items-start md:gap-[40px] md:text-left"
      >
        <div
          class="mb-[10px] flex w-[100%] flex-col sm:mb-0 sm:w-[40%] md:order-1 lg:order-none lg:size-auto"
        >
          <LogoSite :class="['mb-[15px]', 'ml-[-5px]', 'sm:mb-[30px]']" />
          <a
            :href="`tel:${CONTACTS.phone}`"
            class="mb-[10px] text-[20px] font-[600] leading-[24px] transition-colors duration-[var(--transition-duration)] hover:text-[var(--color-secondary)] sm:mb-[20px]"
          >
            {{ CONTACTS.phone }}
          </a>
          <div class="mb-[15px] leading-[20px] text-[var(--disabled-content)] sm:mb-[30px]">
            10:00 - 21:45, ежедневно
            <br />
            (время Московское)
          </div>
          <div class="flex justify-center gap-[10px] md:justify-normal">
            <a
              v-for="item in SOCIAL_LIST"
              :key="item.icon"
              :href="item.href"
              target="_blank"
              class="group"
            >
              <IconApp
                :name="`app:${item.icon}`"
                class-name="w-[32px] h-[32px]
              duration-[var(--transition-duration)] transition-opacity group-hover:opacity-[0.6]"
              />
            </a>
          </div>
        </div>
        <div
          v-for="(box, index) in FOOTER_NAV"
          :key="box.title"
          class="mt-[-10px] flex flex-col sm:mt-0"
        >
          <div
            class="mt-[-8px] flex cursor-pointer items-center justify-center gap-[10px] p-[8px] text-[16px] font-[600] leading-[24px] md:ml-[-8px] md:block md:cursor-auto md:text-[20px] lg:mb-[12px]"
            @click="toggle(index)"
          >
            {{ box.title }}
            <IconApp
              name="app:plus"
              :class-name="
                'w-[14px] h-[14px] md:hidden transition-transform duration-[var(--transition-duration)] ' +
                `${accordionShow(index) ? ' rotate-45' : ''}`
              "
            />
          </div>
          <transition name="accordion">
            <div v-show="accordionShow(index)" class="flex flex-col">
              <template v-for="item in box.list">
                <NuxtLink
                  v-if="'to' in item"
                  :key="item.to"
                  :to="item.to"
                  class="p-[8px] text-[16px] leading-[20px] text-[var(--color-secondary)] transition-colors duration-[var(--transition-duration)] hover:text-[var(--color-primary)] md:ml-[-8px]"
                >
                  {{ item.text }}
                </NuxtLink>
                <a
                  v-else
                  :key="item.href"
                  :href="item.href"
                  target="_blank"
                  rel="noreferrer"
                  class="ml-[-8px] p-[8px] text-[16px] leading-[20px] text-[var(--color-secondary)] transition-colors duration-[var(--transition-duration)] hover:text-[var(--color-primary)]"
                >
                  {{ item.text }}
                </a>
              </template>
            </div>
          </transition>
        </div>
        <div class="sm:mt-[20px] md:order-2 md:mt-0 md:w-[40%] lg:w-[100%] 2xl:size-auto">
          <div class="mb-[20px] text-[20px] font-[600] leading-[24px]">Мобильное приложение</div>
          <div class="flex items-start gap-[10px]">
            <div class="flex flex-col items-center md:items-start">
              <div class="mb-[20px] leading-[20px] text-[var(--color-secondary)] 2xl:max-w-[168px]">
                Скидки, промокоды и акции в мобильном приложении
              </div>
              <a
                v-for="item in MOB_APP"
                :key="item.href"
                :href="item.href"
                target="_blank"
                rel="noreferrer"
                class="2xl:rounded-0 mb-[10px] flex w-[280px] justify-center rounded-[8px] bg-[#000000] p-[8px] 2xl:m-0 2xl:w-[100px] 2xl:bg-transparent 2xl:p-0"
              >
                <IconApp
                  :name="`app:${item.iconDesk}`"
                  class-name="w-[100px] h-[32px] 2xl:block hidden mb-[10px]"
                />
                <IconApp :name="`app:${item.iconMob}`" class-name="w-[128px] h-[32px] 2xl:hidden" />
              </a>
            </div>
            <div class="ml-auto mt-[-60px] 2xl:ml-0 2xl:mt-0">
              <IconApp name="app:app-qr" class-name="w-[200px] h-[200px] lg:block hidden" />
            </div>
          </div>
        </div>
      </div>
    </ContainerSite>
  </footer>
</template>

<style>
  .accordion-enter-active,
  .accordion-leave-active {
    transition: all var(--transition-duration) ease;
  }

  .accordion-enter-from,
  .accordion-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }
</style>
