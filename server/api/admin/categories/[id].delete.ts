export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);

  await prisma.category.delete({
    where: {
      id: id,
    },
  });
});
