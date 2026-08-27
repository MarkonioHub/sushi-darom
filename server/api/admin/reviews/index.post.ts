import { fileSize, fileTypes, reviewSchema } from '@/entities/review';
import { saveFile } from '#server/utils/save-file';

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

  const filePath = await saveFile(file, 'reviews');

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
