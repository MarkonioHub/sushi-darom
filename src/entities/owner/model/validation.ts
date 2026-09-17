import { z } from 'zod';

export const ownerSchema = z.object({
  name: z.string().min(1, 'Имя обязательно для заполнения'),
  inn: z.string().min(1, 'ИНН обязательно для заполнения'),
  ogrn: z.string().min(1, 'ОГРН обязательно для заполнения'),
});
