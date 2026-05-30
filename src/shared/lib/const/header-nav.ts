type HeaderNavItem =
  | { type: 'link'; text: string; to: string }
  | { type: 'button'; text: string; hash: string; to: string }
  | { type: 'external'; text: string; href: string };

export const HEADER_NAV: HeaderNavItem[] = [
  { type: 'button', text: 'Меню', hash: 'menu', to: '/' },
  { type: 'link', text: 'Акции', to: '/promo' },
  { type: 'link', text: 'Доставка', to: '/delivery' },
  { type: 'link', text: 'О нас', to: '/about' },
];
