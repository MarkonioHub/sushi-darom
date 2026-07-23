<script setup lang="ts">
  import { z } from 'zod';
  import { toTypedSchema } from '@vee-validate/zod';
  import { vMaska } from 'maska/vue';
  import { ButtonSite, InputSite } from '@/shared/ui';
  import { TextareaSite } from '@/shared/ui';
  import { SelectSite } from '@/shared/ui';
  import { ModalThanks } from '@/entities/review';
  import { useModalStore } from '@/shared/model';
  import type { SelectOption } from '@/shared/model';

  const modalStore = useModalStore();
  const fileTypes = [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'application/rtf',
    'text/rtf',
    'application/msword',
    'text/plain',
  ];
  const fileSize = 5 * 1024 * 1024;

  const validationSchema = toTypedSchema(
    z.object({
      name: z.string().min(1, 'Имя обязательно для заполнения'),
      surname: z.string().optional(),
      phone: z
        .string()
        .min(1, 'Телефон обязателен для заполнения')
        .length(18, 'Укажите полный номер телефона'),
      email: z.string().email('Некорректный формат email').optional().or(z.literal('')),
      city: z.string().min(1, 'Выберите город'),
      theme: z.string().min(1, 'Выберите тему отзыва'),
      message: z.string().min(1, 'Опишите отзыв'),
      file: z
        .instanceof(File)
        .optional()
        .refine((val) => !val || val.size <= fileSize, `Максимальный размер файла 5 МБ`)
        .refine(
          (val) => !val || fileTypes.includes(val.type),
          'Только форматы .pdf, .jpeg, .png, .rtf, .doc, .txt'
        ),
    })
  );

  const { handleSubmit, errors, defineField, handleReset, isSubmitting, setFieldError } = useForm({
    validationSchema,
    initialValues: {
      name: '',
      surname: '',
      phone: '',
      email: '',
      city: 'krasnodar-id',
      theme: '',
      message: '',
      file: undefined,
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
  const { value: file, setValue: setFileValue } = useField<File | undefined>('file');

  const clearError = (field: 'name' | 'surname' | 'phone' | 'email' | 'message' | 'file') => {
    if (errors.value[field]) {
      setFieldError(field, undefined);
    }
  };

  const onFileChange = (event: Event) => {
    clearError('file');
    const target = event.target as HTMLInputElement;
    const selectedFile = target.files?.[0];

    if (!selectedFile) {
      setFileValue(undefined);
      return;
    }

    const isWrongType = !fileTypes.includes(selectedFile.type);
    const isWrongSize = selectedFile.size > fileSize;

    if (isWrongType || isWrongSize) {
      setFileValue(undefined);
      if (fileInputRef.value) {
        fileInputRef.value.value = '';
      }
      if (isWrongSize) {
        setFieldError('file', 'Максимальный размер файла 5 МБ');
      } else {
        setFieldError('file', 'Только форматы .pdf, .jpeg, .png, .rtf, .doc, .txt');
      }
    } else {
      setFileValue(selectedFile);
    }
  };

  const onSubmit = handleSubmit(async (values) => {
    console.log('Отправка данных: ', values);
    modalStore.open(ModalThanks, 'small');
    handleReset();
  });

  const optionsCity = ref<SelectOption[]>([
    { label: 'Краснодар', value: 'krasnodar-id' },
    { label: 'Сочи', value: 'sochi-id' },
  ]);

  const optionsTheme = ref<SelectOption[]>([
    { label: 'Благодарность', value: 'id-1' },
    { label: 'Вопрос/консультация', value: 'id-2' },
    { label: 'Пожаловаться', value: 'id-3' },
    { label: 'Замечания по работе сайта/приложения', value: 'id-4' },
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
      <SelectSite v-model="city" :options="optionsCity" :error="errors.city" />
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
