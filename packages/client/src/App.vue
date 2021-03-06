<template>
  <div class="app">
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
.app {
  display: flex;
  justify-content: center;
}

.content {
  min-height: 100vh;
  width: 500px;
}
</style>
