<script setup lang="ts">
  import { CONTACTS } from '@/shared/lib';
</script>

<template>
  <div>
    <ContainerSite>
      <div
        class="flex flex-wrap items-center justify-between gap-[0_20px] py-[10px] lg:py-0 xl:gap-[60px]"
      >
        <div
          class="hidden cursor-pointer items-center gap-[8px] py-[10px] transition-colors duration-[var(--transition-duration)] hover:text-[var(--color-secondary)] lg:flex"
        >
          <IconApp name="app:location" class-name="text-[12px]" />
          Краснодар
        </div>
        <div class="flex cursor-pointer items-center gap-[8px] lg:py-[10px]">
          <IconApp name="app:map-pin" class-name="text-[17px] shrink-0" />
          <div class="shrink-0 font-semibold">Самовывоз</div>
          <div class="text-[var(--color-secondary)]">ул. Лизы Чайкиной, 2/1</div>
          <IconApp name="app:edit" class-name="w-[17px] h-[24px] shrink-0" />
        </div>
        <div class="font-semibold text-[var(--color-secondary)]">
          Среднее время ожидания: 30 минут
        </div>
        <NuxtLink
          to="/"
          class="hidden items-center gap-[8px] transition-colors duration-[var(--transition-duration)] hover:text-[var(--color-secondary)] lg:flex lg:py-[10px] xl:ml-auto"
        >
          <IconApp name="app:chat" class-name="text-[12px]" />
          Оставить отзыв
        </NuxtLink>
        <a
          :href="`tel:${CONTACTS.phone}`"
          class="hidden items-center gap-[8px] transition-colors duration-[var(--transition-duration)] hover:text-[var(--color-secondary)] lg:flex lg:py-[10px]"
        >
          <IconApp name="app:phone" class-name="text-[12px]" />
          {{ CONTACTS.phone }}
        </a>
      </div>
    </ContainerSite>
  </div>
</template>

<style scoped></style>
