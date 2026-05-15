interface FooterNavTo {
  text: string;
  to: string;
}

interface FooterNavHref {
  text: string;
  href: string;
}

interface FooterNav {
  title: string;
  list: Array<FooterNavTo | FooterNavHref>;
}

export const FOOTER_NAV = [
  {
    title: 'Клиентам',
    list: [
      { text: 'Доставка и самовывоз', to: '#' },
      { text: 'Оставить отзыв', to: '#' },
    ],
  },
  {
    title: 'О компании',
    list: [
      { text: 'О нас', to: '#' },
      { text: 'Вакансии', href: '#' },
      { text: 'Франшиза', href: '#' },
    ],
  },
  {
    title: 'Информация',
    list: [
      { text: 'Пользовательское соглашение', href: '/doc/personal.pdf' },
      { text: 'Политика конфиденциальности', href: '/doc/policy.pdf' },
      { text: 'Согласие на информационную рассылку', href: '/doc/communication.pdf' },
    ],
  },
] satisfies FooterNav[];
