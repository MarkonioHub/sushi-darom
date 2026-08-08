<script setup lang="ts">
  import { useModalStore } from '@/shared/ui/modal-base';

  const props = defineProps({
    title: {
      type: String,
      default: 'Заголовок формы',
    },
    buttonText: {
      type: String,
      default: 'Текст кнопки',
    },
    handler: {
      type: Function,
      required: true,
    },
    callback: {
      type: Function,
    },
  });

  const modalStore = useModalStore();
  const serverError = ref<string>();
  const isSubmitting = ref(false);

  async function onSubmit() {
    isSubmitting.value = true;
    try {
      await props.handler();
      modalStore.close();
      if (props.callback) props.callback();
    } catch (e) {
      serverError.value = (e as Error).message;
    }
  }
</script>

<template>
  <form @submit="onSubmit" :class="['flex', 'flex-col', 'gap-[24px]', 'p-[60px_40px]']">
    <TitleSite :variant="'secondary'">{{ props.title }}</TitleSite>
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
