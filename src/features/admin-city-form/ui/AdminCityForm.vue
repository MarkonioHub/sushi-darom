<script setup lang="ts">
  import { ButtonSite, InputSite } from '@/shared/ui';
  import { vMaska } from 'maska/vue';
  import { useModalStore } from '@/shared/model';
  import { createCity, useCityStore } from '@/entities/city';
  import { createCitySchema } from '@/entities/city';

  const { handleSubmit, errors, defineField, handleReset, isSubmitting, setFieldError } = useForm({
    validationSchema: toTypedSchema(createCitySchema),
    initialValues: {
      name: '',
      slug: '',
      phone: '',
    },
  });

  const modalStore = useModalStore();
  const cityStore = useCityStore();
  const serverError = ref<string>();

  const [name, nameProps] = defineField('name', {
    validateOnModelUpdate: false,
    validateOnBlur: false,
  });
  const [slug, slugProps] = defineField('slug', {
    validateOnModelUpdate: false,
    validateOnBlur: false,
  });
  const [phone, phoneProps] = defineField('phone', {
    validateOnModelUpdate: false,
    validateOnInput: false,
    validateOnBlur: false,
  });

  const clearError = (field: 'name' | 'slug' | 'phone') => {
    if (errors.value[field]) {
      setFieldError(field, undefined);
    }
  };

  const onSubmit = handleSubmit(async (values) => {
    try {
      await createCity(values);
    } catch (e) {
      serverError.value = (e as Error).message;
    }
    await createCity(values);
    await cityStore.fetchCities();
    modalStore.close();
    handleReset();
  });
</script>

<template>
  <form @submit="onSubmit" :class="['flex', 'flex-col', 'gap-[24px]', 'p-[60px_40px]']">
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
    <div :class="['w-[100%]']">
      <InputSite
        @input="clearError('phone')"
        v-bind="phoneProps"
        v-model="phone"
        :type="'tel'"
        :name="'phone'"
        :placeholder="'+7 (000) 000-00-00'"
        :class="['w-[100%]', errors.phone ? 'border-[var(--color-error)]' : '']"
        v-maska
        data-maska="+7 (###) ###-##-##"
      />
      <div v-if="errors.phone" :class="['text-[var(--color-error)]', 'mt-[4px]']">
        {{ errors.phone }}
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
        Создать
      </ButtonSite>
    </div>
    <div v-if="serverError">
      {{ serverError }}
    </div>
  </form>
</template>

<style scoped></style>
