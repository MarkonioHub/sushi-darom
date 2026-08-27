export default defineEventHandler(async () => {
  return prisma.product.findMany({
    orderBy: {
      name: 'asc',
    },
  });
});
