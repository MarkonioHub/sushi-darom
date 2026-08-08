import { useModalStore } from '@/shared/ui/modal-base';
import { default as PromoModal } from '../ui/PromoModal.vue';

export function usePromoModal() {
  const modalStore = useModalStore();
  const router = useRouter();
  const route = useRoute();

  watch(
    () => route.query.promo,

    (promo) => {
      if (promo) {
        modalStore.open(PromoModal, 'middle', {});
      }
    }
  );

  onMounted(() => {
    if (route.query.promo) modalStore.open(PromoModal, 'middle', {});
  });

  function pushQuery(slug: string) {
    router.replace({
      query: {
        ...route.query,
        promo: slug,
      },
    });
  }

  return {
    pushQuery,
  };
}
