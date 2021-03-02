<template>
  <div class="container full-h">
    <div class="grid">
      <div v-for="n in [...Array(9).keys()]" :key="n" class="grid__cell">
        <span class="s-color-font" style="font-size: 80px">O</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    grid: []
  })
}
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
  background: var(--font-color);
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
