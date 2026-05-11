<script setup lang="ts">
import { SiteHeader } from "@/widgets/site-header";
import { SiteFooter } from "@/widgets/site-footer";
</script>

<template>
  <div class="site">
    <SiteHeader/>
    <main>
      <slot />
    </main>
    <SiteFooter/>
  </div>
</template>

<style scoped>

</style>