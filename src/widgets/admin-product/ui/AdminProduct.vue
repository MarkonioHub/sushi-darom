<script setup lang="ts">
  import { AdminTable } from '@/shared/ui/admin-table';
  import { productApi } from '@/entities/product';
  import type { AdminTableColumn } from '@/shared/ui/admin-table';
  import type { Product } from '@/entities/product';
  import { AdminProductForm } from '@/features/admin-product-form';
  import { AdminConfirmDelete } from '@/features/admin-confirm-delete';
  import { useModalStore } from '@/shared/ui/modal-base';
  import { formatPriceWithCurrency } from '@/shared/lib';

  const {
    data: products,
    error,
    pending,
    refresh,
  } = await useAsyncData('products-admin', () => productApi.getAll());

  const modalStore = useModalStore();

  function editItem(product: Product) {
    modalStore.open(AdminProductForm, 'small', {
      title: `Редактировать продукт ${product.name}`,
      buttonText: 'Сохранить',
      product: product,
      refresh: () => refresh(),
    });
  }

  function deleteItem(product: Product) {
    modalStore.open(AdminConfirmDelete, 'small', {
      title: `Удалить продукт '${product.name}'?`,
      buttonText: 'Удалить',
      handler: () => productApi.delete(product.id),
      refresh: () => refresh(),
    });
  }

  function createItem() {
    modalStore.open(AdminProductForm, 'small', {
      title: 'Создать продукт',
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
      key: 'slug',
      label: 'Слаг',
    },
    {
      key: 'image',
      label: 'картинка',
      type: 'image',
    },
    {
      key: 'description',
      label: 'описание',
    },
    {
      key: 'allergens',
      label: 'аллергены',
    },
    {
      key: 'compound',
      label: 'состав',
    },
    {
      key: 'price',
      label: 'цена',
      format: (product) => formatPriceWithCurrency(product.price),
    },
    {
      key: 'oldPrice',
      label: 'старая цена',
      format: (product) => formatPriceWithCurrency(product.oldPrice),
    },
    {
      key: 'weight',
      label: 'вес',
    },
    {
      key: 'pieces',
      label: 'количество',
    },
    {
      key: 'proteins',
      label: 'протеины',
    },
    {
      key: 'carbs',
      label: 'углеводы',
    },
    {
      key: 'fats',
      label: 'жиры',
    },
    {
      key: 'calories',
      label: 'калории',
    },
  ] satisfies AdminTableColumn<Product>[];
</script>

<template>
  <AdminTable
    v-if="products"
    :name="'Продукты'"
    :buttonCreateText="'Добавить продукт'"
    :items="products"
    :columns="columns"
    @edit="editItem"
    @delete="deleteItem"
    @create="createItem"
  />
  <TitleSite v-else-if="error">Извините, продукты не загрузились</TitleSite>
  <TitleSite v-else-if="pending">Загрузка...</TitleSite>
</template>

<style scoped></style>
