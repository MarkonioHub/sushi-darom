import { defineConfig } from 'eslint-define-config';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import vuePlugin from 'eslint-plugin-vue';

export default defineConfig([
  {
    ignores: ['.nuxt/**', 'dist/**'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2023,
      },
      globals: {
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        NodeJS: 'readonly',
      },
    },
    plugins: {
      vue: vuePlugin,
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/html-indent': 'off',
      'vue/no-unused-vars': 'warn',
      'vue/require-prop-types': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-function-return-type': 'off',
      'no-unused-vars': 'off',
      indent: 'off',
      '@typescript-eslint/indent': 'off',
    },
  },
]);
