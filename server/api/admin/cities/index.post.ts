import { prisma } from '@/../server/utils/prisma';
import { citySchema } from '@/entities/city';
import { validateEntityExist } from '#server/utils/validate-entity-exist';

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

  await validateEntityExist(
    (args) => prisma.city.findUnique(args),
    { where: { slug: data.slug } },
    'Город с таким slug не существует'
  );

  return prisma.city.create({
    data,
  });
});
