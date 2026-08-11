<script setup lang="ts">
  import { AdminTable } from '@/shared/ui/admin-table';
  import { useProductStore, productApi } from '@/entities/product';
  import type { AdminTableColumn } from '@/shared/ui/admin-table';
  import type { Product } from '@/entities/product';
  import { AdminProductForm } from '@/features/admin-product-form';
  import { AdminConfirmDelete } from '@/features/admin-confirm-delete';
  import { useModalStore } from '@/shared/ui/modal-base';
  import { formatPriceWithCurrency } from '@/shared/lib';

  const productStore = useProductStore();
  const modalStore = useModalStore();

  function editItem(product: Product) {
    modalStore.open(AdminProductForm, 'small', {
      title: `Редактировать продукт ${product.name}`,
      buttonText: 'Сохранить',
      product: product,
    });
  }

  function deleteItem(product: Product) {
    modalStore.open(AdminConfirmDelete, 'small', {
      title: `Удалить продукт '${product.name}'?`,
      buttonText: 'Удалить',
      handler: () => productApi.delete(product.id),
    });
  }

  function createItem() {
    modalStore.open(AdminProductForm, 'small', {
      title: 'Создать продукт',
      buttonText: 'Создать',
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
    :name="'Продукты'"
    :buttonText="'Добавить продукт'"
    :items="productStore.products"
    :columns="columns"
    @edit="editItem"
    @delete="deleteItem"
    @create="createItem"
  />
</template>

<style scoped></style>
