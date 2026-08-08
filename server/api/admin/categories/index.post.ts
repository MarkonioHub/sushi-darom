import { prisma } from '@/../server/utils/prisma';
import { createCategorySchema } from '@/entities/category';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const result = createCategorySchema.safeParse(body);

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

  return prisma.category.create({
    data,
  });
});
