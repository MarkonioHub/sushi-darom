type FooterNavItem =
  | { type: 'link'; text: string; to: string }
  | { type: 'external'; text: string; href: string }
  | { type: 'button'; text: string; action: string };

export interface FooterNav {
  title: string;
  list: FooterNavItem[];
}

export const FOOTER_NAV: FooterNav[] = [
  {
    title: 'Клиентам',
    list: [
      { text: 'Доставка и самовывоз', to: '/delivery', type: 'link' },
      { text: 'Оставить отзыв', to: '/review', type: 'link' },
    ],
  },
  {
    title: 'О компании',
    list: [{ text: 'О нас', to: '/about', type: 'link' }],
  },
  {
    title: 'Информация',
    list: [
      { text: 'Пользовательское соглашение', href: '/doc/personal.pdf', type: 'external' },
      { text: 'Политика конфиденциальности', href: '/doc/policy.pdf', type: 'external' },
      {
        text: 'Согласие на информационную рассылку',
        href: '/doc/communication.pdf',
        type: 'external',
      },
      {
        text: 'Настройки cookie',
        type: 'button',
        action: 'cookie-modal',
      },
    ],
  },
];
