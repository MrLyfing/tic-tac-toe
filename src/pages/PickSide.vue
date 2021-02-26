<template>
  <div class="pick-side full-h">
    <h3 class="title">Pick your side</h3>

    <div class="selection full-w">
      <div class="side">
        <div class="X">X</div>
        <div class="radio">
          <span class="control" />
          <input type="radio" value="x" v-model="side">
        </div>
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

<style scoped>
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
.side { text-align: center; }

.X, .O { font-size: 100px; }
.X{ color: var(--primary-color); }
.O { color: var(--secondary-color); }

.radio {
  display: block;
  position: relative;

  & input[type=radio] {
    opacity: 0.5;
  }
}

.radio .control {
  /* position: absolute;
  display: inline-block;
  left: 0;
  top: 0;
  width: 25px;
  height: 25px;
  border: 1px red solid;
  border-radius: 100%; */
}
</style>
