// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  srcDir: 'src/',
  components: false,
  alias: {
    '@app': '/src/app',
    '@shared': '/src/shared',
    '@entities': '/src/entities',
    '@features': '/src/features',
    '@widgets': '/src/widgets',
    '@pages': '/src/pages',
  },

  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt']
})