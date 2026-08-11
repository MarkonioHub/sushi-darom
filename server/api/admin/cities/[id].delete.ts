export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);

  const city = await prisma.city.findUnique({
    where: { id: id },
  });

  if (!city) {
    throw createError({
      status: 404,
      message: 'Города с таким id не существует',
    });
  }

  await prisma.city.delete({
    where: {
      id: id,
    },
  });
});
