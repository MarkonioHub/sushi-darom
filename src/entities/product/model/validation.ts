import { z } from 'zod';

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

export const imageSchema = z
  .instanceof(File)
  .refine((file) => file.type.startsWith('image/'), {
    message: 'Файл должен быть изображением',
  })
  .refine((file) => file.size <= MAX_IMAGE_SIZE, {
    message: 'Размер изображения не должен превышать 5 МБ',
  });

export const productSchema = z.object({
  id: z.string().min(1, 'Не указан id'),
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
  description: z.string(),
  allergens: z.string(),
  compound: z.string(),
  price: z.string().min(1, 'Цена обязательна для заполнения'),
  oldPrice: z.string(),
  weight: z.string(),
  pieces: z.string(),
  proteins: z.string(),
  carbs: z.string(),
  fats: z.string(),
  calories: z.string(),
});

export const createProductSchema = z.object({
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
  description: z.string(),
  allergens: z.string(),
  compound: z.string(),
  price: z.string().min(1, 'Цена обязательна для заполнения'),
  oldPrice: z.string(),
  weight: z.string(),
  pieces: z.string(),
  proteins: z.string(),
  carbs: z.string(),
  fats: z.string(),
  calories: z.string(),
});
