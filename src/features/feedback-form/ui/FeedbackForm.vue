<script setup lang="ts">
  import { vMaska } from 'maska/vue';
  import { InputSite } from '@/shared/ui/input-site';
  import { TextareaSite } from '@/shared/ui/textarea-site';
  import { SelectSite, type SelectOption } from '@/shared/ui/select-site';
  import { type CreateReview, reviewSchema } from '@/entities/review';
  import { ReviewThanks } from '@/entities/review/ui';
  import { useModalStore } from '@/shared/ui/modal-base';
  import { useCityStore, type City } from '@/entities/city';
  import { createReview } from '@/entities/review/model/api';

  const cityStore = useCityStore();
  const { cities, currentCity } = storeToRefs(cityStore);

  const cityOptions = computed(() => {
    return cities.value.map((city: City) => ({
      label: city.name,
      value: city.id,
    }));
  });

  const modalStore = useModalStore();

  const {
    handleSubmit,
    errors,
    defineField,
    handleReset,
    isSubmitting,
    setFieldError,
    setFieldValue,
  } = useForm<CreateReview>({
    validationSchema: toTypedSchema(reviewSchema),
    initialValues: {
      name: '',
      surname: '',
      phone: '',
      email: '',
      city: currentCity.value?.id || '',
      theme: 'Благодарность',
      message: '',
      file: null,
    },
  });
  const fileInputRef = ref<HTMLInputElement | null>(null);
  const [name, nameProps] = defineField('name', {
    validateOnModelUpdate: false,
    validateOnBlur: false,
  });
  const [surname, surnameProps] = defineField('surname', {
    validateOnModelUpdate: false,
    validateOnBlur: false,
  });
  const [phone, phoneProps] = defineField('phone', {
    validateOnModelUpdate: false,
    validateOnInput: false,
    validateOnBlur: false,
  });
  const [email, emailProps] = defineField('email', {
    validateOnModelUpdate: false,
    validateOnBlur: false,
  });
  const [city] = defineField('city');
  const [theme] = defineField('theme');
  const [message, messageProps] = defineField('message', {
    validateOnModelUpdate: false,
    validateOnBlur: false,
  });
  const [file] = defineField('file', {
    validateOnModelUpdate: false,
    validateOnBlur: false,
  });

  const clearError = (field: 'name' | 'surname' | 'phone' | 'email' | 'message' | 'file') => {
    if (errors.value[field]) {
      setFieldError(field, undefined);
    }
  };

  function onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;

    setFieldValue('file', file);
    clearError('file');
  }

  const onSubmit = handleSubmit(async (values) => {
    await createReview(values);
    await modalStore.open(ReviewThanks, 'small');
    handleReset();
  });

  const optionsTheme = ref<SelectOption[]>([
    { label: 'Благодарность', value: 'Благодарность' },
    { label: 'Вопрос/консультация', value: 'Вопрос/консультация' },
    { label: 'Пожаловаться', value: 'Пожаловаться' },
    {
      label: 'Замечания по работе сайта/приложения',
      value: 'Замечания по работе сайта/приложения',
    },
  ]);
</script>

<template>
  <form @submit="onSubmit" :class="['flex', 'flex-wrap', 'gap-[24px]']">
    <div :class="['lg:w-[calc(50%-12px)]', 'w-[100%]']">
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
    <div :class="['lg:w-[calc(50%-12px)]', 'w-[100%]']">
      <InputSite
        @input="clearError('surname')"
        v-bind="surnameProps"
        v-model="surname"
        :type="'text'"
        :name="'surname'"
        :placeholder="'Фамилия'"
        :class="['w-[100%]', errors.surname ? 'border-[var(--color-error)]' : '']"
      />
      <div v-if="errors.surname" :class="['text-[var(--color-error)]', 'mt-[4px]']">
        {{ errors.surname }}
      </div>
    </div>
    <div :class="['lg:w-[calc(50%-12px)]', 'w-[100%]']">
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
    <div :class="['lg:w-[calc(50%-12px)]', 'w-[100%]']">
      <InputSite
        @input="clearError('email')"
        v-bind="emailProps"
        v-model="email"
        :type="'email'"
        :name="'email'"
        :placeholder="'Электронная почта'"
        :class="['w-[100%]', errors.email ? 'border-[var(--color-error)]' : '']"
      />
      <div v-if="errors.email" :class="['text-[var(--color-error)]', 'mt-[4px]']">
        {{ errors.email }}
      </div>
    </div>
    <div :class="['lg:w-[calc(50%-12px)]', 'w-[100%]']">
      <SelectSite
        v-model="city"
        :options="cityOptions"
        :error="errors.city"
        :placeholder="'Выберите город'"
      />
      <div v-if="errors.city" :class="['text-[var(--color-error)]', 'mt-[4px]']">
        {{ errors.city }}
      </div>
    </div>
    <div :class="['lg:w-[calc(50%-12px)]', 'w-[100%]']">
      <SelectSite
        v-model="theme"
        :placeholder="'Выберите тему отзыва'"
        :options="optionsTheme"
        :error="errors.theme"
      />
      <div v-if="errors.theme" :class="['text-[var(--color-error)]', 'mt-[4px]']">
        {{ errors.theme }}
      </div>
    </div>
    <div :class="['w-[100%]']">
      <TextareaSite
        @input="clearError('message')"
        v-bind="messageProps"
        v-model="message"
        :name="'message'"
        :placeholder="'Сообщение'"
        :class="[errors.message ? 'border-[var(--color-error)]' : '']"
      />
      <div v-if="errors.message" :class="['w-[100%]', 'text-[var(--color-error)]', 'mt-[4px]']">
        {{ errors.message }}
      </div>
    </div>
    <div :class="['w-[100%]']">
      <label
        :class="[
          'min-h-[140px]',
          'rounded-[16px]',
          'p-[30px]',
          'flex',
          'flex-col',
          'items-center',
          'justify-center',
          'w-[100%]',
          'bg-[var(--primary-background)]',
          'border',
          'border-dashed',
          'border-[var(--tertiary-background)]',
          'hover:border-[var(--border-color-active)]',
          'transition-colors',
          'duration-[var(--transition-duration)]',
          'cursor-pointer',
        ]"
      >
        <InputSite
          @change="onFileChange"
          ref="fileInputRef"
          :type="'file'"
          :name="'file'"
          :accept="'.pdf, .jpeg, .jpg, .png, .rtf, .doc, .txt'"
          :class="['hidden']"
        />
        <div v-if="file">{{ file.name }}</div>
        <div v-else :class="['text-[16px]', 'text-center']">
          <div :class="['hidden', 'lg:block']">
            Перетащите файл сюда или
            <span :class="['text-[var(--color-acent)]']">выберите на устройстве</span>
          </div>
          <div :class="['lg:hidden', 'flex', 'items-center', 'gap-[5px]', 'justify-center']">
            <IconApp name="app:clip" class="h-[20px] w-[19px]" />
            <span :class="['text-[var(--color-acent)]']">Прикрепить файл</span>
          </div>
          <div>.pdf, .jpeg, .png, .rtf, .doc, .txt, до 5 Мб</div>
        </div>
      </label>
      <div v-if="errors.file" :class="['w-[100%]', 'text-[var(--color-error)]', 'mt-[4px]']">
        {{ errors.file }}
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
        Отправить
      </ButtonSite>
      <div :class="['max-w-[300px]', 'text-[var(--color-secondary)]', 'shrink-0']">
        Нажимая «Отправить», я даю своё согласие на обработку персональных данных
      </div>
    </div>
  </form>
</template>

<style scoped></style>
