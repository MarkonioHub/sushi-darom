import { prisma } from '@/../server/utils/prisma';
import { categorySchema } from '@/entities/category';
import { validateEntityExist } from '#server/utils/validate-entity-exist';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const result = categorySchema.safeParse(body);

  if (!result.success) {
    throw createError({
      status: 422,
      message: result.error.issues[0]?.message ?? 'Ошибка валидации',
    });
  }

  const data = result.data;

  await validateEntityExist(
    (args) => prisma.category.findUnique(args),
    { where: { slug: data.slug } },
    'Категории с таким slug не существует'
  );

  return prisma.category.create({
    data,
  });
});
