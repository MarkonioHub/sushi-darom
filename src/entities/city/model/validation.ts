import { z } from 'zod';

export const createCitySchema = z.object({
  name: z.string().min(1, 'Имя обязательно для заполнения'),
  slug: z
    .string()
    .min(1, 'Слаг обязателен для заполнения')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: 'Слаг может содержать только строчные латинские буквы, цифры и дефисы',
    }),
  phone: z
    .string()
    .min(1, 'Телефон обязателен для заполнения')
    .length(18, 'Укажите полный номер телефона'),
});
