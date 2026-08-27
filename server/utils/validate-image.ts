import type { MultiPartData } from 'h3';

export function validateImage(image?: MultiPartData | undefined) {
  if (!image) {
    return;
  }

  if (!image.type?.startsWith('image/')) {
    throw createError({
      status: 400,
      statusText: 'Файл должен быть изображением',
    });
  }

  if (image.data.length > 5 * 1024 * 1024) {
    throw createError({
      status: 400,
      statusText: 'Размер изображения не должен превышать 5 МБ',
    });
  }
}
