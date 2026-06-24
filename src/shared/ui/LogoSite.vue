<script setup lang="ts">
  const route = useRoute();
  const isHomePage = computed(() => route.path === '/');
</script>

<template>
  <div v-if="isHomePage" class="flex items-center p-[5px]">
    <IconApp
      name="app:logo"
      class="h-[18px] w-[161px] transition-opacity duration-[var(--transition-duration)] group-hover:opacity-[0.6] sm:h-[22px] sm:w-[197px]"
    />
  </div>
  <NuxtLink v-else to="/" class="group flex items-center p-[5px]">
    <IconApp
      name="app:logo"
      class="h-[18px] w-[161px] transition-opacity duration-[var(--transition-duration)] group-hover:opacity-[0.6] sm:h-[22px] sm:w-[197px]"
    />
  </NuxtLink>
</template>

<style scoped></style>
