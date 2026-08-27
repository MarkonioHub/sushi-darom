import { citySchema } from '@/entities/city';
import { prisma } from '#server/utils/prisma';
import { validateDuplicateSlug } from '#server/utils/validate-duplicate-slug';
import { validateEntityExist } from '#server/utils/validate-entity-exist';

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

  await validateDuplicateSlug(
    (args) => prisma.city.findFirst(args),
    { where: { slug: data.slug, id: { not: id } } },
    'Город с таким slug уже существует'
  );

  await validateEntityExist(
    (args) => prisma.city.findUnique(args),
    { where: { id } },
    'Города с таким id не существует'
  );

  return prisma.city.update({
    where: { id: id },
    data,
  });
});
