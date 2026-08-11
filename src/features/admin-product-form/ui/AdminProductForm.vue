<script setup lang="ts">
  import { InputSite } from '@/shared/ui/input-site';
  import { useModalStore } from '@/shared/ui/modal-base';
  import { useProductStore, createProductSchema, productSchema } from '@/entities/product';
  import type { Product } from '@/entities/product';
  import { createProduct, updateProduct } from '@/entities/product/model/api';
  import { SelectSite } from '@/shared/ui/select-site';
  import { useCategoryStore } from '@/entities/category';

  const categoryStore = useCategoryStore();
  const { categories } = storeToRefs(categoryStore);

  const categoriesOptions = computed(() => {
    return categories.value.map((category) => ({
      value: category.id,
      label: category.name,
    }));
  });

  interface Props {
    id?: string;
    title?: string;
    buttonText?: string;
    product?: Product;
  }

  const props = withDefaults(defineProps<Props>(), {
    title: 'Заголовок формы',
    buttonText: 'Текст кнопки',
  });

  const fieldsConfig = [
    { key: 'name', placeholder: 'Название продукта' },
    { key: 'slug', placeholder: 'Слаг' },
    { key: 'categoryId', placeholder: 'Категория' },
    { key: 'image', placeholder: 'Изображение' },
    { key: 'imageFile', placeholder: 'Загрузить изображение' },
    { key: 'description', placeholder: 'Описание' },
    { key: 'allergens', placeholder: 'Аллергены' },
    { key: 'compound', placeholder: 'Состав' },
    { key: 'price', placeholder: 'Цена' },
    { key: 'oldPrice', placeholder: 'Старая цена' },
    { key: 'weight', placeholder: 'Вес' },
    { key: 'pieces', placeholder: 'Количество штук' },
    { key: 'proteins', placeholder: 'Белки' },
    { key: 'carbs', placeholder: 'Углеводы' },
    { key: 'fats', placeholder: 'Жиры' },
    { key: 'calories', placeholder: 'Калории' },
  ] as const;

  const initialValuesCommon = {
    name: props.product?.name || '',
    slug: props.product?.slug || '',
    categoryId: props.product?.categoryId || '',
    image: props.product?.image || '',
    imageFile: null,
    description: props.product?.description || '',
    allergens: props.product?.allergens || '',
    compound: props.product?.compound || '',
    price: props.product?.price || '',
    oldPrice: props.product?.oldPrice || '',
    weight: props.product?.weight || '',
    pieces: props.product?.pieces || '',
    proteins: props.product?.proteins || '',
    carbs: props.product?.carbs || '',
    fats: props.product?.fats || '',
    calories: props.product?.calories || '',
  };

  type ProductForm = typeof initialValuesCommon;

  const initialValues = props.product?.id
    ? {
        id: props.product?.id || undefined,
        ...initialValuesCommon,
      }
    : {
        ...initialValuesCommon,
      };

  const validationSchema = props.product?.id
    ? toTypedSchema(productSchema)
    : toTypedSchema(createProductSchema);

  const {
    handleSubmit,
    errors,
    defineField,
    handleReset,
    isSubmitting,
    setFieldError,
    setFieldValue,
  } = useForm({
    validationSchema: validationSchema,
    initialValues: initialValues,
  });

  const modalStore = useModalStore();
  const productStore = useProductStore();
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

  const clearError = (field: keyof ProductForm) => {
    if (errors.value[field]) {
      setFieldError(field, undefined);
    }
  };

  const onSubmit = handleSubmit(async (values) => {
    try {
      const id = props.product?.id;
      if (id) {
        await updateProduct(id, { id, ...values });
      } else {
        await createProduct(values);
      }
      modalStore.close();
      handleReset();
      await productStore.fetchProducts();
    } catch (e) {
      serverError.value = (e as Error).message;
    }
  });

  function onImageChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;

    setFieldValue('imageFile', file);
    clearError('imageFile');
  }
</script>

<template>
  <form @submit="onSubmit" :class="['flex', 'flex-col', 'gap-[24px]', 'p-[60px_40px]']">
    <TitleSite :variant="'secondary'">{{ props.title }}</TitleSite>
    <div :class="['w-[100%]']" v-for="field in fields" :key="field.key">
      <div v-if="field.key === 'imageFile'">
        <div>Изображение</div>
        <InputSite
          @change="onImageChange"
          :type="'file'"
          accept="image/*"
          :name="field.key"
          :placeholder="field.placeholder"
          :class="['w-[100%]', errors[field.key] ? 'border-[var(--color-error)]' : '']"
        />
      </div>
      <div v-else-if="field.key === 'image'"></div>
      <div v-else-if="field.key === 'categoryId'">
        <SelectSite
          v-model="field.value.value"
          :placeholder="field.placeholder"
          :options="categoriesOptions"
          :error="errors[field.key]"
        />
      </div>
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
