export default defineNuxtPlugin(() => {
  const router = useRouter();
  const counterId = 'XXXXXXXX';

  const loadScript = () => {
    if (window.ym) return;

    (function (
      m: Window,
      e: Document,
      t: string,
      r: string,
      i: 'ym',
      k?: HTMLScriptElement,
      a?: Element | null
    ) {
      m[i] =
        m[i] ||
        function (...args: unknown[]) {
          const ym = m[i];

          if (typeof ym !== 'function') return;

          ym.a = ym.a || [];
          ym.a.push(args);
        };

      m[i].l = Date.now();

      for (const script of e.scripts) {
        if (script.src === r) {
          return;
        }
      }

      k = e.createElement(t) as HTMLScriptElement;
      a = e.getElementsByTagName(t)[0];

      k.async = true;
      k.src = r;

      a?.parentNode?.insertBefore(k, a);
    })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');
  };

  let metrikaInitialized = false;

  const initMetrika = (options: { analytics: boolean; marketing: boolean }) => {
    if (!options.analytics || metrikaInitialized) return;

    metrikaInitialized = true;

    loadScript();

    const config = {
      clickmap: options.marketing,
      trackLinks: options.marketing,
      accurateTrackBounce: options.analytics,
      webvisor: options.marketing,
      ecommerce: options.marketing,
    };

    window.ym?.(counterId, 'init', config);

    router.afterEach((to) => {
      window.ym?.(counterId, 'hit', to.fullPath);
    });
  };

  return {
    provide: {
      yandexMetrika: {
        init: initMetrika,

        reachGoal: (goalId: string, params?: Record<string, unknown>) => {
          window.ym?.(counterId, 'reachGoal', goalId, params);
        },
      },
    },
  };
});
