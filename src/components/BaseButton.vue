<template>
  <button>
    <slot />
  </button>
</template>

<script>
export default {}
</script>

<style scoped>
button {
  cursor: pointer;
  padding: 1rem 2rem;
  border-radius: 8px;
}
</style>
