<script setup lang="ts">
import { HeaderAside } from '@/widgets/header-aside';
import { HeaderSite } from '@/widgets/header-site';
import { FooterSite } from '@/widgets/footer-site';
</script>

<template>
  <div class="site">
    <HeaderAside />
    <HeaderSite />
    <main>
      <slot />
    </main>
    <FooterSite />
  </div>
</template>

<style scoped></style>
