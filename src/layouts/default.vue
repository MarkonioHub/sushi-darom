<script setup lang="ts">
  import { HeaderAside } from '@/widgets/header-aside';
  import { HeaderSite } from '@/widgets/header-site';
  import { FooterSite } from '@/widgets/footer-site';
  import { FooterAside } from '@/widgets/footer-aside';
  import { MobileMenu } from '@/widgets/mobile-menu';
  import { ModalBase } from '@/shared/ui/modal-base';
  import { OverlaySite } from '@/shared/ui/overlay-site';
  import { CookieInformer } from '@/features/cookie-settings';
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
    <CookieInformer />
  </div>
</template>

<style scoped></style>
