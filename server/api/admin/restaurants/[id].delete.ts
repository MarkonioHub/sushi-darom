import { validateEntityExist } from '#server/utils/validate-entity-exist';
import { prisma } from '#server/utils/prisma';

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);

  await validateEntityExist(
    (args) => prisma.owner.findUnique(args),
    { where: { id } },
    'Ресторана с таким id не существует'
  );

  await prisma.owner.delete({
    where: {
      id: id,
    },
  });
});
