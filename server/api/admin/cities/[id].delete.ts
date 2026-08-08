export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { id } = getRouterParams(event);

  await prisma.city.delete({
    where: {
      id: id,
    },
  });
});
