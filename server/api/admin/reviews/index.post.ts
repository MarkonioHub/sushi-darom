import { fileSize, fileTypes, reviewSchema } from '@/entities/review';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';

export default defineEventHandler(async (event) => {
  const formData = await readMultipartFormData(event);

  if (!formData) {
    throw createError({
      status: 400,
      message: 'Некорректные данные формы',
    });
  }

  const fields: Record<string, string> = {};
  const file = formData.find((item) => item.name === 'file');

  for (const item of formData) {
    if (item.name !== 'file' && item.data && item.name) {
      fields[item.name] = item.data.toString();
    }
  }

  const result = reviewSchema.safeParse(fields);
  if (!result.success) {
    throw createError({
      status: 400,
      statusText: result.error.issues[0]?.message ?? 'Ошибка валидации',
    });
  }

  if (file) {
    if (!file.type || !fileTypes.includes(file.type)) {
      throw createError({
        status: 400,
        statusText: 'Файл должен быть формата .pdf, .jpeg, .png, .rtf, .doc, .txt',
      });
    }

    if (file.data.length > fileSize) {
      throw createError({
        status: 400,
        statusText: 'Размер файла не должен превышать 5 МБ',
      });
    }
  }

  const data = result.data;

  let filePath = '';

  if (file?.data && file.filename) {
    const extension = path.extname(file.filename).toLowerCase();
    const filename = `${randomUUID()}${extension}`;
    const productsDir = path.join(process.cwd(), 'public', 'reviews');
    await mkdir(productsDir, { recursive: true });
    await writeFile(path.join(productsDir, filename), file.data);
    filePath = `/reviews/${filename}`;
  }

  return prisma.review.create({
    data: {
      name: data.name,
      surname: data.surname,
      phone: data.phone,
      email: data.email,
      city: data.city,
      theme: data.theme,
      message: data.message,
      file: filePath,
    },
  });
});
