<script setup lang="ts">
  import { FeedbackForm } from '@/features/feedback-form';
</script>

<template>
  <div :class="['mb-[80px]']">
    <ContainerSite>
      <div :class="['max-w-[644px]', 'm-[0_auto]', 'font-[600]']">
        <h1 :class="['lg:text-[40px]', 'mb-[10px]', 'font-[600]', 'text-[32px]']">
          Оставить отзыв
        </h1>
        <div :class="['text-[16px]', 'mb-[20px]']">
          Поделитесь своим отзывом через форму обратной связи
        </div>
        <FeedbackForm />
      </div>
    </ContainerSite>
  </div>
</template>

<style scoped></style>
