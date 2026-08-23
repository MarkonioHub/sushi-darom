<script setup lang="ts" generic="T extends { id: string }">
  import { type AdminTableColumn, type AdminTableAction } from './types';

  interface Props {
    name: string;
    buttonCreateText?: string;
    items: T[];
    columns: AdminTableColumn<T>[];
    actions?: AdminTableAction[];
  }

  interface Emits {
    edit: [item: T];
    delete: [item: T];
    create: [];
  }

  const props = withDefaults(defineProps<Props>(), {
    actions: () => ['edit', 'delete'] satisfies AdminTableAction[],
  });
  const emit = defineEmits<Emits>();
</script>

<template>
  <div :class="['p-[20px]']">
    <TitleSite>{{ name }}</TitleSite>
    <table :class="['w-full', 'border', 'border-[var(--color-orange)]', 'mb-[20px]']">
      <thead>
        <tr>
          <th
            v-for="column in props.columns"
            :key="String(column.key)"
            :class="['border', 'border-[var(--color-orange)]', 'p-[10px]']"
          >
            {{ column.label }}
          </th>

          <th :class="['border', 'border-[var(--color-orange)]', 'p-[10px]']" v-if="actions.length">
            Действия
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td
            v-for="column in columns"
            :key="String(column.key)"
            :class="['border', 'border-[var(--color-orange)]', 'p-[10px]']"
          >
            <slot :name="`cell-${String(column.key)}`" :item="item">
              <NuxtImg
                v-if="column.type === 'image'"
                :src="String(item[column.key])"
                :class="['w-[100px]']"
              />
              <a :href="String(item[column.key])" v-else-if="column.type === 'file'">Файл</a>
              <span v-else-if="column.format">
                {{ column.format(item) }}
              </span>
              <span v-else :class="['break-all']">{{ item[column.key] }}</span>
            </slot>
          </td>

          <td :class="['border', 'border-[var(--color-orange)]', 'p-[10px]']">
            <button
              :class="['mr-[10px]']"
              @click="emit('edit', item)"
              v-if="actions.includes('edit')"
            >
              <IconApp name="app:edit" :class="['h-[24px]', 'w-[24px]']" />
            </button>

            <button @click="emit('delete', item)" v-if="actions.includes('delete')">
              <IconApp name="app:delete" :class="['h-[24px]', 'w-[24px]']" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <ButtonSite :type="'button'" @click="emit('create')" v-if="buttonCreateText">
      {{ buttonCreateText }}
    </ButtonSite>
  </div>
</template>
