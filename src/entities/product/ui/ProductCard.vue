<script setup lang="ts">
  const route = useRoute();
  const productId = route.params.id;
</script>

<template>
  <div>
    <ContainerSite>
      <div>
        <NuxtImg src="/examples/set.png" alt="" :class="['']" />
        <div>
          <h1>Сет Ресторанный</h1>
          <div>48 шт/ 1370 гр</div>
          <div>
            <div>1 499 ₽</div>
          </div>
        </div>
      </div>
    </ContainerSite>
  </div>
</template>

<style scoped></style>
