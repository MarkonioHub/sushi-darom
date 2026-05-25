import { useOverlayStore } from './overlayStore';

export const useModalStore = defineStore('modal', () => {
  const route = useRoute();
  const router = useRouter();
  const overlayStore = useOverlayStore();
  const isOpen = ref(false);
  const component = shallowRef(null);
  const size = ref<string>('');

  function open(modalComponent: any, modalSize: string) {
    component.value = modalComponent;
    isOpen.value = true;
    size.value = modalSize;
    overlayStore.open();
  }

  function close() {
    component.value = null;
    isOpen.value = false;
    size.value = '';
    overlayStore.close();
    const query = { ...route.query };
    delete query.promo;
    router.replace({ query });
  }

  return {
    open,
    close,
    isOpen,
    component,
    size,
  };
});
