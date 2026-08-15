import type { BreadCrumbItem } from '@/shared/ui/bread-crumbs';

export const useBreadcrumbs = (name: string) => {
  const route = useRoute();

  const breadcrumbs = computed<BreadCrumbItem[]>(() => {
    const matched = route.matched.filter((item) => item.meta.breadcrumb);

    const items = matched.map((item, index) => {
      let title = item.meta.breadcrumb!;

      if (name) {
        title = name;
      }

      return {
        title,
        to: index !== matched.length - 1 ? item.path : undefined,
      };
    });

    return [{ title: 'Главная', to: '/' }, ...items];
  });

  return {
    breadcrumbs,
  };
};
