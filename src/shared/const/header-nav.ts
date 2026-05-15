interface HeaderNavTo {
  text: string;
  to: string;
}

interface HeaderNavHref {
  text: string;
  href: string;
}

export const HEADER_NAV = [
  { text: 'Меню', to: '/#menu' },
  { text: 'Акции', to: '/promo' },
  { text: 'Доставка', to: '/delivery' },
  { text: 'О нас', to: '/about' },
  { text: 'Вакансии', href: '#' },
] satisfies Array<HeaderNavTo | HeaderNavHref>;
