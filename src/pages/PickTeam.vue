
<template>
  <div class="container full-h">
    <h3 class="header">Pick your team</h3>

    <div class="selection full-w">
      <div class="selection__team" @click="team = 'x'">
        <div class="selection__logo p-color-font">X</div>
        <label class="radio">
          <input class="radio__input" type="radio" value="x" v-model="team">
          <span class="radio__btn" />
        </label>
      </div>

      <div class="selection__team" @click="team = 'o'">
        <div class="selection__logo s-color-font">O</div>
        <label class="radio">
          <input class="radio__input" type="radio" value="o" v-model="team">
          <span class="radio__btn" />
        </label>
      </div>

    </div>

    <btn class="btn-continue" size="small" to="/play">Continue</btn>
  </div>
</template>

<script>
import { ref } from 'vue'
import Btn from '/@/components/Btn.vue'

export default {
  components: { Btn },
  setup () {
    const team = ref('x')
    return { team }
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

.header { margin-bottom: 70px; }
.selection {
  display: flex;
  justify-content: space-around;
  &__team {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
  }
  &__logo {
    font-size: 100px;
  }
}

.radio {
  display: block;
  position: relative;
  width: 28px;
  height: 28px;
  margin-top: 15px;
  cursor: pointer;

  &__input { display: none; }
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
    opacity: 0.6;
    border-radius: 50%;
    border: 4px var(--font-color) solid;
  }
}

.btn-continue {
  margin-top: 100px;
}
</style>
