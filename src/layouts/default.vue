<script setup lang="ts">
  import { HeaderAside } from '@/widgets/header-aside';
  import { HeaderSite } from '@/widgets/header-site';
  import { FooterSite } from '@/widgets/footer-site';
  import { FooterAside } from '@/widgets/footer-aside';
</script>

<template>
  <div class="site">
    <HeaderAside />
    <HeaderSite />
    <main>
      <slot />
    </main>
    <FooterSite />
    <FooterAside />
  </div>
</template>

<style scoped></style>
