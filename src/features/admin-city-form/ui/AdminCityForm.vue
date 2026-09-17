<script setup lang="ts">
  import { InputSite } from '@/shared/ui/input-site';
  import { vMaska } from 'maska/vue';
  import { useModalStore } from '@/shared/ui/modal-base';
  import { cityApi, useCityStore, citySchema } from '@/entities/city';
  import type { City } from '@/entities/city';

  interface Props {
    title?: string;
    buttonText?: string;
    city?: City;
  }

  interface CityForm {
    name: string;
    slug: string;
    phone: string;
    fiasId: string;
  }

  const { title = 'Заголовок формы', buttonText = 'Текст кнопки', city } = defineProps<Props>();

  const initialValues: CityForm = {
    name: city?.name ?? '',
    slug: city?.slug ?? '',
    phone: city?.phone ?? '',
    fiasId: city?.fiasId ?? '',
  };

  const { handleSubmit, errors, defineField, handleReset, isSubmitting, setFieldError } =
    useForm<CityForm>({
      validationSchema: toTypedSchema(citySchema),
      initialValues: initialValues,
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
  const [fiasId, fiasIdProps] = defineField('fiasId', {
    validateOnModelUpdate: false,
    validateOnBlur: false,
  });

  const clearError = (field: 'name' | 'slug' | 'phone' | 'fiasId') => {
    if (errors.value[field]) {
      setFieldError(field, undefined);
    }
  };

  const onSubmit = handleSubmit(async (values) => {
    try {
      const id = city?.id;
      if (id) {
        await cityApi.update(id, values);
      } else {
        await cityApi.create(values);
      }
      modalStore.close();
      handleReset();
      await cityStore.fetchCities();
    } catch (e) {
      serverError.value = (e as Error).message;
    }
  });
</script>

<template>
  <form @submit="onSubmit" :class="['flex', 'flex-col', 'gap-[24px]', 'p-[60px_40px]']">
    <TitleSite :variant="'secondary'">{{ title }}</TitleSite>
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
        :name="'slug'"
        :placeholder="'Слаг'"
        :class="['w-[100%]', errors.slug ? 'border-[var(--color-error)]' : '']"
      />
      <div v-if="errors.slug" :class="['text-[var(--color-error)]', 'mt-[4px]']">
        {{ errors.slug }}
      </div>
    </div>
    <div :class="['w-[100%]']">
      <InputSite
        @input="clearError('fiasId')"
        v-bind="fiasIdProps"
        v-model="fiasId"
        :type="'text'"
        :name="'fiasId'"
        :placeholder="'айди для геолокации ip'"
        :class="['w-[100%]', errors.fiasId ? 'border-[var(--color-error)]' : '']"
      />
      <div v-if="errors.fiasId" :class="['text-[var(--color-error)]', 'mt-[4px]']">
        {{ errors.fiasId }}
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
        {{ buttonText }}
      </ButtonSite>
    </div>
    <div v-if="serverError">
      {{ serverError }}
    </div>
  </form>
</template>

<style scoped></style>
