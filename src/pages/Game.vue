<template>
  <div class="container full-h">
    <div class="grid">
      <div v-for="n in [...Array(9).keys()]" :key="n" class="grid__cell">{{ n + 1 }}</div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="postcss">
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 110px);
  grid-auto-rows: 110px;
  background: grey;
  grid-gap: 2px;

  &__cell {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    background: var(--bg-color);
  }
}
</style>
