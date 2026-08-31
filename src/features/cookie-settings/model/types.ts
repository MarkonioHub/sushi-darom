export type CookieName = 'required' | 'analytics' | 'marketing';
export type CookieAction = 'save' | 'accept' | 'reject' | 'required';

export interface Cookie {
  slug: CookieName;
  disabled: boolean;
  title: string;
  tag?: string;
  text: string;
  cookieTemp: Ref<boolean | undefined>;
}
