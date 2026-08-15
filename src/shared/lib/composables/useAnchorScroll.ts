export const useAnchorScroll = () => {
  async function navigateToAnchorScroll(url: string, anchorId: string) {
    await navigateTo(url);
    setTimeout(async () => {
      await nextTick();
      const targetElement = document.getElementById(anchorId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
        });
      }
    });
  }

  return { navigateToAnchorScroll };
};
