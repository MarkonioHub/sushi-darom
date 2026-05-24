export function useDragScroll() {
  const element = ref<HTMLElement | null>(null);
  let pressed = false;
  let startX = 0;
  let scrollLeft = 0;

  function pointerDown(event: PointerEvent) {
    if (!element.value) return;
    pressed = true;
    startX = event.clientX;
    scrollLeft = element.value.scrollLeft;
    element.value.setPointerCapture(event.pointerId);
  }

  function pointerMove(event: PointerEvent) {
    if (!pressed || !element.value) return;
    event.preventDefault();
    const walk = (event.clientX - startX) * 1.5;
    element.value.scrollLeft = scrollLeft - walk;
  }

  function pointerUp(event: PointerEvent) {
    if (!element.value) return;
    pressed = false;
    element.value.releasePointerCapture(event.pointerId);
  }

  return {
    element,
    pointerDown,
    pointerMove,
    pointerUp,
  };
}
