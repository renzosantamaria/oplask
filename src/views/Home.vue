<template>
  <div class="home">
    <search-box @fetchImages="fetch" />
    <gallery :images="imageArray" @fetchNewPage="fetch" />
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

      this.imageArray = data.results
      this.$root.totalPages = data.total_pages

      this.$root.isLoading = false
    },
  },
}
</script>
