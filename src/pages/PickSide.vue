
<template>
  <div class="pick-side full-h">
    <h3 class="title">Pick your side</h3>

    <div class="selection full-w">
      <div class="side">
        <div class="X">X</div>
        <label class="radio">
          <span class="btn" />
          <input type="radio" value="x" v-model="side">
        </label>
      </div>

      <div class="side">
        <div class="O">O</div>
        <input type="radio" value="o" v-model="side">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    side: 'x'
  })
}
</script>

<style lang="postcss" scoped>
.pick-side {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.selection {
  display: flex;
  justify-content: space-around;
}
.side {
  display: flex;
  flex-direction: column;
  align-items: center;
  .X, .O { font-size: 100px; }
}

.radio {
  display: block;
  position: relative;
  width: 20px;
  height: 20px;
  margin-top: 15px;
  cursor: pointer;

  input[type=radio] { display: none; }

  .btn {
    position: absolute;
    top: 0;
    left: 0;
    height: inherit;
    width: inherit;
    background: var(--tertiary-color);
    border-radius: 50%;

    &:before {
      content: '';
      display: block;
      position: absolute;
      height: 20px;
      width: 20px;
      border: 1px blue solid;
      border-radius: 50%;
    }
  }
}
</style>
