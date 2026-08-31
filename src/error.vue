<script setup lang="ts">
  interface Props {
    error: {
      status?: number;
      message?: string;
    };
  }

  const { error } = defineProps<Props>();
</script>

<template>
  <section>
    <ContainerSite>
      <div
        :class="[
          'flex',
          'flex-col',
          'items-center',
          'justify-center',
          'min-h-[100vh]',
          'text-center',
        ]"
      >
        <div :class="['text-[50px]', 'font-[700]', 'text-[var(--color-orange)]', 'leading-[100%]']">
          {{ error.status }}
        </div>
        <div v-if="error.status === 404">
          <TitleSite :tag="'h1'" :class="['mb-[16px]']">Упс! Такой страницы нет</TitleSite>
          <p v-if="error.message" :class="['text-[20px]']">{{ error.message }}</p>
          <p v-else :class="['text-[20px]']">Похоже, хомяк не смог найти то, что вы искали.</p>
        </div>
        <div v-else>
          <TitleSite :tag="'h1'" :class="['mb-[16px]']">Упс! Кажется произошла ошибка</TitleSite>
          <p v-if="error.message" :class="['text-[20px]']">{{ error.message }}</p>
        </div>
        <NuxtImg src="/error/not-found.png" :class="['max-h-[300px]']" />
        <ButtonSite :type="'link'" :to="'/'">На главную</ButtonSite>
      </div>
    </ContainerSite>
  </section>
</template>

<style scoped></style>
