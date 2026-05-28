interface HeaderNavTo {
  text: string;
  to: string;
  hash?: string;
}

interface HeaderNavHref {
  text: string;
  href: string;
}

export const HEADER_NAV = [
  { text: 'Меню', to: '/', hash: 'menu' },
  { text: 'Акции', to: '/promo' },
  { text: 'Доставка', to: '/delivery' },
  { text: 'О нас', to: '/about' },
] satisfies Array<HeaderNavTo | HeaderNavHref>;
