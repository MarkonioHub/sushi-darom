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

  const exists = await prisma.category.findUnique({
    where: {
      slug: data.slug,
    },
  });

  if (exists) {
    throw createError({
      status: 409,
      message: 'Категория с таким slug уже существует',
    });
  }

  const category = await prisma.category.update({
    where: { id: id },
    data,
  });

  if (!category) {
    throw createError({
      status: 409,
      message: 'Категории с такмим id не существует',
    });
  }

  return category;
});
