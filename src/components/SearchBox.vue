<template>
  <section>
    <input
      @keyup.enter="dispatchSearch"
      v-model.trim="searchPhrase"
      placeholder="search image"
      type="text"
    />
    <p v-if="errorText">Please enter a text longer than 2 characters</p>
    <base-button @click.native="dispatchSearch">Find</base-button>
  </section>
</template>

<script>
export default {
  data() {
    return {
      errorText: false,
      searchPhrase: '',
    }
  },
  methods: {
    dispatchSearch() {
      console.log('dispatch')
      this.$store.dispatch('setPage', 1)
      if (this.searchPhrase.length > 2) {
        this.errorText = false
        this.$store.dispatch('setSearchPhrase', this.searchPhrase)
        this.$store.dispatch('fetchImages')
      } else {
        this.errorText = true
      }
    },
    // emitSearch() {
    //   this.$root.page = 1
    //   if (this.$root.searchPhrase.length > 2) {
    //     this.errorText = false
    //     this.$emit('fetchImages')
    //   } else {
    //     this.errorText = true
    //   }
    // },
  },
}
</script>

<style lang="scss" scoped>
$ipad-cutoff: 770px;
$mobile-cutoff: 542px;

section {
  max-width: 84%;
  margin: auto;

  @media screen and (max-width: $mobile-cutoff) {
    max-width: 100%;
  }

  input {
    border: none;
    box-shadow: 2px 2px 5px rgba(180, 180, 180, 0.7);
    padding: 0.5rem 1.5rem;
    margin-right: 0.5rem;
  }
}
</style>
