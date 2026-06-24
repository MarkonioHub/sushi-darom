export const useClickOutside = (ref: Ref<HTMLElement | null>, callback: () => void) => {
  onMounted(() => {
    document.addEventListener('pointerdown', handlerClickOutside);
  });

  onUnmounted(() => {
    document.removeEventListener('pointerdown', handlerClickOutside);
  });

  function handlerClickOutside(event: PointerEvent) {
    const target = event.target as Node;

    if (ref.value && !ref.value.contains(target)) {
      callback();
    }
  }
};
