<script setup lang="ts">
  import { TitleSite } from '@/shared/ui';
  import { z } from 'zod';
  import { InputSite } from '@/shared/ui';
  import { ButtonSite } from '@/shared/ui';
  import { vMaska } from 'maska/vue';

  const validationSchema = toTypedSchema(
    z.object({
      phone: z
        .string()
        .min(1, 'Телефон обязателен для заполнения')
        .length(18, 'Укажите полный номер телефона'),
      policy: z.literal(true, {
        errorMap: () => ({
          message: 'Чтобы продолжить, необходимо согласие на обработку персональных данных.',
        }),
      }),
      communication: z.boolean(),
    })
  );

  const { handleSubmit, errors, defineField, handleReset, isSubmitting, setFieldError } = useForm({
    validationSchema,
    initialValues: {
      phone: '',
      policy: undefined,
      communication: false,
    },
  });

  const clearError = (field: 'phone') => {
    if (errors.value[field]) {
      setFieldError(field, undefined);
    }
  };

  const [phone, phoneProps] = defineField('phone', {
    validateOnModelUpdate: false,
    validateOnInput: false,
    validateOnBlur: false,
  });

  const [policy, policyProps] = defineField('policy', {
    validateOnModelUpdate: false,
    validateOnBlur: false,
  });

  const [communication, communicationProps] = defineField('communication', {
    validateOnModelUpdate: false,
    validateOnBlur: false,
  });

  const onSubmit = handleSubmit(async (values) => {
    console.log('Отправка данных: ', values);
    handleReset();
  });
</script>

<template>
  <div :class="['p-[30px_40px]']">
    <TitleSite :variant="'secondary'" :class="['mb-[20px]']">Войдите, чтобы продолжить</TitleSite>
    <form>
      <label :class="['mb-[20px]', 'w-[100%]', 'block']">
        <InputSite
          @input="clearError('phone')"
          :name="'phone'"
          v-model="phone"
          v-bind="phoneProps"
          :type="'tel'"
          :placeholder="'+7 (000) 000-00-00'"
          v-maska
          data-maska="+7 (###) ###-##-##"
          :class="['w-[100%]', errors.phone ? 'border-[var(--color-error)]' : '']"
        />
        <span
          v-if="errors.phone || errors.policy"
          :class="['text-[var(--color-error)]', 'mt-[4px]', 'block']"
        >
          {{ errors.phone || errors.policy }}
        </span>
      </label>
      <div
        :class="['text-[14px]', 'leading-[18px]', 'flex', 'items-center', 'mb-[10px]', 'flex-wrap']"
      >
        <label
          :class="['block', 'cursor-pointer', 'w-[20px]', 'h-[20px]', 'relative', 'mr-[10px]']"
        >
          <InputSite
            :type="'checkbox'"
            :name="'policy'"
            v-model="policy"
            v-bind="policyProps"
            :class="['hidden', 'peer']"
          />
          <span
            :class="[
              'block',
              'border-[var(--color-primary)]',
              'border-[2px]',
              'h-[100%]',
              'w-[100%]',
              'rounded-[4px]',
              'shrink-0',
              'mr-[10px]',
            ]"
          ></span>
          <IconApp
            name="app:checkbox"
            :class="[
              'w-[100%]',
              'h-[100%]',
              'hidden',
              'peer-checked:block',
              'absolute',
              'top-0',
              'left-0',
            ]"
          />
        </label>
        <div>
          <span :class="['text-[var(--color-secondary)]']">Я согласен на</span>
          <a
            href="/doc/policy.pdf"
            target="_blank"
            rel="noreferrer"
            :class="[
              'text-[var(--color-acent)]',
              'underline',
              'hover:opacity-[0.7]',
              'transition-opacity',
              'duration-[var(--transition-duration)]',
            ]"
          >
            обработку моих персональных данных
          </a>
        </div>
      </div>
      <div :class="['text-[14px]', 'leading-[18px]', 'flex', 'items-center', 'mb-[20px]']">
        <label
          :class="['block', 'cursor-pointer', 'w-[20px]', 'h-[20px]', 'relative', 'mr-[10px]']"
        >
          <InputSite
            :type="'checkbox'"
            :name="'communication'"
            v-bind="communicationProps"
            v-model="communication"
            :class="['hidden', 'peer']"
          />
          <span
            :class="[
              'block',
              'border-[var(--color-primary)]',
              'border-[2px]',
              'h-[100%]',
              'w-[100%]',
              'rounded-[4px]',
              'shrink-0',
              'mr-[10px]',
            ]"
          ></span>
          <IconApp
            name="app:checkbox"
            :class="[
              'w-[100%]',
              'h-[100%]',
              'hidden',
              'peer-checked:block',
              'absolute',
              'top-0',
              'left-0',
            ]"
          />
        </label>
        <div>
          <span :class="['text-[var(--color-secondary)]']">Я согласен на</span>
          <a
            href="/doc/communication.pdf"
            target="_blank"
            rel="noreferrer"
            :class="[
              'text-[var(--color-acent)]',
              'underline',
              'ml-[5px]',
              'hover:opacity-[0.7]',
              'transition-opacity',
              'duration-[var(--transition-duration)]',
            ]"
          >
            получение рассылки рекламно-информационных материалов
          </a>
        </div>
      </div>
    </form>
    <ButtonSite :type="'button'" @click="onSubmit" :disabled="isSubmitting">
      Получить код
    </ButtonSite>
  </div>
</template>

<style scoped></style>
