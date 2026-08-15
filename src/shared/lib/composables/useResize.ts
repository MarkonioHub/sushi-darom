import { debounce } from '@/shared/lib/utils/debounce';

export function useResize(callback: () => void, debounceTime: number) {
  const handler = debounce(callback, debounceTime);

  onMounted(() => {
    callback();
    window.addEventListener('resize', handler);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', handler);
  });
}
