<script setup lang="ts">
  import { InputSite } from '@/shared/ui/input-site';
  import { useModalStore } from '@/shared/ui/modal-base';
  import {
    type Promo,
    promoSchema,
    createPromo,
    updatePromo,
    type CreatePromo,
  } from '@/entities/promo';
  import { TextareaSite } from '~/shared/ui/textarea-site';

  interface Props {
    title?: string;
    buttonText?: string;
    promo?: Promo;
    refresh: Function;
  }

  interface PromoForm {
    name: string;
    slug: string;
    content: string;
    imageVertical: string;
    imageVerticalFile: File | null;
    imageHorizontal: string;
    imageHorizontalFile: File | null;
  }

  const {
    title = 'Заголовок формы',
    buttonText = 'Текст кнопки',
    promo,
    refresh,
  } = defineProps<Props>();

  const fieldsConfig = [
    { key: 'name', placeholder: 'Название акции' },
    { key: 'slug', placeholder: 'Слаг' },
    { key: 'content', placeholder: 'Контент' },
  ] as const;

  const initialValues: PromoForm = {
    name: promo?.name ?? '',
    slug: promo?.slug ?? '',
    content: promo?.content ?? '',
    imageVertical: promo?.imageVertical ?? '',
    imageVerticalFile: null,
    imageHorizontal: promo?.imageHorizontal ?? '',
    imageHorizontalFile: null,
  };

  const {
    handleSubmit,
    errors,
    defineField,
    handleReset,
    isSubmitting,
    setFieldError,
    setFieldValue,
  } = useForm<PromoForm>({
    validationSchema: toTypedSchema(promoSchema),
    initialValues: initialValues,
  });

  const modalStore = useModalStore();
  const serverError = ref<string>();

  const fields = fieldsConfig.map((fieldConfig) => {
    const [value] = defineField(fieldConfig.key, {
      validateOnModelUpdate: false,
      validateOnBlur: false,
    });

    return {
      ...fieldConfig,
      value,
    };
  });

  const clearError = (field: keyof PromoForm) => {
    if (errors.value[field]) {
      setFieldError(field, undefined);
    }
  };

  const onSubmit = handleSubmit(
    async (values) => {
      try {
        const id = promo?.id;
        const valuesSorted: CreatePromo = {
          slug: values.slug,
          name: values.name,
          content: values.content,
          imageVertical: values.imageVerticalFile,
          imageHorizontal: values.imageHorizontalFile,
        };
        if (id) {
          await updatePromo(id, valuesSorted);
        } else {
          await createPromo(valuesSorted);
        }
        await refresh();
        handleReset();
        modalStore.close();
      } catch (e) {
        serverError.value = (e as Error).message;
      }
    },
    (validationErrors) => {
      console.log('VALIDATION ERROR', validationErrors.errors);
    }
  );

  function onImageChange(event: Event, fieldKey: 'imageVerticalFile' | 'imageHorizontalFile') {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;

    setFieldValue(fieldKey, file);
    clearError(fieldKey);
  }
</script>

<template>
  <form @submit="onSubmit" :class="['flex', 'flex-col', 'gap-[24px]', 'p-[60px_40px]']">
    <TitleSite :variant="'secondary'">{{ title }}</TitleSite>
    <div :class="['w-[100%]']" v-for="field in fields" :key="field.key">
      <TextareaSite
        v-if="field.key === 'content'"
        @input="clearError(field.key)"
        v-model="field.value.value"
        :type="'text'"
        :name="field.key"
        :placeholder="field.placeholder"
        :class="['w-[100%]', errors[field.key] ? 'border-[var(--color-error)]' : '']"
      />
      <InputSite
        v-else
        @input="clearError(field.key)"
        v-model="field.value.value"
        :type="'text'"
        :name="field.key"
        :placeholder="field.placeholder"
        :class="['w-[100%]', errors[field.key] ? 'border-[var(--color-error)]' : '']"
      />
      <div v-if="errors[field.key]" :class="['text-[var(--color-error)]', 'mt-[4px]']">
        {{ errors[field.key] }}
      </div>
    </div>
    <div>
      <div>Загрузить вертикальное изображение</div>
      <InputSite
        :type="'file'"
        accept="image/*"
        name="imageVerticalFile"
        @change="(e: Event) => onImageChange(e, 'imageVerticalFile')"
      />

      <NuxtImg v-if="promo?.imageVertical" :src="promo.imageVertical" />

      <div v-if="errors.imageVerticalFile">
        {{ errors.imageVerticalFile }}
      </div>
    </div>
    <div>
      <div>Загрузить горизонтальное изображение</div>
      <InputSite
        :type="'file'"
        accept="image/*"
        name="imageHorizontalFile"
        @change="(e: Event) => onImageChange(e, 'imageHorizontalFile')"
      />

      <NuxtImg v-if="promo?.imageHorizontal" :src="promo.imageHorizontal" />

      <div v-if="errors.imageHorizontalFile">
        {{ errors.imageHorizontalFile }}
      </div>
    </div>
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
        {{ buttonText }}
      </ButtonSite>
    </div>
    <div v-if="serverError">
      {{ serverError }}
    </div>
  </form>
</template>

<style scoped></style>
