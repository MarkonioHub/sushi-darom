import { deleteFile } from '#server/utils/delete-file';
import { validateEntityExist } from '#server/utils/validate-entity-exist';
import { prisma } from '#server/utils/prisma';

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);

  const promo = await validateEntityExist(
    (args) => prisma.promo.findUnique(args),
    { where: { id } },
    'Акции с таким id не существует'
  );

  await prisma.promo.delete({
    where: {
      id: id,
    },
  });

  await deleteFile(promo.imageVertical);
  await deleteFile(promo.imageHorizontal);
});
