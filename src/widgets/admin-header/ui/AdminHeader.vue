<script setup lang="ts">
  import { HEADER_ADMIN_NAV } from '@/shared/lib';
</script>

<template>
  <header :class="['sticky', 'top-0', 'bg-[var(--color-orange)]', 'text-[#ffffff]', 'mb-[20px]']">
    <ul :class="['flex', 'flex-wrap', 'p-[20px]']">
      <li v-for="item in HEADER_ADMIN_NAV">
        <NuxtLink
          v-if="item.type === 'link'"
          :to="item.to"
          :class="[
            'p-[10px]',
            'transition-colors',
            'duration-[var(--transition-duration)]',
            'hover:text-[var(--color-secondary)]',
          ]"
        >
          {{ item.text }}
        </NuxtLink>
        <a
          v-else
          :href="item.href"
          target="_blank"
          rel="noreferrer"
          :class="[
            'p-[10px]',
            'transition-colors',
            'duration-[var(--transition-duration)]',
            'hover:text-[var(--color-secondary)]',
          ]"
        >
          {{ item.text }}
        </a>
      </li>
    </ul>
  </header>
</template>

<style scoped></style>
