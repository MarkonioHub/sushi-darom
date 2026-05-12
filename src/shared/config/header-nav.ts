interface HeaderNavItem {
    text: string;
    to?: string;
    href?: string;
    target?: '_blank' | '_self';
}

export const HEADER_NAV = [
    { text: 'Меню', to: '/#menu' },
    { text: 'Акции', to: '/promo' },
    { text: 'Доставка', to: '/delivery' },
    { text: 'О нас', to: '/about' },
    { text: 'Вакансии', href: '#', target: '_blank' },
] satisfies HeaderNavItem[]