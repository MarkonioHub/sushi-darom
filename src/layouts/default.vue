<script setup lang="ts">
  import { HeaderAside } from '@/widgets/header-aside';
  import { HeaderSite } from '@/widgets/header-site';
  import { FooterSite } from '@/widgets/footer-site';
  import { FooterAside } from '@/widgets/footer-aside';
  import { MobileMenu } from '@/widgets/mobile-menu';
  import { OverlaySite } from '@/shared/ui';
  import { ModalBase } from '@/shared/ui/';
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
    <MobileMenu />
    <OverlaySite />
    <ModalBase />
  </div>
</template>

<style scoped></style>
