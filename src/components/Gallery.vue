<template>
  <section>
    <LightBox
      v-if="showModal"
      @closeModal="hideLightbox"
      :image="currentImage"
      @showPreviousModalImage="decreaseIndex"
      @showNextModalImage="increaseIndex"
    />
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
          :alt="image.alt_description"
          @click="showLightbox(index)"
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
import PreLoader from './PreLoader.vue'
import LightBox from './LightBox'

export default {
  components: { PreLoader, LightBox },
  props: {
    images: {
      type: Array,
    },
  },
  computed: {
    isLoading() {
      return this.$root.isLoading
    },
    arrayLength() {
      return this.images.length
    },
    currentImage() {
      return this.images[this.currentIndex]
    },
  },
  data() {
    return {
      currentIndex: 0,
      showModal: false,
    }
  },
  methods: {
    previousPage() {
      if (this.$root.page > 1) {
        this.$root.page--
        this.$emit('fetchNewPage')
      }
    },
    decreaseIndex() {
      if (this.currentIndex > 0) {
        this.currentIndex--
      }
    },
    increaseIndex() {
      if (this.currentIndex < 8) {
        this.currentIndex++
      }
    },
    nextPage() {
      if (this.$root.page < this.$root.totalPages) {
        this.$root.page++
        console.log('next')
        this.$emit('fetchNewPage')
      }
    },
    hideLightbox() {
      this.showModal = false
      document.body.style.overflow = 'scroll'
    },
    showLightbox(i) {
      this.currentIndex = i
      this.showModal = true
      window.scrollTo(0, 0)
      document.body.style.overflow = 'hidden'
    },
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  width: 90%;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  img {
    width: 250px;
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
    cursor: pointer;
    width: 2rem;
  }
}
</style>
