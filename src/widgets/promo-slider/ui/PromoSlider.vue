<script setup lang="ts">
  import type { SwiperContainer } from 'swiper/element';
  import { usePromoModal } from '@/entities/promo';

  const containerRef = useTemplateRef<SwiperContainer>('containerRef');
  const disablePrev = ref(true);
  const disableNext = ref(false);

  const { pushQuery } = usePromoModal();

  onMounted(async () => {
    await nextTick();

    const swiperElement = containerRef.value;

    if (!swiperElement) return;

    swiperElement.injectStyles = [
      `
      .swiper {
        padding-bottom: 40px;
        margin-inline: -16px;
        padding-inline: 16px;
      }
      @media (min-width: 768px) {
        .swiper {
          margin-inline: 0;
          padding-inline: 0;
        }
      }
      .swiper-pagination {
        bottom: 0;
      }
      .swiper-pagination-bullet {
        opacity: 1;
        background-color: var(--placeholder-content);
      }

      .swiper-pagination-bullet-active {
        background-color: var(--color-primary)
      }
      `,
    ];

    swiperElement.initialize();
    const swiper = swiperElement.swiper;

    swiper.on('slideChange', updateButtons);
    swiper.on('reachEnd', updateButtons);
    swiper.on('fromEdge', updateButtons);

    function updateButtons() {
      disablePrev.value = swiper.isBeginning;
      disableNext.value = swiper.isEnd;
    }
  });
</script>

<template>
  <section class="my-[30px]">
    <ContainerSite>
      <div class="group relative">
        <button
          :class="[
            'hidden',
            'lg:flex',
            'group-hover:opacity-[1.0]',
            'hover:bg-[var(--tertiary-background)]',
            'opacity-0',
            'absolute',
            'left-0',
            'top-[50%]',
            'z-[2]',
            'translate-x-[-50%]',
            'translate-y-[-50%]',
            'rounded-[50%]',
            'bg-[#ffffff]',
            'p-[10px]',
            'shadow-[0_0_24px_0_#66666614]',
            'transition',
            'duration-[var(--transition-duration)]',
            'disabled:hidden',
          ]"
          :disabled="disablePrev"
          @click="containerRef?.swiper?.slidePrev()"
        >
          <IconApp name="app:chevron-left" class-name="w-[20px] h-[20px]" />
        </button>
        <button
          :class="[
            'disabled:hidden',
            'hidden',
            'lg:flex',
            'group-hover:opacity-[1.0]',
            'hover:bg-[var(--tertiary-background)]',
            'opacity-0',
            'absolute',
            'right-0',
            'top-[50%]',
            'z-[2]',
            'translate-x-[50%]',
            'translate-y-[-50%]',
            'rounded-[50%]',
            'bg-[#ffffff]',
            'p-[10px]',
            'shadow-[0_0_24px_0_#66666614]',
            'transition',
            'duration-[var(--transition-duration)]',
            'rotate-180',
          ]"
          :disabled="disableNext"
          @click="containerRef?.swiper?.slideNext()"
        >
          <IconApp name="app:chevron-left" class-name="w-[20px] h-[20px]" />
        </button>
        <ClientOnly>
          <swiper-container
            ref="containerRef"
            slides-per-view="auto"
            space-between="10"
            :init="false"
            class="-mx-[16px] overflow-visible px-[16px]"
            :pagination="{
              clickable: true,
            }"
            :breakpoints="{
              1024: {
                spaceBetween: 20,
              },
            }"
          >
            <swiper-slide
              v-for="(slide, idx) in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
              :key="idx"
              class="!w-[200px] lg:!w-[20%]"
            >
              <div
                class="block cursor-pointer overflow-hidden rounded-[16px]"
                @click="pushQuery('1')"
              >
                <NuxtImg src="/examples/promo-vertical.png"></NuxtImg>
              </div>
            </swiper-slide>
          </swiper-container>
        </ClientOnly>
      </div>
    </ContainerSite>
  </section>
</template>

<style scoped></style>
