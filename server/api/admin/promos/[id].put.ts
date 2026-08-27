import { promoSchema } from '@/entities/promo';
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

  for (const item of formData) {
    if (item.name !== 'imageHorizontal' && item.name !== 'imageVertical' && item.data) {
      fields[item.name!] = item.data.toString();
    }
  }

  const result = promoSchema.safeParse(fields);
  if (!result.success) {
    throw createError({
      status: 422,
      message: result.error.issues[0]?.message ?? 'Ошибка валидации',
    });
  }

  const data = result.data;

  await validateDuplicateSlug(
    (args) => prisma.promo.findFirst(args),
    { where: { slug: data.slug, id: { not: id } } },
    'Акция с таким slug уже существует'
  );

  const promoExists = await validateEntityExist(
    (args) => prisma.promo.findUnique(args),
    { where: { id } },
    'Акция с таким id не существует'
  );

  const imageHorizontal = formData.find((item) => item.name === 'imageHorizontal');
  const imageVertical = formData.find((item) => item.name === 'imageVertical');
  validateImage(imageHorizontal);
  validateImage(imageVertical);
  const imageHorizontalPath = await saveFile(
    imageHorizontal,
    'promos',
    promoExists.imageHorizontal
  );
  const imageVerticalPath = await saveFile(imageVertical, 'promos', promoExists.imageVertical);

  return prisma.promo.update({
    where: { id },
    data: {
      name: data.name,
      slug: data.slug,
      content: data.content,
      imageVertical: imageVerticalPath,
      imageHorizontal: imageHorizontalPath,
    },
  });
});
