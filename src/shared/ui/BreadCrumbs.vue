<script setup lang="ts">
  import { useBreadcrumbs } from '../lib/hooks/useBreadcrumbs';

  const { breadcrumbs } = useBreadcrumbs();
</script>

<template>
  <div :class="['my-[10px]']">
    <ContainerSite>
      <nav>
        <ul :class="['flex', 'items-center', 'gap-[5px]']">
          <li v-for="(item, index) in breadcrumbs" :key="item.title">
            <NuxtLink
              v-if="item.to"
              :to="item.to"
              :class="[
                'text-[16px]',
                'py-[10px]',
                'inline-block',
                'hover:text-[var(--color-secondary)]',
                'transition-colors',
                'duration-[var(--transition-duration)]',
              ]"
            >
              {{ item.title }}
            </NuxtLink>
            <span v-else :class="['text-[16px]']">{{ item.title }}</span>
            <span v-if="index !== breadcrumbs.length - 1" :class="['text-[16px]', 'ml-[2px]']">
              /
            </span>
          </li>
        </ul>
      </nav>
    </ContainerSite>
  </div>
</template>

<style scoped></style>
