import { prisma } from '@/../server/utils/prisma';
import { productSchema } from '@/entities/product';
import { validateImage } from '#server/utils/validate-image';
import { saveFile } from '#server/utils/save-file';
import { validateEntityExist } from '#server/utils/validate-entity-exist';

export default defineEventHandler(async (event) => {
  const formData = await readMultipartFormData(event);

  if (!formData) {
    throw createError({
      status: 400,
      message: 'Некорректные данные формы',
    });
  }

  const fields: Record<string, string> = {};
  const image = formData.find((item) => item.name === 'imageFile');

  for (const item of formData) {
    if (item.name !== 'imageFile' && item.data) {
      fields[item.name!] = item.data.toString();
    }
  }

  const result = productSchema.safeParse(fields);

  if (!result.success) {
    throw createError({
      status: 400,
      statusText: result.error.issues[0]?.message ?? 'Ошибка валидации',
    });
  }

  const data = result.data;

  await validateEntityExist(
    (args) => prisma.product.findUnique(args),
    { where: { slug: data.slug } },
    'Продукт с таким slug не существует'
  );

  validateImage(image);
  const imagePath = await saveFile(image, 'products');

  return prisma.product.create({
    data: {
      name: data.name,
      slug: data.slug,
      categoryId: data.categoryId,
      image: imagePath,
      description: data.description,
      allergens: data.allergens,
      compound: data.compound,
      price: data.price,
      oldPrice: data.oldPrice,
      weight: data.weight,
      pieces: data.pieces,
      proteins: data.proteins,
      carbs: data.carbs,
      fats: data.fats,
      calories: data.calories,
    },
  });
});
