import { validateEntityExist } from '#server/utils/validate-entity-exist';
import { prisma } from '#server/utils/prisma';

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);

  await validateEntityExist(
    (args) => prisma.city.findUnique(args),
    { where: { id } },
    'Города с таким id не существует'
  );

  await prisma.city.delete({
    where: {
      id: id,
    },
  });
});
