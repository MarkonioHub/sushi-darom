import { z } from 'zod';

export const fileSize = 5 * 1024 * 1024;
export const fileTypes = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'application/rtf',
  'text/rtf',
  'application/msword',
  'text/plain',
];

export const reviewSchema = z.object({
  name: z.string().min(1, 'Имя обязательно для заполнения'),
  surname: z.string().optional(),
  phone: z
    .string()
    .min(1, 'Телефон обязателен для заполнения')
    .length(18, 'Укажите полный номер телефона'),
  email: z.string().email('Некорректный формат email').optional().or(z.literal('')),
  city: z.string().min(1, 'Выберите город'),
  theme: z.string().min(1, 'Выберите тему отзыва'),
  message: z.string().min(1, 'Опишите отзыв'),
  file: z
    .instanceof(File)
    .refine((val) => !val || val.size <= fileSize, `Максимальный размер файла 5 МБ`)
    .refine(
      (val) => !val || fileTypes.includes(val.type),
      'Только форматы .pdf, .jpeg, .png, .rtf, .doc, .txt'
    )
    .nullable()
    .optional(),
});
