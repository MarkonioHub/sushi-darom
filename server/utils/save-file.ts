import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { mkdir, unlink, writeFile } from 'node:fs/promises';
import { getFilePath } from '#server/utils/get-file-path';
import type { MultiPartData } from 'h3';

export async function saveFile(
  file: MultiPartData | undefined,
  folderName: string,
  oldFile?: string
) {
  if (file?.data && file?.filename) {
    const extension = path.extname(file.filename).toLowerCase();
    const filename = `${randomUUID()}${extension}`;
    const promosDir = path.join(process.cwd(), 'public', folderName);
    await mkdir(promosDir, { recursive: true });
    await writeFile(path.join(promosDir, filename), file.data);

    if (oldFile) {
      const filePath = getFilePath(oldFile);
      try {
        await unlink(filePath);
      } catch (error) {
        console.log('Не удалось удалить файл: ', error);
      }
    }

    return `/${folderName}/${filename}`;
  }
}
