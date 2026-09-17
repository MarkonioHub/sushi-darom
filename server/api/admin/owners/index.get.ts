export default defineEventHandler(async () => {
  return prisma.owner.findMany({
    orderBy: {
      name: 'desc',
    },
  });
});
