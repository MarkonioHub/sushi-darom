export default defineEventHandler(async (event) => {
  const { slug } = getRouterParams(event);

  if (!slug) {
    throw createError({
      status: 404,
      message: 'Слаг акции не получен',
    });
  }

  const promo = await prisma.promo.findUnique({
    where: { slug },
  });

  if (!promo) {
    throw createError({
      status: 404,
      message: 'Акция не найдена',
    });
  }

  return promo;
});
