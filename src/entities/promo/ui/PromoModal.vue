<script setup lang="ts">
  const route = useRoute();
  const slug = route.query?.promo;
</script>

<template>
  <div>
    <NuxtImg src="examples/promo-horizontal.png" class="h-[294px]"></NuxtImg>
    <div class="h-[calc(100%-294px)] overflow-y-auto p-[30px]">
      <div class="mb-[20px] text-[20px] font-[600] leading-[24px] lg:text-[32px] lg:leading-[38px]">
        УСПЕЙ ВЗЯТЬ ЭКСКЛЮЗИВ!
      </div>
      <div class="text-[16px] leading-[18px] text-[var(--color-secondary)]">
        Мы собрали все ваши любимые роллы в один Фирменный сет и добавили то, чего нет ни у кого.
        Нет, это не просто соус😍 Это — те самые черные сувенирные палочки от СУШИ ДАРОМ💞
        Эксклюзив, который невозможно купить отдельно. 💥 48 топовых роллов: от классики с лососем
        до запеченных хитов. 💥 Выгода 50%: ты платишь только половину стоимости — всего 1499₽.
        💥Лимитированный подарок: Стильные, чёрные, фирменные палочки, которые останутся у тебя как
        символ крутого ужина. ⚠️ Осторожно: сеты с сувениром разлетаются быстро. Количество в каждом
        городе ограничено!
      </div>
    </div>
  </div>
</template>

<style scoped></style>
