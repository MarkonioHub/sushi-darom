export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  return prisma.restaurant.findMany({
    where: {
      cityId: query.cityId as string,
    },
    select: {
      id: true,
      cityId: true,
      ownerId: true,
      name: true,
      address: true,
      latitude: true,
      longitude: true,
      openingTime: true,
      closingTime: true,
      owner: {
        select: {
          name: true,
          inn: true,
          ogrn: true,
        },
      },
    },
  });
});
