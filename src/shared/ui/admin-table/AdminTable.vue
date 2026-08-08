<script setup lang="ts" generic="T extends { id: string }">
  import type { AdminTableColumn } from './types';

  const props = defineProps<{
    name: string;
    buttonText: string;
    items: T[];
    columns: AdminTableColumn<T>[];
  }>();

  const emit = defineEmits<{
    edit: [item: T];
    delete: [item: T];
    create: [];
  }>();
</script>

<template>
  <ContainerSite>
    <TitleSite>{{ name }}</TitleSite>
    <table :class="['w-full', 'border', 'border-[var(--color-orange)]', 'mb-[20px]']">
      <thead>
        <tr>
          <th
            v-for="column in props.columns"
            :key="String(column.key)"
            class="border border-[var(--color-orange)] p-[10px]"
          >
            {{ column.label }}
          </th>

          <th class="border border-[var(--color-orange)] p-[10px]">Действия</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td
            v-for="column in columns"
            :key="String(column.key)"
            class="border border-[var(--color-orange)] p-[10px]"
          >
            <slot :name="`cell-${String(column.key)}`" :item="item">
              {{ item[column.key] }}
            </slot>
          </td>

          <td class="border border-[var(--color-orange)] p-[10px]">
            <button class="mr-[20px]" @click="emit('edit', item)">
              <IconApp name="app:edit" class="h-[24px] w-[24px]" />
            </button>

            <button @click="emit('delete', item)">
              <IconApp name="app:delete" class="h-[24px] w-[24px]" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <ButtonSite :type="'button'" @click="emit('create')">{{ buttonText }}</ButtonSite>
  </ContainerSite>
</template>
