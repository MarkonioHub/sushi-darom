export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const limit = Number(query.limit);
  return prisma.promo.findMany({
    orderBy: {
      name: 'asc',
    },
    ...(limit > 0 && { take: limit }),
  });
});
