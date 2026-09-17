import { z } from 'zod';
import { imageSchema } from '@/shared/model';

export const productSchema = z.object({
  name: z.string().min(1, 'Имя обязательно для заполнения'),
  slug: z
    .string()
    .min(1, 'Слаг обязателен для заполнения')
    .regex(/^[a-z0-9_]+(?:-[a-z0-9_]+)*$/, {
      message: 'Слаг может содержать только строчные латинские буквы, цифры и дефисы',
    }),
  categoryId: z.string().optional(),
  image: z.string().optional(),
  imageFile: imageSchema.nullable().optional(),
  description: z.string().optional(),
  allergens: z.string().optional(),
  compound: z.string().optional(),
  price: z.string().min(1, 'Цена обязательна для заполнения'),
  oldPrice: z.string().optional(),
  weight: z.string().optional(),
  pieces: z.string().optional(),
  proteins: z.string().optional(),
  carbs: z.string().optional(),
  fats: z.string().optional(),
  calories: z.string().optional(),
});
