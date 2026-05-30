type FooterNavItem =
  | { type: 'link'; text: string; to: string }
  | { type: 'external'; text: string; href: string };

interface FooterNav {
  title: string;
  list: FooterNavItem[];
}

export const FOOTER_NAV = [
  {
    title: 'Клиентам',
    list: [
      { text: 'Доставка и самовывоз', to: '/delivery', type: 'link' },
      { text: 'Оставить отзыв', to: '/', type: 'link' },
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
    ],
  },
] satisfies FooterNav[];
