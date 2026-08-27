import { prisma } from '@/../server/utils/prisma';
import { promoSchema } from '@/entities/promo';
import { saveFile } from '#server/utils/save-file';
import { validateImage } from '#server/utils/validate-image';
import { validateEntityExist } from '#server/utils/validate-entity-exist';
import { validateDuplicateSlug } from '#server/utils/validate-duplicate-slug';

export default defineEventHandler(async (event) => {
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
      status: 400,
      statusText: result.error.issues[0]?.message ?? 'Ошибка валидации',
    });
  }

  const data = result.data;

  const duplicateSlug = await prisma.promo.findUnique({
    where: {
      slug: data.slug,
    },
  });

  if (duplicateSlug) {
    throw createError({
      status: 409,
      message: 'Акция с таким slug уже существует',
    });
  }

  const imageHorizontal = formData.find((item) => item.name === 'imageHorizontal');
  const imageVertical = formData.find((item) => item.name === 'imageVertical');

  validateImage(imageHorizontal);
  validateImage(imageVertical);

  const imageHorizontalPath = await saveFile(imageHorizontal, 'promos');
  const imageVerticalPath = await saveFile(imageVertical, 'promos');

  return prisma.promo.create({
    data: {
      name: data.name,
      slug: data.slug,
      content: data.content,
      imageVertical: imageVerticalPath || '',
      imageHorizontal: imageHorizontalPath || '',
    },
  });
});
