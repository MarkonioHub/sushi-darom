import { prisma } from '@/../server/utils/prisma';
import { createCitySchema } from '@/entities/city';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const result = createCitySchema.safeParse(body);

  if (!result.success) {
    throw createError({
      status: 422,
      message: result.error.issues[0]?.message ?? 'Ошибка валидации',
    });
  }

  const data = result.data;

  const exists = await prisma.city.findUnique({
    where: {
      slug: data.slug,
    },
  });

  if (exists) {
    throw createError({
      status: 409,
      message: 'Город с таким slug уже существует',
    });
  }

  const city = await prisma.city.create({
    data,
  });

  return city;
});
