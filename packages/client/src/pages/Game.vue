<template>
  <div class="container full-h">
    <div class="grid">
      <template v-for="(_, row) in grid" :key="row">
        <div
          v-for="(cell, column) in grid[row]"
          :key="column"
          class="cell"
          @click="selectCell(currentTurn, row, column)"
        >
          <span v-if="cell === CELL.X" class="cell__X p-color-font">X</span>
          <span v-else-if="cell === CELL.O" class="cell__O s-color-font">O</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { TEAM } from '/@/constants.js'
const CELL = {
  X: 'X',
  O: 'O',
  EMPTY: 'EMPTY'
}

export default {
  data: () => ({
    CELL,
    grid: [...Array(3)].map(() => [CELL.EMPTY, CELL.EMPTY, CELL.EMPTY]), // two dimensions
    currentTurn: TEAM.X
  }),
  computed: {
    winner() {
      // check rows
      return TEAM.X
    },
    draw() {
      return false
    }
  },
  mounted() {},
  methods: {
    selectCell(team, row, column) {
      if (this.grid[row][column] !== CELL.EMPTY) return
      this.grid[row].splice(column, 1, team)
      this.currentTurn = team === TEAM.X ? TEAM.O : TEAM.X
    }
  }
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
}

.cell {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background: var(--bg-color);

  &__X,
  &__O {
    font-size: 100px;
  }
}
</style>
