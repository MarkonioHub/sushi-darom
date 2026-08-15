export default defineEventHandler(async (event) => {
  const { slug } = getRouterParams(event);

  if (!slug) {
    throw createError({
      status: 404,
      message: 'Слаг продукта не получен',
    });
  }

  const product = await prisma.product.findUnique({
    where: {
      slug: slug,
    },
  });

  if (!product) {
    throw createError({
      status: 404,
      message: 'Продукт не найден',
    });
  }

  return product;
});
