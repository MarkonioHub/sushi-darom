import { prisma } from '@/../server/utils/prisma';

export default defineEventHandler(async () => {
  return prisma.city.findMany({
    orderBy: {
      name: 'asc',
    },
  });
});
