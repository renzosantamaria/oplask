<template>
  <button>
    <slot />
  </button>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
button {
  background-color: #ffdab9;
  color: #333;
  border: none;
  cursor: pointer;
  font-family: inherit;
  padding: 0.5rem 1.5rem;
  border-radius: 8px;
  box-shadow: 2px 2px 5px rgba(180, 180, 180, 0.7);
  text-transform: uppercase;

  &:hover {
    background-color: darken(#ffdab9, 10%);
  }
}

.download-button {
  background-color: #fff;
}
</style>
