type YandexMetrikaConfig = {
  clickmap?: boolean;
  trackLinks?: boolean;
  accurateTrackBounce?: boolean;
  webvisor?: boolean;
  ecommerce?: boolean | string;
};

interface YandexMetrika {
  (counterId: string | number, action: 'init', config: YandexMetrikaConfig): void;

  (counterId: string | number, action: 'hit', url: string): void;

  (
    counterId: string | number,
    action: 'reachGoal',
    goalId: string,
    params?: Record<string, unknown>
  ): void;

  a?: unknown[];
  l?: number;
}

declare global {
  interface Window {
    ym?: YandexMetrika;
  }
}

export {};
