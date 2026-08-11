import { createProductSchema, productSchema } from '@/entities/product';
import { prisma } from '#server/utils/prisma';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { mkdir, unlink, writeFile } from 'node:fs/promises';
import { getProductImagePath } from '#server/utils/get-product-image-path';

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
  const image = formData.find((item) => item.name === 'imageFile');

  for (const item of formData) {
    if (item.name !== 'imageFile' && item.data) {
      fields[item.name!] = item.data.toString();
    }
  }

  const result = createProductSchema.safeParse(fields);
  if (!result.success) {
    throw createError({
      status: 422,
      message: result.error.issues[0]?.message ?? 'Ошибка валидации',
    });
  }

  const data = result.data;

  const duplicateSlug = await prisma.product.findFirst({
    where: {
      slug: data.slug,
      NOT: {
        id,
      },
    },
  });

  if (duplicateSlug) {
    throw createError({
      status: 409,
      message: 'Продукт с таким slug уже существует',
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

  const productExists = await prisma.product.findUnique({
    where: { id },
  });

  if (!productExists) {
    throw createError({
      status: 404,
      message: 'Продукт с таким id не существует',
    });
  }

  let imagePath = data.image;
  if (image?.data && image?.filename) {
    const extension = path.extname(image.filename).toLowerCase();
    const filename = `${randomUUID()}${extension}`;
    const productsDir = path.join(process.cwd(), 'public', 'products');
    await mkdir(productsDir, { recursive: true });
    await writeFile(path.join(productsDir, filename), image.data);
    imagePath = `/products/${filename}`;

    if (data.image) {
      const imagePath = getProductImagePath(data.image);
      try {
        await unlink(imagePath);
      } catch (error) {
        console.log('Не удалось удалить изображение продукта: ', error);
      }
    }
  }

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
