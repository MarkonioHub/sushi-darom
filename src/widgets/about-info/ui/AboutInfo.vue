<script setup lang="ts">
  import decor_1 from '../images/decor-1.png';
  import line_1 from '../images/line-1.svg';
  import line_2 from '../images/line-2.svg';
  import {
    companyInfo,
    companyValues,
    companyQuality,
    companySteps,
    companyContacts,
  } from '../model/consts';
  import type { CompanyStepVariant } from '../model/types';

  const companyStepsVariant: Record<CompanyStepVariant, string[]> = {
    one: [],
    two: ['lg:m-[60px_0_40px_80px]', 'm-0'],
    three: ['lg:m-[0_60px_0_52px]', 'm-0'],
    four: ['lg:m-[38px_68px_0_432px]', 'm-0'],
  };
</script>

<template>
  <div :class="['lg:mb-[80px]', 'mb-[40px]']">
    <ContainerSite>
      <div
        :class="[
          'lg:p-[56px_82px_64px_82px]',
          'p-[20px]',
          'rounded-[16px]',
          'bg-[#000000]',
          'flex',
          'items-start',
          'justify-between',
          'gap-[20px]',
          'flex-wrap',
          'mb-[20px]',
        ]"
      >
        <div :class="['max-w-[550px]']">
          <h1
            :class="[
              'lg:text-[40px]',
              'lg:leading-[48px]',
              'mb-[10px]',
              'text-[#ffffff]',
              'font-[600]',
              'text-[26px]',
              'leading-[30px]',
            ]"
          >
            Суши Даром — это сервис доставки японской кухни, успешно работающий с 2017 года.
          </h1>
          <p :class="['text-[20px]', 'leading-[24px]', 'text-[#ffffff]']">
            Мы предлагаем нашим клиентам свежие и вкусные блюда, создавая уникальные кулинарные
            впечатления.
          </p>
        </div>
        <img :src="decor_1" :class="['shrink-0', 'w-[300px]']" alt="" />
      </div>
      <div :class="['flex', 'flex-wrap', 'gap-[20px]', 'mb-[40px]']">
        <div
          v-for="item in companyInfo"
          :key="item.note"
          :class="[
            'bg-[var(--secondary-background)]',
            'p-[24px_16px_20px_24px]',
            'text-[16px]',
            'leading-[18px]',
            'rounded-[16px]',
            'md:w-[calc(33.33%-14px)]',
            'w-[100%]',
            'flex',
            'flex-col',
            'gap-[5px]',
          ]"
        >
          <div>{{ item.note }}</div>
          <div>{{ item.value }}</div>
        </div>
      </div>
      <h2 :class="['lg:text-[32px]', 'font-[600]', 'mb-[16px]', 'text-[24px]']">
        Наша миссия и ценности
      </h2>
      <div :class="['flex', 'gap-[20px]', 'flex-col', 'xl:flex-row', 'mb-[40px]']">
        <div
          :class="[
            'bg-[var(--secondary-background)]',
            'rounded-[16px]',
            'lg:p-[28px_32px]',
            'xl:max-w-[280px]',
            'flex',
            'flex-wrap',
            'justify-between',
            'xl:block',
            'p-[20px]',
          ]"
        >
          <div :class="['max-w-[305px]', 'xl:max-w-[100%]', 'shrink-0', 'w-[100%]']">
            <div :class="['lg:text-[24px]', 'mb-[8px]', 'font-[600]', 'text-[20px]']">Миссия</div>
            <p :class="['leading-[20px]', 'text-[var(--color-secondary)]']">
              Мы стремимся предоставлять высокий уровень обслуживания, удовлетворяя все потребности
              наших клиентов.
            </p>
          </div>
          <img :src="decor_1" alt="" :class="['w-[200px]']" />
        </div>
        <div
          :class="[
            'bg-[var(--secondary-background)]',
            'rounded-[16px]',
            'lg:p-[28px_32px]',
            'grow',
            'flex',
            'flex-col',
            'p-[20px]',
          ]"
        >
          <div :class="['lg:text-[24px]', 'mb-[8px]', 'font-[600]', 'text-[20px]']">Ценности</div>
          <p :class="['leading-[20px]', 'text-[var(--color-secondary)]']">
            В основе нашей работы лежат принципы, которые разделяют все сотрудники
          </p>
          <ul :class="['flex', 'gap-[10px]', 'lg:mt-[20px]', 'grow', 'flex-wrap', 'mt-[15px]']">
            <li
              :class="[
                'bg-[#ffffff]',
                'lg:p-[20px]',
                'rounded-[16px]',
                'lg:w-[calc(25%-8px)]',
                'sm:w-[calc(50%-5px)]',
                'w-[100%]',
                'p-[16px]',
              ]"
              v-for="item in companyValues"
              :key="item.title"
            >
              <h4 :class="['lg:text-[20px]', 'mb-[8px]', 'font-[600]', 'text-[16px]']">
                {{ item.title }}
              </h4>
              <p :class="['leading-[20px]', 'text-[var(--color-secondary)]']">
                {{ item.text }}
              </p>
            </li>
          </ul>
        </div>
      </div>
      <h2 :class="['lg:text-[32px]', 'font-[600]', 'mb-[16px]', 'text-[24px]']">Качество и цены</h2>
      <ul :class="['flex', 'gap-[20px]', 'flex-wrap', 'lg:flex-nowrap', 'mb-[40px]']">
        <li
          v-for="item in companyQuality"
          :key="item.title"
          :class="[
            'bg-[var(--secondary-background)]',
            'rounded-[16px]',
            'lg:p-[28px_32px]',
            'grow',
            'flex',
            'lg:flex-col',
            'flex-row',
            'flex-wrap',
            'lg:flex-nowrap',
            'p-[20px]',
            'lg:w-[calc(33.33%-14px)]',
            'w-[100%]',
            'justify-between',
          ]"
        >
          <div :class="['max-w-[500px]', 'lg:max-w-[100%]', 'shrink-0', 'w-[100%]']">
            <h4 :class="['lg:text-[20px]', 'mb-[8px]', 'font-[600]', 'text-[16px]']">
              {{ item.title }}
            </h4>
            <p :class="['leading-[20px]', 'mb-[20px]']">{{ item.text }}</p>
          </div>
          <img :src="decor_1" :class="['w-[200px]']" alt="" />
        </li>
      </ul>
      <h2 :class="['lg:text-[32px]', 'font-[600]', 'mb-[20px]', 'text-[20px]', 'lg:text-center']">
        Соблюдаем контроль на каждом этапе производства продукции
      </h2>
      <div :class="['relative', 'max-w-[940px]', 'm-[0_auto_40px_auto]']">
        <img
          :src="line_1"
          :class="[
            'shrink-0',
            'w-[820px]',
            'absolute',
            'top-[15x]',
            'right-[-10px]',
            'lg:block',
            'hidden',
            'absolute',
          ]"
          alt=""
        />
        <img
          :src="line_2"
          :class="[
            'shrink-0',
            'w-[527px]',
            'absolute',
            'top-[336px]',
            'left-[0]',
            'lg:block',
            'hidden',
          ]"
          alt=""
        />
        <ul
          :class="[
            'flex',
            'flex-wrap',
            'lg:items-start',
            'items-stretch',
            'relative',
            'z-[1]',
            'gap-[20px]',
            'lg:gap-0',
          ]"
        >
          <li
            v-for="item in companySteps"
            :key="item.title"
            :class="[
              ...(companyStepsVariant[item.variant] || []),
              'lg:p-[24px_28px]',
              'bg-[var(--secondary-background)]',
              'rounded-[16px]',
              'lg:max-w-[430px]',
              'max-w-[100%]',
              'lg:w-[100%]',
              'sm:w-[calc(50%-10px)]',
              'w-[100%]',
              'p-[20px]',
            ]"
          >
            <h4
              :class="[
                'lg:text-[24px]',
                'text-[16px]',
                'lg:mb-[10px]',
                'mb-[6px]',
                'leading-[20px]',
                'font-[600]',
              ]"
            >
              {{ item.title }}
            </h4>
            <p>{{ item.text }}</p>
          </li>
        </ul>
      </div>
      <h2 :class="['lg:text-[32px]', 'font-[600]', 'mb-[16px]', 'text-[24px]']">
        Есть вопрос или предложение?
      </h2>
      <div :class="['mb-[20px]']">Напишите нам</div>
      <ul :class="['flex', 'gap-[20px]', 'flex-wrap']">
        <li
          v-for="item in companyContacts"
          :key="item.title"
          :class="[
            'p-[18px_20px]',
            'bg-[var(--secondary-background)]',
            'rounded-[16px]',
            '2xl:w-[calc(25%-15px)]',
            'md:w-[calc(50%-10px)]',
            'w-[100%]',
            'flex',
            'flex-col',
            'justify-between',
          ]"
        >
          <h4 :class="['text-[16px]', 'font-[600]', 'mb-[6px]']">{{ item.title }}</h4>
          <a :href="`mailto:${item.email}`" :class="['text-[16px]', 'text-[var(--color-orange)]']">
            {{ item.email }}
          </a>
        </li>
      </ul>
    </ContainerSite>
  </div>
</template>

<style scoped></style>
