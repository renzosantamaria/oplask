<template>
  <div class="home">
    <search-box @fetchImages="fetch" />
    <p v-if="errorMsg" class="error">Unable to load images. Please try again</p>
    <gallery
      v-else
      :images="$root.currentSearchResults"
      @fetchNewPage="fetch"
    />
  </div>
</template>

<script>
import Gallery from "../components/Gallery.vue";
import SearchBox from "../components/SearchBox.vue";
import * as Api from "@/api";

export default {
  name: "Home",
  components: {
    SearchBox,
    Gallery,
  },
  created() {
    this.$root.page = 1;
    if (this.$root.currentSearchResults.length) {
      this.$root.totalPages = this.$root.searchTotalPages;
      this.$root.page = this.$root.searchPage;
    }
  },
  data() {
    return {
      imageArray: [],
      errorMsg: false,
    };
  },
  methods: {
    async fetch() {
      this.$root.isLoading = true;
      const data = await Api.fetchImages(
        this.$root.searchPhrase,
        this.$root.page
      );

      if (typeof data != "string") {
        this.$root.currentSearchResults = data.results;
        this.$root.totalPages = data.total_pages;
        this.$root.searchTotalPages = this.$root.totalPages;
        this.$root.searchPage = this.$root.page;
        this.$root.isLoading = false;
      } else {
        this.errorMsg = true;
      }
    },
  },
};
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
