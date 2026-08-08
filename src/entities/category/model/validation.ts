import { z } from 'zod';

export const createCategorySchema = z.object({
  name: z.string().min(1, 'Имя обязательно для заполнения'),
  slug: z
    .string()
    .min(1, 'Слаг обязателен для заполнения')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: 'Слаг может содержать только строчные латинские буквы, цифры и дефисы',
    }),
});

export const categorySchema = z.object({
  id: z.string().min(1, 'Не указан id'),
  name: z.string().min(1, 'Имя обязательно для заполнения'),
  slug: z
    .string()
    .min(1, 'Слаг обязателен для заполнения')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: 'Слаг может содержать только строчные латинские буквы, цифры и дефисы',
    }),
});
