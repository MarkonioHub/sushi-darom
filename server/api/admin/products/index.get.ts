import { prisma } from '@/../server/utils/prisma';

export default defineEventHandler(async () => {
  return prisma.product.findMany({
    orderBy: {
      updatedAt: 'desc',
    },
  });
});
