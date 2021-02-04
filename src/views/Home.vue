<template>
  <div class="home">
    <search-box @fetchImages="fetch" />
    <gallery :images="$root.currentSearchResults" @fetchNewPage="fetch" />
  </div>
</template>

<script>
import Gallery from '../components/Gallery.vue'
import SearchBox from '../components/SearchBox.vue'
import * as Api from '@/api'

export default {
  name: 'Home',
  components: {
    SearchBox,
    Gallery,
  },
  created() {
    this.$root.page = 1
    if (this.$root.currentSearchResults.length) {
      this.$root.totalPages = this.$root.searchTotalPages
      this.$root.page = this.$root.searchPage
    }
  },
  data() {
    return {
      imageArray: [],
    }
  },
  methods: {
    async fetch() {
      this.$root.isLoading = true
      const data = await Api.fetchImages(
        this.$root.searchPhrase,
        this.$root.page
      )

      this.$root.currentSearchResults = data.results
      this.$root.totalPages = data.total_pages
      this.$root.searchTotalPages = this.$root.totalPages
      this.$root.searchPage = this.$root.page
      this.$root.isLoading = false
    },
  },
}
</script>
