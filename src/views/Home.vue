<template>
  <div class="home">
    <search-box />
    <p v-if="errorMsg" class="error">Unable to load images. Please try again</p>
    <gallery v-else :images="currentSearchResults" />
  </div>
</template>

<script>
// @fetchNewPage="fetch"
import Gallery from '../components/Gallery.vue'
import SearchBox from '../components/SearchBox.vue'

export default {
  name: 'Home',
  components: {
    SearchBox,
    Gallery,
  },
  computed: {
    currentSearchResults() {
      return this.$store.getters.getSearchResults
    },
    errorMsg() {
      return this.$store.getters.getErrorMsg
    },
    page() {
      return this.$store.getters.getCurrentPage
    },
    searchPage() {
      return this.$store.getters.getSearchPage
    },
    searchTotalPages() {
      return this.$store.getters.getSearchTotalPages
    },
  },
  created() {
    // this.$root.page = 1
    this.$store.dispatch('setPage', 1)
    if (this.currentSearchResults.length) {
      console.log('im here')
      this.$store.dispatch('setTotalPages', this.searchTotalPages)
      this.$store.dispatch('setPage', this.searchPage)
    }
  },
  // data() {
  //   return {
  //     imageArray: [],
  //     // errorMsg: false,
  //   };
  // },
  methods: {
    // async fetch() {
    //   this.$root.isLoading = true;
    //   const data = await Api.fetchImages(
    //     this.$root.searchPhrase,
    //     this.$root.page
    //   );
    //   if (typeof data != "string") {
    //     this.$root.currentSearchResults = data.results;
    //     this.$root.totalPages = data.total_pages;
    //     this.$root.searchTotalPages = this.$root.totalPages;
    //     this.$root.searchPage = this.$root.page;
    //     this.$root.isLoading = false;
    //   } else {
    //     this.errorMsg = true;
    //   }
    // },
  },
}
</script>

<style lang="scss" scoped>
.error {
  color: red;
  max-width: 84%;
  margin: auto;
  margin-top: 1rem;
  font-size: 1rem;
  text-transform: uppercase;
  font-weight: 700;
}
</style>
