import type { Config } from 'tailwindcss';

export default <Partial<Config>>{
  content: [
    './src/components/**/*.{vue,js,ts}',
    './src/layouts/**/*.vue',
    './src/pages/**/*.vue',
    './src/widgets/**/*.vue',
    './src/features/**/*.vue',
    './src/entities/**/*.vue',
    './src/shared/**/*.vue',
    './src/app.vue',
  ],

  theme: {
    extend: {},
  },

  plugins: [],
};
