import { useCityStore } from '@/entities/city';
import { getRequestIP } from 'h3';

export default defineNuxtPlugin(async () => {
  interface DadataInterface {
    location?: {
      data: {
        city_fias_id: string;
      };
    };
  }

  const cityStore = useCityStore();
  if (!cityStore.cities.length) {
    await cityStore.fetchCities();
  }

  const { cityCookie } = storeToRefs(cityStore);
  if (cityCookie) {
    const city = cityStore.cities.find((city) => city.fiasId === cityCookie.value);
    if (city) {
      cityStore.setCurrentCity(city);
      return;
    } else {
      cityStore.setCityCookie('');
    }
  }

  const config = useRuntimeConfig();

  const event = useRequestEvent();
  if (!event) return;

  const ip = getRequestIP(event);

  if (ip) {
    const geo = await $fetch<DadataInterface>(
      `https://suggestions.dadata.ru/suggestions/api/4_1/rs/iplocate/address?ip=${ip}`,
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Token ${config.DADATA_API_KEY}`,
        },
      }
    );
    const fiasId = geo?.location?.data?.city_fias_id;
    const city = cityStore.cities.find((city) => city.fiasId === fiasId);
    if (city) {
      cityStore.setCurrentCity(city);
    } else {
      cityStore.setDefaultCurrentCity();
    }
  } else {
    cityStore.setDefaultCurrentCity();
  }
});
