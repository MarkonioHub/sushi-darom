import { z } from 'zod';

export const restaurantSchema = z.object({
  name: z.string().min(1, 'Имя обязательно для заполнения'),
  cityId: z.string().optional(),
  address: z.string().min(1, 'Адрес обязателен для заполнения'),
  ownerId: z.string().optional(),
  latitude: z.coerce
    .number()
    .min(-90, 'Широта должна быть не меньше -90')
    .max(90, 'Широта должна быть не больше 90'),

  longitude: z.coerce
    .number()
    .min(-180, 'Долгота должна быть не меньше -180')
    .max(180, 'Долгота должна быть не больше 180'),
  openingTime: z.string().min(1, 'Время открытия обязательно для заполнения'),
  closingTime: z.string().min(1, 'Время закрытия обязательно для заполнения'),
});
