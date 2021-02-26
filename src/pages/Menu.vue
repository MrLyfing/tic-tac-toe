<template>
  <div class="menu full-h">
    <div class="logo">
      <span class="X">X</span>
      <span class="O">O</span>
    </div>

    <div class="actions">
      <router-link class="btn-game" to="/pick">one player</router-link>
      <router-link class="btn-game" to="/pick">two players</router-link>
      <router-link class="btn-game" to="/pick">online</router-link>
      <button-settings class="btn-settings"/>
    </div>
  </div>
</template>

<script>
import ButtonSettings from '/@/components/ButtonSettings.vue'

export default {
  components: { ButtonSettings }
}
</script>

<style lang="postcss" scoped>
  .menu {
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

  .actions {
    display: flex;
    flex-direction: column;
    margin-top: 100px;
    text-align: center;
  }

  .btn-game {
    margin-top: 20px;
    padding: 20px 35px;
    border: 3px var(--font-color) solid;
    border-radius: 10px;
    font-weight: 600;
    text-decoration: none;
    text-transform: uppercase;
  }

  .btn-settings {
    margin: 0 auto;
    margin-top: 30px;
  }
</style>
