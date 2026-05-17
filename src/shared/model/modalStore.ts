import { useOverlayStore } from './overlayStore';

export const useModalStore = defineStore('modal', () => {
  const route = useRoute();
  const router = useRouter();
  const overlayStore = useOverlayStore();
  const isOpen = ref(false);
  const component = shallowRef(null);
  const className = ref<string>('');

  function open(modalComponent: any, modalClassName: string) {
    component.value = modalComponent;
    isOpen.value = true;
    className.value = modalClassName;
    overlayStore.open();
  }

  function close() {
    component.value = null;
    isOpen.value = false;
    className.value = '';
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
    className,
  };
});
