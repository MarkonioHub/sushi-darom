import { type CookieName, type Cookie, type CookieAction } from '../model/types';

export const useCookieSettings = () => {
  const { $yandexMetrika } = useNuxtApp();

  const cookieConfig: Record<CookieName, Ref<boolean | undefined>> = {
    required: useCookie<boolean | undefined>('required', {
      maxAge: 60 * 60 * 24 * 365,
    }),
    analytics: useCookie<boolean | undefined>('analytics', {
      maxAge: 60 * 60 * 24 * 365,
    }),
    marketing: useCookie<boolean | undefined>('marketing', {
      maxAge: 60 * 60 * 24 * 365,
    }),
  };

  const cookieSettings: Cookie[] = [
    {
      slug: 'required',
      disabled: true,
      title: 'Обязательные',
      tag: 'Всегда включены',
      text: `Необходимы для работы сайта. Обеспечивают корзину, авторизацию и базовую навигацию.
      Не могут быть отключены.`,
      cookieTemp: ref(cookieConfig.required.value || true),
    },
    {
      slug: 'analytics',
      disabled: false,
      title: 'Аналитика',
      text: `Помогают нам понять, как посетители используют сайт (Яндекс.Метрика).
      Данные используются только в обезличенном виде для улучшения сервиса.`,
      cookieTemp: ref(cookieConfig.analytics.value),
    },
    {
      slug: 'marketing',
      disabled: false,
      title: 'Маркетинг',
      text: `Используются для показа персонализированной рекламы и отслеживания эффективности
      маркетинговых кампаний.`,
      cookieTemp: ref(cookieConfig.marketing.value),
    },
  ];

  function setCookie(action: CookieAction) {
    cookieSettings.forEach((cookieSetting) => {
      if (!cookieSetting.disabled) {
        if (action === 'save') {
          cookieConfig[cookieSetting.slug].value = cookieSetting.cookieTemp.value;
        } else if (action === 'accept') {
          cookieConfig[cookieSetting.slug].value = true;
        } else if (action === 'reject') {
          cookieConfig[cookieSetting.slug].value = false;
        }
      }
    });
    if (action === 'required') {
      cookieConfig.required.value = true;
    }
  }

  function initYandexMetrika() {
    $yandexMetrika.init({
      analytics: cookieConfig.analytics.value || false,
      marketing: cookieConfig.marketing.value || false,
    });
  }

  return {
    cookieConfig,
    cookieSettings,
    setCookie,
    initYandexMetrika,
  };
};
