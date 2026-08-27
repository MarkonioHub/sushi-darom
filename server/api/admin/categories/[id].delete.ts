import { validateEntityExist } from '#server/utils/validate-entity-exist';
import { prisma } from '#server/utils/prisma';

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);

  await validateEntityExist(
    (args) => prisma.category.findUnique(args),
    { where: { id } },
    'Категории с таким id не существует'
  );

  await prisma.category.delete({
    where: {
      id: id,
    },
  });
});
