<script setup lang="ts">
  import { FeedbackForm } from '@/features/feedback-form';
</script>

<template>
  <section :class="['mb-[80px]']">
    <ContainerSite>
      <div :class="['max-w-[644px]', 'm-[0_auto]', 'font-[600]']">
        <TitleSite :class="['mb-[10px]']" :tag="'h1'">Оставить отзыв</TitleSite>
        <div :class="['text-[16px]', 'mb-[20px]']">
          Поделитесь своим отзывом через форму обратной связи
        </div>
        <FeedbackForm />
      </div>
    </ContainerSite>
  </section>
</template>

<style scoped></style>
