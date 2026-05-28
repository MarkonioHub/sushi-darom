<script setup lang="ts">
  const route = useRoute();
  const isHomePage = computed(() => route.path === '/');
</script>

<template>
  <div v-if="isHomePage" class="flex items-center p-[5px]">
    <IconApp
      name="app:logo"
      class-name="w-[161px] h-[18px] sm:w-[197px] sm:h-[22px]
          duration-[var(--transition-duration)] transition-opacity group-hover:opacity-[0.6]"
    />
  </div>
  <NuxtLink v-else to="/" class="group flex items-center p-[5px]">
    <IconApp
      name="app:logo"
      class-name="w-[161px] h-[18px] sm:w-[197px] sm:h-[22px]
          duration-[var(--transition-duration)] transition-opacity group-hover:opacity-[0.6]"
    />
  </NuxtLink>
</template>

<style scoped></style>
