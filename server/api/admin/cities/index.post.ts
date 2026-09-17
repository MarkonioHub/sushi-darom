import { prisma } from '@/../server/utils/prisma';
import { citySchema } from '@/entities/city';
import { validateDuplicateSlug } from '#server/utils/validate-duplicate-slug';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const result = citySchema.safeParse(body);

  if (!result.success) {
    throw createError({
      status: 422,
      message: result.error.issues[0]?.message ?? 'Ошибка валидации',
    });
  }

  const data = result.data;

  await validateDuplicateSlug(
    (args) => prisma.city.findFirst(args),
    { where: { slug: data.slug } },
    'Город с таким slug уже существует'
  );

  return prisma.city.create({
    data,
  });
});
