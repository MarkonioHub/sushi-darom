<script setup lang="ts">
  import { InputSite } from '@/shared/ui/input-site';
  import { useModalStore } from '@/shared/ui/modal-base';
  import { type Restaurant, restaurantSchema, restaurantApi } from '@/entities/restaurant';
  import { ownerApi } from '@/entities/owner';
  import { SelectSite } from '@/shared/ui/select-site';
  import { useCityStore } from '@/entities/city';

  const cityStore = useCityStore();
  const { cities } = storeToRefs(cityStore);

  const citiesOptions = computed(() => {
    return cities.value.map((city) => ({
      value: city.id,
      label: city.name,
    }));
  });

  const { data: owners } = await useAsyncData('admin-restaurant-form-owners', () =>
    ownerApi.getAll()
  );

  const ownersOptions = computed(() => {
    if (owners.value) {
      return owners.value.map((owner) => ({
        value: owner.id,
        label: owner.name,
      }));
    } else {
      return [{ value: 'не найдено', label: 'не найдено' }];
    }
  });

  interface Props {
    title?: string;
    buttonText?: string;
    restaurant?: Restaurant;
    refresh: Function;
  }

  interface RestaurantForm {
    name: string;
    cityId?: string;
    address: string;
    ownerId?: string;
    latitude: number;
    longitude: number;
    openingTime: string;
    closingTime: string;
  }

  const {
    title = 'Заголовок формы',
    buttonText = 'Текст кнопки',
    restaurant,
    refresh,
  } = defineProps<Props>();

  const fieldsConfig = [
    { key: 'name', placeholder: 'Название ресторана' },
    { key: 'cityId', placeholder: 'Город' },
    { key: 'address', placeholder: 'Адрес' },
    { key: 'ownerId', placeholder: 'Владелец' },
    { key: 'latitude', placeholder: 'Широта' },
    { key: 'longitude', placeholder: 'Долгота' },
    { key: 'openingTime', placeholder: 'Время открытия' },
    { key: 'closingTime', placeholder: 'Время закрытия' },
  ] as const;

  const initialValues: RestaurantForm = {
    name: restaurant?.name ?? '',
    cityId: restaurant?.cityId ?? '',
    address: restaurant?.address ?? '',
    ownerId: restaurant?.ownerId ?? '',
    latitude: restaurant?.latitude ?? 0,
    longitude: restaurant?.longitude ?? 0,
    openingTime: restaurant?.openingTime ?? '',
    closingTime: restaurant?.closingTime ?? '',
  };

  const { handleSubmit, errors, defineField, handleReset, isSubmitting, setFieldError } =
    useForm<RestaurantForm>({
      validationSchema: toTypedSchema(restaurantSchema),
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

  const clearError = (field: keyof RestaurantForm) => {
    if (errors.value[field]) {
      setFieldError(field, undefined);
    }
  };

  const onSubmit = handleSubmit(async (values) => {
    console.log(values);
    try {
      const id = restaurant?.id;
      if (id) {
        await restaurantApi.update(id, { ...values, isActive: true });
      } else {
        await restaurantApi.create({ ...values, isActive: true });
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
    <div :class="['w-[100%]']" v-for="field in fields" :key="field.key">
      <div v-if="field.key === 'cityId'">
        <SelectSite
          v-model="field.value.value"
          :placeholder="field.placeholder"
          :options="citiesOptions"
          :error="errors[field.key]"
        />
      </div>
      <div v-else-if="field.key === 'ownerId'">
        <SelectSite
          v-model="field.value.value"
          :placeholder="field.placeholder"
          :options="ownersOptions"
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
        {{ buttonText }}
      </ButtonSite>
    </div>
    <div v-if="serverError">
      {{ serverError }}
    </div>
  </form>
</template>

<style scoped></style>
