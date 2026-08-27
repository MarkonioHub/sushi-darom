import { productSchema } from '@/entities/product';
import { prisma } from '#server/utils/prisma';
import { validateImage } from '#server/utils/validate-image';
import { saveFile } from '#server/utils/save-file';
import { validateDuplicateSlug } from '#server/utils/validate-duplicate-slug';
import { validateEntityExist } from '#server/utils/validate-entity-exist';

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);
  const formData = await readMultipartFormData(event);

  if (!formData) {
    throw createError({
      status: 400,
      message: 'Некорректные данные формы',
    });
  }

  const fields: Record<string, string> = {};
  const image = formData.find((item) => item.name === 'image');

  for (const item of formData) {
    if (item.name !== 'image' && item.data) {
      fields[item.name!] = item.data.toString();
    }
  }

  const result = productSchema.safeParse(fields);
  if (!result.success) {
    throw createError({
      status: 422,
      message: result.error.issues[0]?.message ?? 'Ошибка валидации',
    });
  }

  const data = result.data;
  await validateDuplicateSlug(
    (args) => prisma.product.findFirst(args),
    { where: { slug: data.slug, id: { not: id } } },
    'Продукт с таким slug уже существует'
  );
  validateImage(image);

  await validateEntityExist(
    (args) => prisma.product.findUnique(args),
    { where: { id } },
    'Продукта с таким id не существует'
  );

  const imagePath = await saveFile(image, 'products', data.image);

  return prisma.product.update({
    where: { id },
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
