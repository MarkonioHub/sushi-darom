<script setup lang="ts">
  import { AdminTable } from '@/shared/ui/admin-table';
  import { restaurantApi } from '@/entities/restaurant';
  import type { AdminTableColumn } from '@/shared/ui/admin-table';
  import type { Restaurant } from '@/entities/restaurant';
  import { AdminRestaurantForm } from '@/features/admin-restaurant-form';
  import { AdminConfirmDelete } from '@/features/admin-confirm-delete';
  import { useModalStore } from '@/shared/ui/modal-base';
  import { type City, useCityStore } from '@/entities/city';
  import { type Owner, ownerApi } from '@/entities/owner';

  const cityStore = useCityStore();
  const { cities } = storeToRefs(cityStore);

  const {
    data: restaurants,
    error,
    pending,
    refresh,
  } = await useAsyncData('admin-restaurants', () => restaurantApi.getAll());

  const { data: owners } = await useAsyncData('admin-restaurants-owners', () => ownerApi.getAll());

  const modalStore = useModalStore();

  function editItem(restaurant: Restaurant) {
    modalStore.open(AdminRestaurantForm, 'small', {
      title: `Редактировать ресторан ${restaurant.name}`,
      buttonText: 'Сохранить',
      restaurant: restaurant,
      refresh: () => refresh(),
    });
  }

  function deleteItem(restaurant: Restaurant) {
    modalStore.open(AdminConfirmDelete, 'small', {
      title: `Удалить ресторан '${restaurant.name}'?`,
      buttonText: 'Удалить',
      handler: () => restaurantApi.delete(restaurant.id),
      refresh: () => refresh(),
    });
  }

  function createItem() {
    modalStore.open(AdminRestaurantForm, 'small', {
      title: 'Создать ресторан',
      buttonText: 'Создать',
      refresh: () => refresh(),
    });
  }

  const columns = [
    {
      key: 'name',
      label: 'Название',
    },
    {
      key: 'cityId',
      label: 'город',
      format: (restaurant) => {
        return cities.value.find((city: City) => city.id === restaurant.cityId)?.name || '';
      },
    },
    {
      key: 'address',
      label: 'адрес',
    },
    {
      key: 'ownerId',
      label: 'владелец',
      format: (restaurant) => {
        return owners.value?.find((owner: Owner) => owner.id === restaurant.ownerId)?.name || '';
      },
    },
    {
      key: 'latitude',
      label: 'широта',
    },
    {
      key: 'longitude',
      label: 'долгота',
    },
    {
      key: 'openingTime',
      label: 'время открытия',
    },
    {
      key: 'closingTime',
      label: 'время закрытия',
    },
  ] satisfies AdminTableColumn<Restaurant>[];
</script>

<template>
  <AdminTable
    v-if="restaurants"
    :name="'Рестораны'"
    :buttonCreateText="'Добавить ресторан'"
    :items="restaurants"
    :columns="columns"
    @edit="editItem"
    @delete="deleteItem"
    @create="createItem"
  />
  <TitleSite v-else-if="error">Извините, рестораны не загрузились</TitleSite>
  <TitleSite v-else-if="pending">Загрузка...</TitleSite>
</template>

<style scoped></style>
