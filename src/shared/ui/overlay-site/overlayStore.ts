export const useOverlayStore = defineStore('overlay', () => {
  const visible = ref(false);

  const open = () => {
    visible.value = true;
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    visible.value = false;
    document.body.style.overflow = '';
  };

  return { visible, open, close };
});
