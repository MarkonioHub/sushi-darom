<script setup lang="ts">
  import { SwitchBase } from '@/shared/ui/switch-base';
  import { useModalStore } from '@/shared/ui/modal-base';
  import { useCookieSettings } from '../composables/useCookieSettings';
  import { type CookieAction } from '../model/types';

  const modalStore = useModalStore();
  const { cookieSettings, setCookie, initYandexMetrika } = useCookieSettings();

  function updateCookie(action: CookieAction) {
    setCookie(action);
    initYandexMetrika();
    modalStore.close();
  }
</script>

<template>
  <div :class="['p-[40px]']">
    <TitleSite :variant="'secondary'">Настройки cookie</TitleSite>
    <p :class="['text-[16px]', 'mb-[10px]']">
      Управляйте категориями файлов cookie, которые мы используем на нашем сайте. Обязательные
      cookies необходимы для работы сайта и не могут быть отключены.
    </p>
    <ul :class="['mb-[10px]']">
      <li :class="['p-[15px]']" v-for="cookieSetting in cookieSettings" :key="cookieSetting.slug">
        <div :class="['flex', 'items-center', 'gap-[10px]', 'mb-[10px]', 'justify-between']">
          <div :class="['flex', 'items-center', 'gap-[10px]']">
            <div :class="['text-[18px]', 'font-[600]']">{{ cookieSetting.title }}</div>
            <div
              v-if="cookieSetting.tag"
              :class="[
                'text-[12px]',
                'leading-[100%]',
                'text-[var(--color-secondary)]',
                'bg-[rgba(0,0,0,.06)]',
                'rounded-[20px]',
                'p-[4px_8px]',
                'font-[500]',
              ]"
            >
              {{ cookieSetting.tag }}
            </div>
          </div>
          <SwitchBase
            :class="['shrink-0']"
            :disabled="cookieSetting.disabled"
            v-model="cookieSetting.cookieTemp.value"
          />
        </div>
        <p :class="[]">
          {{ cookieSetting.text }}
        </p>
      </li>
    </ul>
    <div :class="['flex', 'gap-[10px]', 'md:flex-row', 'flex-col']">
      <ButtonSite :type="'button'" @click="() => updateCookie('save')">
        Сохранить настройки
      </ButtonSite>
      <ButtonSite :type="'button'" :variant="'secondary'" @click="() => updateCookie('accept')">
        Принять все
      </ButtonSite>
      <ButtonSite :type="'button'" :variant="'secondary'" @click="() => updateCookie('reject')">
        Отклонить все
      </ButtonSite>
    </div>
  </div>
</template>

<style scoped></style>
