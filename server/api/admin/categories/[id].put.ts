import { categorySchema } from '@/entities/category';
import { prisma } from '#server/utils/prisma';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { id } = getRouterParams(event);
  const result = categorySchema.safeParse(body);

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
      message: 'Категория с таким slug уже существует',
    });
  }

  const categoryExists = await prisma.category.findUnique({
    where: { id },
  });

  if (!categoryExists) {
    throw createError({
      status: 404,
      message: 'Категория с таким id не существует',
    });
  }

  return prisma.category.update({
    where: { id },
    data,
  });
});
