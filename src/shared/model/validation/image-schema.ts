import { z } from 'zod';

export const imageSize = 5 * 1024 * 1024;

export const imageSchema = z
  .instanceof(File)
  .refine((file) => file.type.startsWith('image/'), {
    message: 'Файл должен быть изображением',
  })
  .refine((file) => file.size <= imageSize, {
    message: 'Размер изображения не должен превышать 5 МБ',
  });
