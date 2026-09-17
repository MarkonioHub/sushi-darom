<script setup lang="ts">
  import { AdminTable } from '@/shared/ui/admin-table';
  import { reviewApi, type Review } from '@/entities/review';
  import type { AdminTableColumn } from '@/shared/ui/admin-table';
  import { AdminConfirmDelete } from '@/features/admin-confirm-delete';
  import { useModalStore } from '@/shared/ui/modal-base';
  import { useCityStore, type City } from '@/entities/city';

  const {
    data: reviews,
    error,
    pending,
    refresh,
  } = await useAsyncData('reviews-admin', () => reviewApi.getAll());

  const modalStore = useModalStore();
  const cityStore = useCityStore();
  const { cities } = storeToRefs(cityStore);

  function deleteItem(review: Review) {
    modalStore.open(AdminConfirmDelete, 'small', {
      title: `Удалить отзыв '${review.name}'?`,
      buttonText: 'Удалить',
      handler: () => reviewApi.delete(review.id),
      refresh: () => refresh(),
    });
  }

  const columns = [
    {
      key: 'name',
      label: 'Имя',
    },
    {
      key: 'surname',
      label: 'Фамилия',
    },
    {
      key: 'phone',
      label: 'Телефон',
    },
    {
      key: 'email',
      label: 'Почта',
    },
    {
      key: 'city',
      label: 'Город',
      format: (review) => {
        return cities.value.find((city: City) => city.id === review.city)?.name || '';
      },
    },
    {
      key: 'theme',
      label: 'Тема',
    },
    {
      key: 'message',
      label: 'Сообщение',
    },
    {
      key: 'file',
      label: 'Файл',
      type: 'file',
    },
  ] satisfies AdminTableColumn<Review>[];
</script>

<template>
  <AdminTable
    v-if="reviews"
    :name="'Отзвывы'"
    :items="reviews"
    :columns="columns"
    @delete="deleteItem"
    :actions="['delete']"
  />
  <TitleSite v-else-if="error">Извините, отзывы не загрузились</TitleSite>
  <TitleSite v-else-if="pending">Загрузка...</TitleSite>
</template>

<style scoped></style>
