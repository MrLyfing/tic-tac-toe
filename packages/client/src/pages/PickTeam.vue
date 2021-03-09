
<template>
  <div class="container full-h">
    <h3 class="header">Pick your team</h3>

    <div class="selection full-w">
      <div
        :class="['selection__team', { 'selection--enable': selectedTeam === TEAM.X }]"
        @click="selectedTeam = TEAM.X"
      >
        <div class="selection__logo p-color-font">X</div>
        <label class="radio">
          <input v-model="selectedTeam" class="radio__input" type="radio" :value="TEAM.X" />
          <span class="radio__btn" />
        </label>
      </div>

      <div
        :class="['selection__team', { 'selection--enable': selectedTeam === TEAM.O }]"
        @click="selectedTeam = TEAM.O"
      >
        <div class="selection__logo s-color-font">O</div>
        <label class="radio">
          <input v-model="selectedTeam" class="radio__input" type="radio" :value="TEAM.O" />
          <span class="radio__btn" />
        </label>
      </div>
    </div>

    <btn class="btn-continue" size="small" @click="submit">Continue</btn>
  </div>
</template>

<script>
import { TEAM, EVENT, GAME_MODE } from '@tic-tac-toe/common'
import { ROUTE } from '/@/constants'
import socket from '/@/socket.js'

import Btn from '/@/components/Btn.vue'

export default {
  components: { Btn },
  data: () => ({
    TEAM,
    ROUTE,
    selectedTeam: TEAM.X
  }),
  methods: {
    submit() {
      const data = {
        gameMode: GAME_MODE.SINGLE_PLAYER,
        p1Name: 'Lyfing',
        p1Team: this.selectedTeam
      }
      socket.emit(EVENT.CREATE_SINGLE, data, res => {
        console.log(res)
        if (res.success) {
          this.$router.push({ path: ROUTE.GAME.PATH })
        } else {
          // error, do something
        }
      })
    }
  }
}
</script>

<style lang="postcss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.header {
  margin-bottom: 70px;
}
.selection {
  display: flex;
  justify-content: space-around;
  &__team {
    display: flex;
    flex-direction: column;
    align-items: center;
    opacity: 0.3;
    cursor: pointer;
  }
  &--enable {
    opacity: 1;
  }
  &__logo {
    font-size: 130px;
  }
}

.radio {
  display: block;
  position: relative;
  width: 25px;
  height: 25px;
  margin-top: 15px;
  cursor: pointer;

  &__input {
    display: none;
  }
  &__input:checked + &__btn {
    background: radial-gradient(var(--font-color) 45%, var(--bg-color) 51%);
    opacity: 1;
  }

  &__btn {
    position: absolute;
    top: 0;
    left: 0;
    height: inherit;
    width: inherit;
    border-radius: 50%;
    border: 3px var(--font-color) solid;
  }
}

.btn-continue {
  margin-top: 100px;
}
</style>
