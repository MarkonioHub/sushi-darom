<script setup lang="ts">
  import { SOCIAL_LIST, FOOTER_NAV, MOB_APP } from '@/shared/lib';
  import { LogoSite } from '@/shared/ui/logo-site';
  import { useCityStore } from '@/entities/city';
  import FooterAccordion from './FooterAccordion.vue';

  const cityStore = useCityStore();
  const { currentCity } = storeToRefs(cityStore);
</script>

<template>
  <footer :class="['bg-[var(--primary-background)]', 'py-[25px]', 'md:py-[50px]']">
    <ContainerSite>
      <div
        :class="[
          'flex',
          'flex-col',
          'flex-wrap',
          'items-center',
          'justify-between',
          'gap-[20px]',
          'text-center',
          'md:flex-row',
          'md:items-start',
          'md:gap-[30px]',
          'md:text-left',
        ]"
      >
        <div
          :class="[
            'mb-[10px]',
            'flex',
            'w-[100%]',
            'flex-col',
            'sm:mb-0',
            'sm:w-[40%]',
            'md:order-1',
            'lg:order-none',
            'lg:size-auto',
          ]"
        >
          <LogoSite
            :class="[
              'mb-[15px]',
              'ml-[-5px]',
              'sm:mb-[30px]',
              'justify-center',
              'md:justify-start',
            ]"
          />
          <a
            :href="`tel:${currentCity?.phone}`"
            :class="[
              'mb-[10px]',
              'text-[20px]',
              'font-[600]',
              'leading-[24px]',
              'transition-colors',
              'duration-[var(--transition-duration)]',
              'hover:text-[var(--color-secondary)]',
              'sm:mb-[20px]',
            ]"
          >
            {{ currentCity?.phone }}
          </a>
          <div
            :class="[
              'mb-[15px]',
              'leading-[20px]',
              'text-[var(--disabled-content)]',
              'sm:mb-[30px]',
            ]"
          >
            10:00 - 21:45, ежедневно
            <br />
            (время Московское)
          </div>
          <div :class="['flex', 'justify-center', 'gap-[10px]', 'md:justify-normal']">
            <a
              v-for="item in SOCIAL_LIST"
              :key="item.icon"
              :href="item.href"
              target="_blank"
              class="group"
            >
              <IconApp
                :name="`app:${item.icon}`"
                :class="[
                  'h-[32px]',
                  'w-[32px]',
                  'transition-opacity',
                  'duration-[var(--transition-duration)]',
                  'group-hover:opacity-[0.6]',
                ]"
              />
            </a>
          </div>
        </div>
        <div
          v-for="box in FOOTER_NAV"
          :key="box.title"
          :class="['mt-[-10px]', 'flex', 'flex-col', 'sm:mt-0']"
        >
          <FooterAccordion :box="box" />
        </div>
        <div
          :class="[
            'sm:mt-[20px]',
            'md:order-2',
            'md:mt-0',
            'md:w-[40%]',
            'lg:w-[100%]',
            '2xl:size-auto',
          ]"
        >
          <div :class="['mb-[20px]', 'text-[20px]', 'font-[600]', 'leading-[24px]']">
            Мобильное приложение
          </div>
          <div :class="['flex', 'items-start', 'gap-[10px]']">
            <div :class="['flex', 'flex-col', 'items-center', 'md:items-start']">
              <div
                :class="[
                  'mb-[20px]',
                  'leading-[20px]',
                  'text-[var(--color-secondary)]',
                  '2xl:max-w-[168px]',
                ]"
              >
                Скидки, промокоды и акции в мобильном приложении
              </div>
              <a
                v-for="item in MOB_APP"
                :key="item.href"
                :href="item.href"
                target="_blank"
                rel="noreferrer"
                :class="[
                  '2xl:rounded-0',
                  'mb-[10px]',
                  'flex',
                  'w-[280px]',
                  'justify-center',
                  'rounded-[8px]',
                  'bg-[#000000]',
                  'p-[8px]',
                  '2xl:m-0',
                  '2xl:w-[100px]',
                  '2xl:bg-transparent',
                  '2xl:p-0',
                ]"
              >
                <IconApp
                  :name="`app:${item.iconDesk}`"
                  :class="['mb-[10px]', 'hidden', 'h-[32px]', 'w-[100px]', '2xl:block']"
                />
                <IconApp
                  :name="`app:${item.iconMob}`"
                  :class="['h-[32px]', 'w-[128px]', '2xl:hidden']"
                />
              </a>
            </div>
            <div :class="['ml-auto', 'mt-[-60px]', '2xl:ml-0', '2xl:mt-0']">
              <IconApp
                name="app:app-qr"
                :class="['hidden', 'h-[200px]', 'w-[200px]', 'lg:block']"
              />
            </div>
          </div>
        </div>
      </div>
    </ContainerSite>
  </footer>
</template>

<style></style>
