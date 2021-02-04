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
import * as API from "../api";
import Gallery from "../components/Gallery";
export default {
  components: {
    Gallery,
  },
  created() {
    this.$root.page = 1;
    this.favorites = API.getFavorites();

    if (this.favorites) {
      this.$root.totalPages = Math.ceil(this.favorites.length / 9);
      this.currentFavorites = this.favorites.slice(0, 9);
    }
  },

  computed: {
    indexStart() {
      return this.$root.page * 9 - 9;
    },
  },
  data() {
    return {
      favorites: [],
      currentFavorites: [],
    };
  },
  methods: {
    setCurrentFavorites() {
      this.currentFavorites = this.favorites.slice(
        this.indexStart,
        this.indexStart + 9
      );
    },
    setUpdatedFavorites() {
      this.favorites = API.getFavorites();
      if (this.favorites) {
        this.$root.totalPages = Math.ceil(this.favorites.length / 9);
        this.currentFavorites = this.favorites.slice(0, 9);
      }
      this.setCurrentFavorites();
    },
  },
};
</script>
