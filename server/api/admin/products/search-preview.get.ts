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
      select: {
        name: true,
        slug: true,
        image: true,
      },
      take: 20,
    });
  } else {
    return [];
  }
});
