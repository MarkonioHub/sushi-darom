<script setup lang="ts">
  import { AdminTable } from '@/shared/ui/admin-table';
  import { ownerApi } from '@/entities/owner';
  import type { AdminTableColumn } from '@/shared/ui/admin-table';
  import type { Owner } from '@/entities/owner';
  import { AdminOwnerForm } from '@/features/admin-owner-form';
  import { AdminConfirmDelete } from '@/features/admin-confirm-delete';
  import { useModalStore } from '@/shared/ui/modal-base';

  const {
    data: owners,
    error,
    pending,
    refresh,
  } = await useAsyncData('owners-admin', () => ownerApi.getAll());
  const modalStore = useModalStore();

  function editItem(owner: Owner) {
    modalStore.open(AdminOwnerForm, 'small', {
      title: `Редактировать предпринимателя ${owner.name}`,
      buttonText: 'Сохранить',
      owner: owner,
      refresh: () => refresh(),
    });
  }

  function deleteItem(owner: Owner) {
    modalStore.open(AdminConfirmDelete, 'small', {
      title: `Удалить предпринимателя '${owner.name}'?`,
      buttonText: 'Удалить',
      handler: () => ownerApi.delete(owner.id),
      refresh: () => refresh(),
    });
  }

  function createItem() {
    modalStore.open(AdminOwnerForm, 'small', {
      title: 'Создать предпринимателя',
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
      key: 'inn',
      label: 'ИНН',
    },
    {
      key: 'ogrn',
      label: 'ОГРН',
    },
  ] satisfies AdminTableColumn<Owner>[];
</script>

<template>
  <AdminTable
    v-if="owners"
    :name="'Предприниматели'"
    :buttonCreateText="'Добавить предпринимателя'"
    :items="owners"
    :columns="columns"
    @edit="editItem"
    @delete="deleteItem"
    @create="createItem"
  />
  <TitleSite v-else-if="error">Извините, предприниматели не загрузились</TitleSite>
  <TitleSite v-else-if="pending">Загрузка...</TitleSite>
</template>

<style scoped></style>
