import { type Ref } from 'vue';

export function useDragScroll(element: Ref<HTMLElement | null>) {
  const isDragging = ref(false);

  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  function onMouseDown(e: MouseEvent) {
    if (!element.value) return;

    isDown = true;
    isDragging.value = false;

    element.value.style.scrollSnapType = 'none';
    element.value.style.scrollBehavior = 'auto';

    startX = e.pageX - element.value.offsetLeft;
    scrollLeft = element.value.scrollLeft;
  }

  function onMouseMove(e: MouseEvent) {
    if (!isDown || !element.value) return;

    e.preventDefault();

    const x = e.pageX - element.value.offsetLeft;
    const walk = (x - startX) * 1.5;

    if (Math.abs(walk) > 5) {
      isDragging.value = true;
    }

    element.value.scrollLeft = scrollLeft - walk;
  }

  function onMouseUpOrLeave() {
    if (!isDown || !element.value) return;

    isDown = false;

    element.value.style.scrollSnapType = 'x mandatory';
    element.value.style.scrollBehavior = '';

    setTimeout(() => {
      isDragging.value = false;
    }, 50);
  }

  return {
    isDragging,
    onMouseDown,
    onMouseMove,
    onMouseUpOrLeave,
  };
}
