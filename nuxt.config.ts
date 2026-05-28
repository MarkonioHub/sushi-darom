export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  srcDir: 'src',
  vite: {
    optimizeDeps: {
      include: ['@vue/devtools-core', '@vue/devtools-kit'],
    },
  },
  components: [
    {
      path: '~/shared/ui/global',
      pathPrefix: false,
      global: true,
    },
  ],
  alias: {
    '@app': '/src/app',
    '@shared': '/src/shared',
    '@entities': '/src/entities',
    '@features': '/src/features',
    '@widgets': '/src/widgets',
    '@pages': '/src/pages',
  },
  css: ['@/app/styles/globals.css'],
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxt/icon',
    '@nuxt/image',
    'nuxt-swiper',
    'vue-yandex-maps/nuxt',
  ],
  yandexMaps: {
    apikey: import.meta.env.NUXT_PUBLIC_YANDEX_MAPS_API_KEY,
  },
  runtimeConfig: {
    public: {
      yandexMapsApiKey: '',
    },
  },
  icon: {
    customCollections: [
      {
        prefix: 'app',
        dir: './src/shared/assets/icons',
      },
    ],
  },
  app: {
    head: {
      link: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: '/favicon.svg',
        },
        {
          rel: 'alternate icon',
          href: '/favicon.ico',
        },
        {
          rel: 'apple-touch-icon',
          href: '/apple-touch-icon.png',
        },
      ],
    },
  },
});
