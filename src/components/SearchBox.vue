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
    };
  },
  methods: {
    emitSearch() {
      // console.log(this.searchPhrase)
      // this.searchPhrase = ''
      if (this.$root.searchPhrase.length > 2) {
        this.errorText = false;
        this.$emit("fetchImages");
      } else {
        this.errorText = true;
      }
    },
  },
};
</script>

<style></style>
