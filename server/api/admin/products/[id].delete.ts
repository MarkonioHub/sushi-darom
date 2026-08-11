import { unlink } from 'node:fs/promises';
import { getProductImagePath } from '#server/utils/get-product-image-path';

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);

  const product = await prisma.product.findUnique({
    where: { id: id },
  });

  if (!product) {
    throw createError({
      status: 404,
      message: 'Продукта с таким id не существует',
    });
  }

  await prisma.product.delete({
    where: {
      id: id,
    },
  });

  if (product.image) {
    const imagePath = getProductImagePath(product.image);
    try {
      await unlink(imagePath);
    } catch (error) {
      console.log('Не удалось удалить изображение продукта: ', error);
    }
  }
});
