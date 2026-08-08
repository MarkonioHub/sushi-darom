<script setup lang="ts">
  import { InputSite } from '@/shared/ui/input-site';
  import { useModalStore } from '@/shared/ui/modal-base';
  import {
    categoryApi,
    useCategoryStore,
    createCategorySchema,
    categorySchema,
  } from '@/entities/category';
  import type { Category } from '@/entities/category';

  interface Props {
    id?: string;
    title?: string;
    buttonText?: string;
    category?: Category;
  }

  const props = withDefaults(defineProps<Props>(), {
    title: 'Заголовок формы',
    buttonText: 'Текст кнопки',
  });

  const initialValues = props.category?.id
    ? {
        id: props.category?.id || undefined,
        name: props.category?.name || '',
        slug: props.category?.slug || '',
      }
    : {
        name: props.category?.name || '',
        slug: props.category?.slug || '',
      };

  const validationSchema = props.category?.id
    ? toTypedSchema(categorySchema)
    : toTypedSchema(createCategorySchema);

  const { handleSubmit, errors, defineField, handleReset, isSubmitting, setFieldError } = useForm({
    validationSchema: validationSchema,
    initialValues: initialValues,
  });

  const modalStore = useModalStore();
  const categoryStore = useCategoryStore();
  const serverError = ref<string>();

  const [name, nameProps] = defineField('name', {
    validateOnModelUpdate: false,
    validateOnBlur: false,
  });
  const [slug, slugProps] = defineField('slug', {
    validateOnModelUpdate: false,
    validateOnBlur: false,
  });

  const clearError = (field: 'name' | 'slug') => {
    if (errors.value[field]) {
      setFieldError(field, undefined);
    }
  };

  const onSubmit = handleSubmit(async (values) => {
    try {
      const id = props.category?.id;
      if (id) {
        await categoryApi.update(id, { ...values, isActive: true });
      } else {
        await categoryApi.create({ ...values, isActive: true });
      }
      modalStore.close();
      handleReset();
      await categoryStore.fetchCategories();
    } catch (e) {
      serverError.value = (e as Error).message;
    }
  });
</script>

<template>
  <form @submit="onSubmit" :class="['flex', 'flex-col', 'gap-[24px]', 'p-[60px_40px]']">
    <TitleSite :variant="'secondary'">{{ props.title }}</TitleSite>
    <div :class="['w-[100%]']">
      <InputSite
        @input="clearError('name')"
        v-bind="nameProps"
        v-model="name"
        :type="'text'"
        :name="'name'"
        :placeholder="'Имя'"
        :class="['w-[100%]', errors.name ? 'border-[var(--color-error)]' : '']"
      />
      <div v-if="errors.name" :class="['text-[var(--color-error)]', 'mt-[4px]']">
        {{ errors.name }}
      </div>
    </div>
    <div :class="['w-[100%]']">
      <InputSite
        @input="clearError('slug')"
        v-bind="slugProps"
        v-model="slug"
        :type="'text'"
        :name="'name'"
        :placeholder="'Слаг'"
        :class="['w-[100%]', errors.slug ? 'border-[var(--color-error)]' : '']"
      />
      <div v-if="errors.slug" :class="['text-[var(--color-error)]', 'mt-[4px]']">
        {{ errors.slug }}
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
        {{ props.buttonText }}
      </ButtonSite>
    </div>
    <div v-if="serverError">
      {{ serverError }}
    </div>
  </form>
</template>

<style scoped></style>
