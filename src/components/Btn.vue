<template>
  <router-link class="btn" :to="to">
    <slot />
  </router-link>
</template>
<script>
export default {
  props: {
    to: String
  }
}
</script>

<style scoped>
.btn {
  padding: 20px 35px;
  border: 3px var(--font-color) solid;
  border-radius: 10px;
  font-weight: 600;
  color: var(--font-color);
  text-decoration: none;
  text-transform: uppercase;
}
</style>
