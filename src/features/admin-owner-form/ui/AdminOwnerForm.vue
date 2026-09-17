<script setup lang="ts">
  import { InputSite } from '@/shared/ui/input-site';
  import { useModalStore } from '@/shared/ui/modal-base';
  import { ownerApi, ownerSchema } from '@/entities/owner';
  import type { Owner } from '@/entities/owner';

  interface Props {
    title?: string;
    buttonText?: string;
    owner?: Owner;
    refresh: Function;
  }

  interface OwnerForm {
    name: string;
    inn: string;
    ogrn: string;
  }

  const {
    title = 'Заголовок формы',
    buttonText = 'Текст кнопки',
    owner,
    refresh,
  } = defineProps<Props>();

  const initialValues: OwnerForm = {
    name: owner?.name ?? '',
    inn: owner?.inn ?? '',
    ogrn: owner?.ogrn ?? '',
  };

  const { handleSubmit, errors, defineField, handleReset, isSubmitting, setFieldError } = useForm({
    validationSchema: toTypedSchema(ownerSchema),
    initialValues: initialValues,
  });

  const modalStore = useModalStore();
  const serverError = ref<string>();

  const [name, nameProps] = defineField('name', {
    validateOnModelUpdate: false,
    validateOnBlur: false,
  });
  const [inn, innProps] = defineField('inn', {
    validateOnModelUpdate: false,
    validateOnBlur: false,
  });
  const [ogrn, ogrnProps] = defineField('ogrn', {
    validateOnModelUpdate: false,
    validateOnBlur: false,
  });

  const clearError = (field: 'name' | 'inn' | 'ogrn') => {
    if (errors.value[field]) {
      setFieldError(field, undefined);
    }
  };

  const onSubmit = handleSubmit(async (values) => {
    try {
      const id = owner?.id;
      if (id) {
        await ownerApi.update(id, values);
      } else {
        await ownerApi.create(values);
      }
      await refresh();
      handleReset();
      modalStore.close();
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
        @input="clearError('inn')"
        v-bind="innProps"
        v-model="inn"
        :type="'text'"
        :name="'inn'"
        :placeholder="'ИНН'"
        :class="['w-[100%]', errors.inn ? 'border-[var(--color-error)]' : '']"
      />
      <div v-if="errors.inn" :class="['text-[var(--color-error)]', 'mt-[4px]']">
        {{ errors.inn }}
      </div>
    </div>
    <div :class="['w-[100%]']">
      <InputSite
        @input="clearError('ogrn')"
        v-bind="ogrnProps"
        v-model="ogrn"
        :type="'text'"
        :name="'ogrn'"
        :placeholder="'ОГРН'"
        :class="['w-[100%]', errors.ogrn ? 'border-[var(--color-error)]' : '']"
      />
      <div v-if="errors.ogrn" :class="['text-[var(--color-error)]', 'mt-[4px]']">
        {{ errors.ogrn }}
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
