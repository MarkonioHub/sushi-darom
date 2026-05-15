interface SocialList {
  icon: string;
  href: string;
}

export const SOCIAL_LIST = [
  {
    icon: 'vk',
    href: 'https://vk.com',
  },
  {
    icon: 'tg',
    href: 'https://t.me',
  },
  {
    icon: 'max',
    href: 'https://max.ru',
  },
] satisfies SocialList[];
