import { deleteFile } from '#server/utils/delete-file';
import { validateEntityExist } from '#server/utils/validate-entity-exist';
import { prisma } from '#server/utils/prisma';

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);

  const review = await validateEntityExist(
    (args) => prisma.review.findUnique(args),
    { where: { id } },
    'Отзыва с таким id не существует'
  );

  await prisma.review.delete({
    where: {
      id: id,
    },
  });

  await deleteFile(review.file);
});
