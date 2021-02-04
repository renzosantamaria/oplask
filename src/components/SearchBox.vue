<template>
  <section>
    <input
      @keyup.enter="emitSearch"
      v-model.trim="$root.searchPhrase"
      placeholder="search image"
      type="text"
    />
    <p v-if="errorText">Please enter a text longer than 2 characters</p>
    <base-button @click.native="emitSearch">Find</base-button>
  </section>
</template>

<script>
export default {
  data() {
    return {
      errorText: false,
    }
  },
  methods: {
    emitSearch() {
      this.$root.page = 1
      if (this.$root.searchPhrase.length > 2) {
        this.errorText = false
        this.$emit('fetchImages')
      } else {
        this.errorText = true
      }
    },
  },
}
</script>

<style lang="scss" scoped>
input {
  border: none;
  box-shadow: 2px 2px 5px rgba(180, 180, 180, 0.7);
  padding: 0.5rem 1.5rem;
  margin-right: 0.5rem;
}
</style>
