import { randomUUID } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

import { prisma } from '@/../server/utils/prisma';
import { createProductSchema } from '@/entities/product';

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

  const result = createProductSchema.safeParse(fields);

  if (!result.success) {
    throw createError({
      status: 400,
      statusText: result.error.issues[0]?.message ?? 'Ошибка валидации',
    });
  }

  const data = result.data;

  const exists = await prisma.product.findUnique({
    where: {
      slug: data.slug,
    },
  });

  if (exists) {
    throw createError({
      status: 409,
      statusText: 'Продукт с таким slug уже существует',
    });
  }

  if (image) {
    if (!image.type?.startsWith('image/')) {
      throw createError({
        status: 400,
        statusText: 'Файл должен быть изображением',
      });
    }

    const maxSize = 5 * 1024 * 1024;

    if (image.data.length > maxSize) {
      throw createError({
        status: 400,
        statusText: 'Размер изображения не должен превышать 5 МБ',
      });
    }
  }

  let imagePath = '';

  if (image?.data && image.filename) {
    const extension = path.extname(image.filename).toLowerCase();
    const filename = `${randomUUID()}${extension}`;
    const productsDir = path.join(process.cwd(), 'public', 'products');
    await mkdir(productsDir, { recursive: true });
    await writeFile(path.join(productsDir, filename), image.data);
    imagePath = `/products/${filename}`;
  }

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
