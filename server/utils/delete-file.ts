import { getFilePath } from '#server/utils/get-file-path';
import { unlink } from 'node:fs/promises';

export async function deleteFile(file: string | null) {
  if (file) {
    const filePath = getFilePath(file);
    try {
      await unlink(filePath);
    } catch (error) {
      console.log('Не удалось удалить файл: ', error);
    }
  }
}
