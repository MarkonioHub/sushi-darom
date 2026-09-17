import { ownerSchema } from '@/entities/owner';
import { prisma } from '#server/utils/prisma';
import { validateEntityExist } from '#server/utils/validate-entity-exist';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { id } = getRouterParams(event);
  const result = ownerSchema.safeParse(body);

  if (!result.success) {
    throw createError({
      status: 422,
      message: result.error.issues[0]?.message ?? 'Ошибка валидации',
    });
  }

  const data = result.data;

  await validateEntityExist(
    (args) => prisma.owner.findUnique(args),
    { where: { id } },
    'Предприниматель с таким id не существует'
  );

  return prisma.owner.update({
    where: { id },
    data,
  });
});
