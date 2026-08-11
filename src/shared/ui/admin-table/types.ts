type AdminTableColumnType = 'text' | 'image';

export interface AdminTableColumn<T> {
  key: keyof T;
  label: string;
  type?: AdminTableColumnType;
  format?: (item: T) => string;
  width?: string;
  align?: 'left' | 'center' | 'right';
}
