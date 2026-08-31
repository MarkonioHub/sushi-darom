<script setup lang="ts">
  import { HEADER_NAV } from '@/shared/lib';
  import { LogoSite } from '@/shared/ui/logo-site';
  import { useAnchorScroll } from '@/shared/lib';
  import { useMobileMenuStore } from '@/shared/model';
  import { useModalStore } from '@/shared/ui/modal-base';
  import { useOverlayStore } from '@/shared/ui/overlay-site';
  import { LoginModal } from '@/features/login';
  import { InputSite } from '@/shared/ui/input-site';
  import SearchDropdown from './SearchDropdown.vue';
  import { type ProductSearchResult } from '@/entities/product';
  import { debounce } from '@/shared/lib/utils/debounce';
  import { searchProductsPreview } from '@/entities/product/model/api';

  const modalStore = useModalStore();
  const { navigateToAnchorScroll } = useAnchorScroll();
  const mobileMenuStore = useMobileMenuStore();
  const overlayStore = useOverlayStore();
  const isSearchOpen = ref(false);
  const searchRef = useTemplateRef('searchRef');
  const searchResult = ref<ProductSearchResult[]>([]);
  const searchQuery = ref<string>('');

  const searchRequest = debounce(async () => {
    searchResult.value = await searchProductsPreview(searchQuery.value);
  }, 200);

  function openMenu() {
    mobileMenuStore.open();
    overlayStore.open();
  }

  async function openSearch() {
    isSearchOpen.value = true;
    await nextTick();
    searchRef.value?.focusInput();
  }

  function closeSearch() {
    isSearchOpen.value = false;
    searchQuery.value = '';
    searchResult.value = [];
  }

  function searchHandler() {
    if (searchQuery.value.length > 2) {
      searchRequest();
    } else {
      searchResult.value = [];
    }
  }

  async function searchResultRedirect(e: Event) {
    e.preventDefault();
    if (searchQuery.value.length > 2) {
      const search = searchQuery.value.trim();
      await navigateTo({ path: '/search', query: { search } });
      closeSearch();
    }
  }
</script>

<template>
  <header
    :class="[
      'sticky',
      'top-0',
      'z-[20]',
      'border-y',
      'border-solid',
      'border-[color:var(--tertiary-background)]',
      'bg-[#ffffff]',
      'lg:py-[5px]',
      isSearchOpen ? 'p-[15px_0_72px]' : 'py-[15px]',
    ]"
  >
    <ContainerSite>
      <div
        :class="[
          'mx-[-5px]',
          'flex',
          'items-center',
          'justify-between',
          'lg:justify-normal',
          'relative',
        ]"
      >
        <div
          :class="['cursor-pointer', 'p-[5px]', 'lg:hidden', 'flex', 'items-center']"
          @click="openMenu"
        >
          <IconApp name="app:menu" :class="['h-[24px]', 'w-[24px]']" />
        </div>
        <LogoSite
          :class="['lg:order-none', 'lg:mr-[56px]', 'order-2', 'lg:pt-[16px]', 'lg:pb-[16px]']"
        />
        <nav class="hidden lg:block">
          <ul class="flex gap-[30px]">
            <li v-for="item in HEADER_NAV" :key="item.text" :class="['flex']">
              <button
                v-if="item.type === 'button'"
                @click="navigateToAnchorScroll(item.to, item.hash)"
                :class="[
                  'p-[10px]',
                  'transition-colors',
                  'duration-[var(--transition-duration)]',
                  'hover:text-[var(--color-secondary)]',
                ]"
              >
                {{ item.text }}
              </button>
              <NuxtLink
                v-else-if="item.type === 'link'"
                :to="item.to"
                :class="[
                  'p-[10px]',
                  'transition-colors',
                  'duration-[var(--transition-duration)]',
                  'hover:text-[var(--color-secondary)]',
                ]"
              >
                {{ item.text }}
              </NuxtLink>
              <a
                v-else
                :href="item.href"
                target="_blank"
                rel="noreferrer"
                :class="[
                  'p-[10px]',
                  'transition-colors',
                  'duration-[var(--transition-duration)]',
                  'hover:text-[var(--color-secondary)]',
                ]"
              >
                {{ item.text }}
              </a>
            </li>
          </ul>
        </nav>
        <div
          @click="openSearch"
          :class="[
            'group',
            'order-1',
            'flex',
            'cursor-pointer',
            'flex-col',
            'items-center',
            'p-[5px]',
            'lg:order-none',
            'lg:ml-auto',
          ]"
        >
          <IconApp
            name="app:search"
            :class="['h-[18px]', 'w-[18px]', 'lg:mb-[7px]', 'lg:h-[16px]', 'lg:w-[16px]']"
          />
          <div
            :class="[
              'hidden',
              'text-[12px]',
              'transition-colors',
              'duration-[var(--transition-duration)]',
              'group-hover:text-[var(--color-secondary)]',
              'lg:block',
            ]"
          >
            Поиск
          </div>
        </div>
        <div
          @click="modalStore.open(LoginModal, 'small')"
          :class="[
            'group',
            'order-3',
            'flex',
            'cursor-pointer',
            'flex-col',
            'items-center',
            'p-[5px]',
            'lg:order-none',
            'lg:ml-[40px]',
          ]"
        >
          <IconApp name="app:user" class="h-[20px] w-[24px] lg:mb-[5px] lg:h-[20px] lg:w-[20px]" />
          <div
            :class="[
              'hidden',
              'text-[12px]',
              'transition-colors',
              'duration-[var(--transition-duration)]',
              'group-hover:text-[var(--color-secondary)]',
              'lg:block',
            ]"
          >
            Профиль
          </div>
        </div>
        <NuxtLink
          to="/basket"
          :class="[
            'group',
            'order-4',
            'flex',
            'flex-col',
            'items-center',
            'p-[5px]',
            'lg:order-none',
            'lg:ml-[40px]',
          ]"
        >
          <IconApp
            name="app:basket"
            :class="['h-[24px]', 'w-[24px]', 'lg:mb-[5px]', 'lg:h-[20px]', 'lg:w-[20px]']"
          />
          <div
            :class="[
              'hidden',
              'text-[12px]',
              'transition-colors',
              'duration-[var(--transition-duration)]',
              'group-hover:text-[var(--color-secondary)]',
              'lg:block',
            ]"
          >
            Корзина
          </div>
        </NuxtLink>
        <form
          v-show="isSearchOpen"
          @submit="searchResultRedirect"
          :class="[
            'bg-[#fff]',
            'flex',
            'items-center',
            'lg:gap-[20px]',
            'gap-[10px]',
            'absolute',
            'lg:top-[5px]',
            'top-[8px]',
            'translate-y-[100%]',
            'lg:translate-y-0',
            'right-0',
            'lg:w-[calc(100%-250px)]',
            'w-[100%]',
          ]"
        >
          <div :class="['grow', 'relative']">
            <InputSite
              ref="searchRef"
              v-model="searchQuery"
              @input="searchHandler"
              :name="'search'"
              :type="'search'"
              :placeholder="'Поиск'"
              :class="['w-[100%]', 'p-[8px_12px]']"
            />
            <SearchDropdown :searchResult="searchResult" @closeSearch="closeSearch" />
          </div>
          <ButtonSite
            :type="'button'"
            :buttonType="'submit'"
            :class="[
              'lg:p-[8px_32px]',
              'text-[transparent]',
              'lg:text-[#ffffff]',
              'p-[8px]',
              'relative',
              'w-[40px]',
              'lg:w-auto',
            ]"
          >
            Найти
            <IconApp
              :name="'app:search'"
              :class="[
                'w-[20px]',
                'h-[20px]',
                'absolute',
                'left-[50%]',
                'top-[50%]',
                'translate-x-[-50%]',
                'translate-y-[-50%]',
                'text-[#fff]',
                'lg:hidden',
              ]"
            />
          </ButtonSite>
          <ButtonSite
            :type="'button'"
            :variant="'secondary'"
            :class="[
              'lg:p-[7px_22px]',
              'p-[6px]',
              'lg:order-none',
              'order-[-1]',
              'w-[30px]',
              'lg:w-auto',
              'relative',
              'text-[transparent]',
              'lg:text-[var(--color-primary)]',
              'border-transparent',
              'lg:border-[var(--color-primary)]',
            ]"
            @click="closeSearch"
          >
            Закрыть
            <IconApp
              :name="'app:chevron-left'"
              :class="[
                'w-[20px]',
                'h-[20px]',
                'absolute',
                'left-[50%]',
                'top-[50%]',
                'translate-x-[-50%]',
                'translate-y-[-50%]',
                'text-[#fff]',
                'lg:hidden',
              ]"
            />
          </ButtonSite>
        </form>
      </div>
    </ContainerSite>
  </header>
</template>

<style scoped></style>
