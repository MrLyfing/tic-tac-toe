<template>
  <router-link :class="['btn', `btn--${size}`]" :to="to">
    <slot />
  </router-link>
</template>
<script>
export default {
  props: {
    to: { type: String, default: '' },
    size: {
      type: String,
      default: 'regular',
    },
  },
}
</script>

<style lang="postcss" scoped>
.btn {
  border: 3px var(--font-color) solid;
  border-radius: 10px;
  font-weight: 600;
  color: var(--font-color);
  text-decoration: none;
  text-transform: uppercase;

  &--regular {
    padding: 20px 35px;
    font-size: 16px;
  }

  &--small {
    padding: 10px 25px;
    font-size: 14px;
  }
}
</style>
