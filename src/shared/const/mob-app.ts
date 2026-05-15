interface MobApp {
  iconDesk: string;
  iconMob: string;
  href: string;
}

export const MOB_APP = [
  {
    iconDesk: 'google-play-desk',
    iconMob: 'google-play-mob',
    href: 'https://play.google.com/store/',
  },
  {
    iconDesk: 'app-store-desk',
    iconMob: 'app-store-mob',
    href: 'https://www.apple.com/app-store/',
  },
] satisfies MobApp[];
