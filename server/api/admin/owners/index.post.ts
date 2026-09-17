import { prisma } from '@/../server/utils/prisma';
import { ownerSchema } from '@/entities/owner';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const result = ownerSchema.safeParse(body);

  if (!result.success) {
    throw createError({
      status: 422,
      message: result.error.issues[0]?.message ?? 'Ошибка валидации',
    });
  }

  const data = result.data;

  return prisma.owner.create({
    data,
  });
});
