import type { FetchError } from 'ofetch';

export async function api<T>(url: string, options?: Parameters<typeof $fetch<T>>[1]) {
  try {
    return await $fetch<T>(url, options);
  } catch (e) {
    const error = e as FetchError;
    throw new Error(error.data?.message ?? error.message ?? 'Неизвестная ошибка');
  }
}
