import { join } from 'node:path';

export function getProductImagePath(image: string) {
  return join(process.cwd(), 'public', image.replace(/^\/+/, ''));
}
