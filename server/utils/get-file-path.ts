import { join } from 'node:path';

export function getFilePath(file: string) {
  return join(process.cwd(), 'public', file.replace(/^\/+/, ''));
}
