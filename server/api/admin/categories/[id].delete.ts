export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);

  const category = await prisma.category.findUnique({
    where: { id: id },
  });

  if (!category) {
    throw createError({
      status: 404,
      message: 'Категория с таким id не существует',
    });
  }

  await prisma.category.delete({
    where: {
      id: id,
    },
  });
});
