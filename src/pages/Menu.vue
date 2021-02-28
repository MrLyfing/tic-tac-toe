<template>
  <div class="container full-h">
    <div class="logo">
      <span class="p-color-font">X</span>
      <span class="s-color-font">O</span>
    </div>

    <div class="menu">
      <btn class="menu__game" :to="ROUTE.PICK_TEAM.PATH">one player</btn>
      <btn class="menu__game" :to="ROUTE.PICK_TEAM.PATH">two players</btn>
      <btn class="menu__game" :to="ROUTE.PICK_TEAM.PATH">online</btn>
      <btn-settings class="menu__settings" />
    </div>
  </div>
</template>

<script>
import { ROUTE } from '/@/constants'
import Btn from '/@/components/Btn.vue'
import BtnSettings from '/@/components/BtnSettings.vue'

export default {
  components: { Btn, BtnSettings },
  data: () => ({ ROUTE }),
}
</script>

<style lang="postcss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.logo {
  font-size: 70px;
  font-weight: 600;
  letter-spacing: 5px;
}

.menu {
  display: flex;
  flex-direction: column;
  margin-top: 100px;
  text-align: center;
  &__game {
    margin-top: 20px;
  }
  &__settings {
    margin: 0 auto;
    margin-top: 30px;
  }
}
</style>
