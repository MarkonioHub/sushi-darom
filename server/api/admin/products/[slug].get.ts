export default defineEventHandler(async (event) => {
  const { slug } = getRouterParams(event);

  const product = await prisma.product.findUnique({
    where: {
      slug: slug,
    },
  });

  if (!product) {
    throw createError({
      status: 404,
      statusText: 'Товар не найден',
    });
  }

  return product;
});
