import { deleteFile } from '#server/utils/delete-file';
import { validateEntityExist } from '#server/utils/validate-entity-exist';
import { prisma } from '#server/utils/prisma';

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);

  const product = await validateEntityExist(
    (args) => prisma.product.findUnique(args),
    { where: { id } },
    'Продукта с таким id не существует'
  );

  await prisma.product.delete({
    where: {
      id: id,
    },
  });

  await deleteFile(product.image);
});
