<template>
  <section>
    <div class="gallery-wrapper">
      <img
        class="arrow"
        v-if="arrayLength"
        src="@/assets/left-arrow.svg"
        alt="left arrow"
        @click="previousPage"
      />
      <div class="wrapper">
        <pre-loader v-if="isLoading"></pre-loader>
        <img
          v-else
          v-for="(image, index) in images"
          :key="image.id"
          :src="image.urls.thumb"
          alt="pictures"
          @click="showLightbox(image, index)"
        />
      </div>
      <img
        class="arrow"
        v-if="arrayLength"
        src="@/assets/right-arrow.svg"
        alt="right arrow"
        @click="nextPage"
      />
    </div>
  </section>
</template>

<script>
import PreLoader from "./PreLoader.vue";
export default {
  components: { PreLoader },
  props: {
    images: {
      type: Array,
    },
  },
  computed: {
    isLoading() {
      return this.$root.isLoading;
    },
    arrayLength() {
      return this.images.length;
    },
  },
  methods: {
    previousPage() {
      if (this.$root.page > 1) {
        this.$root.page--;
        console.log("prev");
        this.$emit("fetchNewPage");
      }
    },
    nextPage() {
      if (this.$root.page < this.$root.totalPages) {
        this.$root.page++;
        console.log("next");
        this.$emit("fetchNewPage");
      }
    },
    showLightbox(img, i) {
      console.log(img, i);
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  width: 80%;
  flex-wrap: wrap;

  justify-content: center;
  align-items: center;

  img {
    width: 300px;
    height: 200px;
    object-fit: cover;
    margin: 1rem;
  }
}

.gallery-wrapper {
  display: flex;
  margin: 3rem 0;
  justify-content: center;

  .arrow {
    width: 2rem;
  }
}
</style>
