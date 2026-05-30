export const useMobileMenuStore = defineStore('mobile-menu', () => {
  const isMobileMenuOpen = ref(false);

  const open = () => {
    isMobileMenuOpen.value = true;
  };

  const close = () => {
    isMobileMenuOpen.value = false;
  };

  return { isMobileMenuOpen, open, close };
});
