<template>
  <div>
    <p v-if="!this.favorites">No Favorites</p>
    <gallery
      v-else
      :images="currentFavorites"
      @fetchNewPage="setCurrentFavorites"
      @updateFavorites="setUpdatedFavorites"
    />
  </div>
</template>

<script>
import * as API from '../api'
import Gallery from '../components/Gallery'
export default {
  components: {
    Gallery,
  },
  created() {
    this.$store.dispatch('setSearchTotalPages', this.totalPages)
    this.$store.dispatch('setPage', 1)
    this.favorites = API.getFavorites()

    if (this.favorites) {
      this.$store.dispatch(
        'setTotalPages',
        Math.ceil(this.favorites.length / 9)
      )
      this.currentFavorites = this.favorites.slice(0, 9)
    }
  },

  computed: {
    page() {
      return this.$store.getters.getCurrentPage
    },
    totalPages() {
      return this.$store.getters.getTotalPages
    },
    indexStart() {
      return this.page * 9 - 9
    },
  },
  data() {
    return {
      favorites: [],
      currentFavorites: [],
    }
  },
  methods: {
    setCurrentFavorites() {
      this.currentFavorites = this.favorites.slice(
        this.indexStart,
        this.indexStart + 9
      )
    },
    setUpdatedFavorites() {
      this.favorites = API.getFavorites()
      if (this.favorites) {
        this.totalPages = Math.ceil(this.favorites.length / 9)
        this.currentFavorites = this.favorites.slice(0, 9)
      }
      this.setCurrentFavorites()
    },
  },
}
</script>
