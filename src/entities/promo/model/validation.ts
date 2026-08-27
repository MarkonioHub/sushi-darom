import { z } from 'zod';
import { imageSchema } from '@/shared/model';

export const promoSchema = z.object({
  slug: z
    .string()
    .min(1, 'Слаг обязателен для заполнения')
    .regex(/^[a-z0-9_]+(?:-[a-z0-9_]+)*$/, {
      message: 'Слаг может содержать только строчные латинские буквы, цифры и дефисы',
    }),
  name: z.string().min(1, 'Заголовок обязателен для заполнения'),
  content: z.string().min(1, 'Контент обязателен для заполнения'),
  imageVertical: z.string().optional(),
  imageHorizontal: z.string().optional(),
  imageVerticalFile: imageSchema.nullable().optional(),
  imageHorizontalFile: imageSchema.nullable().optional(),
});
