<script setup lang="ts">
  import { AdminTable } from '@/shared/ui/admin-table';
  import { cityApi, useCityStore } from '@/entities/city';
  import type { AdminTableColumn } from '@/shared/ui/admin-table';
  import type { City } from '@/entities/city';
  import { AdminCityForm } from '@/features/admin-city-form';
  import { AdminConfirmDelete } from '@/features/admin-confirm-delete';
  import { useModalStore } from '@/shared/ui/modal-base';

  const cityStore = useCityStore();
  const modalStore = useModalStore();

  function editItem(city: City) {
    modalStore.open(AdminCityForm, 'small', {
      title: `Редактировать город ${city.name}`,
      buttonText: 'Сохранить',
      city: city,
    });
  }

  function deleteItem(city: City) {
    modalStore.open(AdminConfirmDelete, 'small', {
      title: `Удалить город '${city.name}'?`,
      buttonText: 'Удалить',
      handler: () => cityApi.delete(city.id),
      refresh: () => cityApi.getAll(),
    });
  }

  function createItem() {
    modalStore.open(AdminCityForm, 'small', { title: 'Создать город', buttonText: 'Создать' });
  }

  const columns = [
    {
      key: 'name',
      label: 'Название',
    },
    {
      key: 'slug',
      label: 'Slug',
    },
    {
      key: 'phone',
      label: 'Телефон',
    },
  ] satisfies AdminTableColumn<City>[];
</script>

<template>
  <AdminTable
    :name="'Города'"
    :buttonCreateText="'Добавить город'"
    :items="cityStore.cities"
    :columns="columns"
    @edit="editItem"
    @delete="deleteItem"
    @create="createItem"
  />
</template>

<style scoped></style>
