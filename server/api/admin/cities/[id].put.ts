import { citySchema } from '@/entities/city';
import { prisma } from '#server/utils/prisma';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { id } = getRouterParams(event);
  const result = citySchema.safeParse(body);

  if (!result.success) {
    throw createError({
      status: 422,
      message: result.error.issues[0]?.message ?? 'Ошибка валидации',
    });
  }

  const data = result.data;

  const duplicateSlug = await prisma.category.findFirst({
    where: {
      slug: data.slug,
      NOT: {
        id,
      },
    },
  });

  if (duplicateSlug) {
    throw createError({
      status: 409,
      message: 'Город с таким slug уже существует',
    });
  }

  const cityExists = await prisma.city.findUnique({
    where: { id },
  });

  if (!cityExists) {
    throw createError({
      status: 409,
      message: 'Города с такмим id не существует',
    });
  }

  return prisma.city.update({
    where: { id: id },
    data,
  });
});
