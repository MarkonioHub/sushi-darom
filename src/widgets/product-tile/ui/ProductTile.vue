<script setup lang="ts">
  import { ProductCard } from '@/entities/product';

  const router = useRouter();
  const route = useRoute();
  const sections = new Map<string, HTMLElement>();

  function setSectionRef(el: Element | ComponentPublicInstance | null, slug: string) {
    if (!el) return;
    sections.set(slug, el as HTMLElement);
  }

  onMounted(() => {
    const currentSlug = typeof route.query.category === 'string' ? route.query.category : '';
    if (currentSlug) {
      const element = document.getElementById(currentSlug);

      if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const slug = entry.target.id;
            router.replace({
              query: {
                ...route.query,
                category: slug,
              },
            });
          }
        });
      },
      {
        rootMargin: '-65px 0px 0px 0px',
        threshold: 0.3,
      }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    window.addEventListener('scroll', checkScrollY, { passive: true });

    function checkScrollY() {
      if (window.scrollY === 0) {
        const query = { ...route.query };
        delete query.category;
        router.replace({
          query: query,
        });
      }
    }

    onUnmounted(() => {
      observer.disconnect();
      window.removeEventListener('scroll', checkScrollY);
    });
  });
</script>

<template>
  <section
    class="mb-[80px] mt-[40px] scroll-mt-[calc(var(--header-height)+var(--header-category-nav))]"
    v-for="(section, index) in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]"
    :key="index"
    :id="`slug-${section}`"
    :ref="(el) => setSectionRef(el, `slug-${section}`)"
  >
    <ContainerSite>
      <h3 class="mb-[20px] text-[24px] font-[600] lg:text-[32px]">Категория {{ section }}</h3>
      <ul class="mb-[24px] flex flex-wrap gap-[12px]">
        <li
          v-for="(tab, index) in [1, 2, 3, 4, 5, 6, 7, 8, 9]"
          :key="index"
          :class="[
            'border',
            'border-solid',
            'border-[#191c23]',
            'rounded-[999px]',
            'p-[4px_8px]',
            'flex',
            'items-center',
            'gap-[4px]',
            'flex-wrap',
            'cursor-pointer',
            'hover:bg-[var(--tertiary-background)]',
            'transition-colors',
          ]"
        >
          <NuxtImg src="/public/examples/tag.png" class="h-[19px]" />
          Таб {{ tab }}
        </li>
      </ul>
      <div :class="['flex', 'flex-wrap', 'gap-[40px_20px]']">
        <ProductCard
          v-for="(product, index) in [1, 2, 3, 4, 5, 6, 7, 8, 9]"
          :key="index"
          :class="[
            'xl:w-[calc(25%-15px)]',
            'w-[100%]',
            'sm:w-[calc(50%-10px)]',
            'lg:w-[calc(33.33%-14px)]',
          ]"
        />
      </div>
    </ContainerSite>
  </section>
</template>

<style scoped></style>
