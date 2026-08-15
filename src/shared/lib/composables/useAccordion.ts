export function useAccordion() {
  const opened = ref(false);

  const isOpen = () => {
    return opened.value;
  };

  const toggle = () => {
    opened.value = !opened.value;
  };

  return {
    isOpen,
    toggle,
  };
}
