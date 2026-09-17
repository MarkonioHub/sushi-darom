import { restaurantSchema } from '@/entities/restaurant';
import { prisma } from '#server/utils/prisma';
import { validateEntityExist } from '#server/utils/validate-entity-exist';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { id } = getRouterParams(event);
  const result = restaurantSchema.safeParse(body);

  if (!result.success) {
    throw createError({
      status: 422,
      message: result.error.issues[0]?.message ?? 'Ошибка валидации',
    });
  }

  const data = result.data;

  await validateEntityExist(
    (args) => prisma.restaurant.findUnique(args),
    { where: { id } },
    'Ресторана с таким id не существует'
  );

  return prisma.restaurant.update({
    where: { id },
    data,
  });
});
