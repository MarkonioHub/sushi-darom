type AdminTableColumnType = 'text' | 'image' | 'file';
export type AdminTableAction = 'edit' | 'delete';

export interface AdminTableColumn<T> {
  key: keyof T;
  label: string;
  type?: AdminTableColumnType;
  format?: (item: T) => string;
  width?: string;
  align?: 'left' | 'center' | 'right';
}
