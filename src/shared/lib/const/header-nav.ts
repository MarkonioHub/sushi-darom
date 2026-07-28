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

export const HEADER_ADMIN_NAV: HeaderNavItem[] = [
  { type: 'link', text: 'Перейти на сайт', to: '/' },
  { type: 'link', text: 'Города', to: '/admin/cities' },
  { type: 'link', text: 'Рестораны', to: '/admin/restourants' },
  { type: 'link', text: 'Предприниматели', to: '/admin/restourants' },
  { type: 'link', text: 'Зоны Доставки', to: '/admin/restourants' },
  { type: 'link', text: 'Категории', to: '/admin/restourants' },
  { type: 'link', text: 'Продукты', to: '/admin/restourants' },
  { type: 'link', text: 'Теги продуктов', to: '/admin/restourants' },
];
