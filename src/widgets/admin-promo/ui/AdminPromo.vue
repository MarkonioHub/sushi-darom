<script setup lang="ts">
  import { AdminTable } from '@/shared/ui/admin-table';
  import { deletePromo, fetchPromos, type Promo } from '@/entities/promo';
  import type { AdminTableColumn } from '@/shared/ui/admin-table';
  import { AdminPromoForm } from '@/features/admin-promo-form';
  import { AdminConfirmDelete } from '@/features/admin-confirm-delete';
  import { useModalStore } from '@/shared/ui/modal-base';

  const {
    data: promos,
    error,
    pending,
    refresh,
  } = await useAsyncData('promos-admin', () => fetchPromos());

  const modalStore = useModalStore();

  function editItem(promo: Promo) {
    modalStore.open(AdminPromoForm, 'small', {
      title: `Редактировать акцию ${promo.name}`,
      buttonText: 'Сохранить',
      promo: promo,
      refresh: () => refresh(),
    });
  }

  function deleteItem(promo: Promo) {
    modalStore.open(AdminConfirmDelete, 'small', {
      title: `Удалить акцию '${promo.name}'?`,
      buttonText: 'Удалить',
      handler: () => deletePromo(promo.id),
      refresh: () => refresh(),
    });
  }

  function createItem() {
    modalStore.open(AdminPromoForm, 'small', {
      title: 'Создать акцию',
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
      key: 'content',
      label: 'Контент',
    },
    {
      key: 'imageVertical',
      label: 'Вертикальная картинка',
      type: 'image',
    },
    {
      key: 'imageHorizontal',
      label: 'Горизонтальная картинка',
      type: 'image',
    },
  ] satisfies AdminTableColumn<Promo>[];
</script>

<template>
  <AdminTable
    v-if="promos"
    :name="'Акции'"
    :buttonCreateText="'Добавить акцию'"
    :items="promos"
    :columns="columns"
    @edit="editItem"
    @delete="deleteItem"
    @create="createItem"
  />
  <TitleSite v-else-if="error">Извините, акции не загрузились</TitleSite>
  <TitleSite v-else-if="pending">Загрузка...</TitleSite>
</template>

<style scoped></style>
