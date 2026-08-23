import { join } from 'node:path';

export function getImagePath(file: string) {
  return join(process.cwd(), 'public', file.replace(/^\/+/, ''));
}
