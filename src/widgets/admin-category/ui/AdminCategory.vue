<script setup lang="ts">
  import { AdminTable } from '@/shared/ui/admin-table';
  import { useCategoryStore, categoryApi } from '@/entities/category';
  import type { AdminTableColumn } from '@/shared/ui/admin-table';
  import type { Category } from '@/entities/category';
  import { AdminCategoryForm } from '@/features/admin-category-form';
  import { AdminConfirmDelete } from '@/features/admin-confirm-delete';
  import { useModalStore } from '@/shared/ui/modal-base';

  const categoryStore = useCategoryStore();
  const modalStore = useModalStore();

  function editItem(category: Category) {
    modalStore.open(AdminCategoryForm, 'small', {
      title: `Редактировать категорию ${category.name}`,
      buttonText: 'Сохранить',
      category: category,
    });
  }

  function deleteItem(category: Category) {
    modalStore.open(AdminConfirmDelete, 'small', {
      title: `Удалить категорию '${category.name}'?`,
      buttonText: 'Удалить',
      handler: categoryApi.delete(category.id),
      callback: () => categoryStore.fetchCategories(),
    });
  }

  function createItem() {
    modalStore.open(AdminCategoryForm, 'small', {
      title: 'Создать категорию',
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
      label: 'Slug',
    },
    {
      key: 'isActive',
      label: 'Активность',
    },
  ] satisfies AdminTableColumn<Category>[];
</script>

<template>
  <AdminTable
    :name="'Категории'"
    :buttonText="'Добавить категорию'"
    :items="categoryStore.categories"
    :columns="columns"
    @edit="editItem"
    @delete="deleteItem"
    @create="createItem"
  />
</template>

<style scoped></style>
