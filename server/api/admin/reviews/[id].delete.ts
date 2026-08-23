import { unlink } from 'node:fs/promises';
import { getImagePath } from '#server/utils/get-image-path';

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);

  const review = await prisma.review.findUnique({
    where: { id: id },
  });

  if (!review) {
    throw createError({
      status: 404,
      message: 'Отзыва с таким id не существует',
    });
  }

  await prisma.review.delete({
    where: {
      id: id,
    },
  });

  if (review.file) {
    const imagePath = getImagePath(review.file);
    try {
      await unlink(imagePath);
    } catch (error) {
      console.log('Не удалось удалить файл отзыва: ', error);
    }
  }
});
