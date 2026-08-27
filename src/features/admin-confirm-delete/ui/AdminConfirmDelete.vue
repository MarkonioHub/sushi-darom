<script setup lang="ts">
  interface Props {
    title?: string;
    handler: Function;
    refresh: Function;
  }

  const { title = 'заголовок формы', handler, refresh } = defineProps<Props>();

  const serverError = ref<string>();
  const isSubmitting = ref(false);

  async function onSubmit() {
    isSubmitting.value = true;
    try {
      await handler();
      await refresh();
    } catch (e) {
      serverError.value = (e as Error).message;
    }
  }
</script>

<template>
  <form @submit="onSubmit" :class="['flex', 'flex-col', 'gap-[24px]', 'p-[60px_40px]']">
    <TitleSite :variant="'secondary'">{{ title }}</TitleSite>
    <div
      :class="[
        'flex',
        'lg:items-center',
        'gap-[20px]',
        'w-[100%]',
        'flex-col-reverse',
        'lg:flex-row',
      ]"
    >
      <ButtonSite
        :type="'button'"
        :class="['w-[100%]']"
        :disabled="isSubmitting"
        :buttonType="'submit'"
      >
        Удалить
      </ButtonSite>
    </div>
    <div v-if="serverError">
      {{ serverError }}
    </div>
  </form>
</template>

<style scoped></style>
