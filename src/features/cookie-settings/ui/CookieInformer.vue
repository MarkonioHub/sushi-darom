<script setup lang="ts">
  import { type CookieAction } from '../model/types';
  import { useCookieSettings } from '../composables/useCookieSettings';
  import { useModalStore } from '@/shared/ui/modal-base';
  import { CookieModal } from '~/features/cookie-settings';

  const modalStore = useModalStore();
  const { cookieConfig, setCookie, initYandexMetrika } = useCookieSettings();

  function updateCookie(action: CookieAction) {
    setCookie(action);
    if (action !== 'required') {
      initYandexMetrika();
    }
  }

  const cookieFirstShow = computed(() => {
    return (
      cookieConfig.required.value === undefined &&
      cookieConfig.analytics.value === undefined &&
      cookieConfig.marketing.value === undefined
    );
  });
</script>

<template>
  <div
    v-if="cookieFirstShow"
    :class="[
      'fixed',
      'bottom-0',
      'left-0',
      'right-0',
      'bg-[#ffffff]',
      'shadow-[0px_-4px_16px_rgba(0,0,0,0.08)]',
      'z-[var(--z-index-notification)]',
      'p-[16px_24px]',
      'flex',
      'justify-center',
      'border-t',
      'border-t-[rgba(0, 0, 0, 0.1)]',
    ]"
  >
    <div
      :class="['flex', 'items-center', 'flex-col', 'md:flex-row', 'max-w-[1240px]', 'gap-[20px]']"
    >
      <p :class="['text-[13px]']">
        Мы используем файлы cookie для улучшения работы сайта, анализа трафика и персонализации
        контента. Нажимая «Принять все», вы соглашаетесь с использованием всех категорий cookie в
        соответствии с нашей
        <a href="/doc/policy.pdf" :class="['text-[var(--color-orange)]']">
          политикой конфиденциальности
        </a>
        .
      </p>
      <div
        :class="[
          'flex',
          'gap-[10px]',
          'flex-col',
          'shrink-0',
          'w-[100%]',
          'md:flex-row',
          'md:w-[unset]',
        ]"
      >
        <ButtonSite :type="'button'" :size="'small'" @click="() => updateCookie('accept')">
          Принять все
        </ButtonSite>
        <ButtonSite
          :type="'button'"
          :variant="'secondary'"
          @click="() => updateCookie('required')"
          :size="'small'"
        >
          Только обязательные
        </ButtonSite>
        <ButtonSite
          :type="'button'"
          :variant="'tertiary'"
          @click="() => modalStore.open(CookieModal, 'middle')"
          :size="'small'"
        >
          Настройки
        </ButtonSite>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
