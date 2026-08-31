import { useOverlayStore } from '../overlay-site';

export const useModalStore = defineStore('modal', () => {
  const route = useRoute();
  const router = useRouter();
  const overlayStore = useOverlayStore();
  const isOpen = ref(false);
  const component = shallowRef(null);
  const size = ref<string>('');
  const componentProps = ref({});

  async function open(modalComponent: any, modalSize: string, props?: {}) {
    await nextTick();
    component.value = modalComponent;
    isOpen.value = true;
    size.value = modalSize;
    overlayStore.open();
    if (props) componentProps.value = props;
  }

  function close() {
    component.value = null;
    isOpen.value = false;
    size.value = '';
    componentProps.value = {};
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
    componentProps,
  };
});
