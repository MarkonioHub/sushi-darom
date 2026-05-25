import type { BreadCrumbItem } from '@/shared/types/breadcrumbs';

export const useBreadcrumbs = () => {
  const route = useRoute();

  const breadcrumbs = computed<BreadCrumbItem[]>(() => {
    const matched = route.matched.filter((item) => item.meta.breadcrumb);

    const items = matched.map((item, index) => ({
      title: item.meta.breadcrumb!,
      to: index !== matched.length - 1 ? item.path : undefined,
    }));

    return [{ title: 'Главная', to: '/' }, ...items];
  });

  return {
    breadcrumbs,
  };
};
