export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const queryString = String(query.search ?? '').trim();

  if (queryString) {
    return prisma.product.findMany({
      where: {
        name: {
          contains: queryString,
          mode: 'insensitive',
        },
      },
      take: 40,
    });
  } else {
    return [];
  }
});
