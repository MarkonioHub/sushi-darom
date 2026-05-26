export function useDragScroll() {
  const element = ref<HTMLElement | null>(null);

  let pressed = false;
  let startX = 0;
  let scrollLeft = 0;

  const isDragging = ref(false);

  function pointerDown(event: PointerEvent) {
    pressed = true;
    startX = event.clientX;
    scrollLeft = element.value?.scrollLeft ?? 0;
    isDragging.value = false;
  }

  function pointerMove(event: PointerEvent) {
    if (!pressed || !element.value) return;

    const walk = event.clientX - startX;

    if (Math.abs(walk) > 10) {
      isDragging.value = true;
    }

    element.value.scrollLeft = scrollLeft - walk;
  }

  function pointerUp() {
    pressed = false;

    requestAnimationFrame(() => {
      isDragging.value = false;
    });
  }

  return {
    element,
    isDragging,
    pointerDown,
    pointerMove,
    pointerUp,
  };
}
