<template>
  <div class="container full-h">
    {{ gameState }}
    <div class="grid">
      <template v-for="(_, row) in grid" :key="row">
        <div v-for="(cell, column) in grid[row]" :key="column" class="cell" @click="playCell(currentTurn, row, column)">
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
  X: TEAM.X,
  O: TEAM.O,
  EMPTY: 'EMPTY'
}

const STATE = {
  PLAY: 'PLAY',
  DRAW: 'DRAW',
  WIN_X: 'WIN_X',
  WIN_O: 'WIN_O'
}

const TEAM_TO_STATE_WIN = {
  [TEAM.X]: STATE.WIN_X,
  [TEAM.O]: STATE.WIN_O
}

const MAX_TURNS = 9

export default {
  data: () => ({
    CELL,
    grid: [...Array(3)].map(() => [CELL.EMPTY, CELL.EMPTY, CELL.EMPTY]),
    currentTurn: TEAM.X,
    turnCount: 0
  }),
  computed: {
    gameState() {
      if (this.draw) return STATE.DRAW
      else if (this.winner) return TEAM_TO_STATE_WIN[this.winner]
      else return STATE.PLAY
    },
    draw() {
      return this.turnCount === MAX_TURNS && !this.rowsWinner && !this.columnsWinner && !this.diagonalsWinner
    },
    winner() {
      return this.rowsWinner || this.columnsWinner || this.diagonalsWinner
    },
    rowsWinner() {
      for (let i = 0; i < this.grid.length; ++i) {
        if (
          this.grid[i][1] === this.grid[i][0] &&
          this.grid[i][1] === this.grid[i][2] &&
          this.grid[i][0] !== CELL.EMPTY
        ) {
          return this.grid[i][0]
        }
      }
      return null
    },
    columnsWinner() {
      for (let j = 0; j < this.grid.length; ++j) {
        if (
          this.grid[1][j] === this.grid[0][j] &&
          this.grid[1][j] === this.grid[2][j] &&
          this.grid[0][j] !== CELL.EMPTY
        ) {
          return this.grid[0][j]
        }
      }
      return null
    },
    diagonalsWinner() {
      if (this.grid[1][1] === CELL.EMPTY) return null
      if (this.grid[1][1] === this.grid[0][0] && this.grid[1][1] === this.grid[2][2]) return this.grid[1][1]
      if (this.grid[1][1] === this.grid[0][2] && this.grid[1][1] === this.grid[2][0]) return this.grid[1][1]
      return null
    }
  },
  mounted() {},
  methods: {
    playCell(team, row, column) {
      this.turnCount++
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
  flex-direction: column;
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
