<template>
  <section>
    <transition name="modal">
      <LightBox
        v-if="showModal"
        @closeModal="hideLightbox"
        :image="currentImage"
        @showPreviousModalImage="decreaseIndex"
        @showNextModalImage="increaseIndex"
      />
    </transition>
    <div class="gallery-wrapper">
      <img
        class="arrow"
        v-if="arrayLength && totalPages > 1"
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
        v-if="arrayLength && totalPages > 1"
        src="@/assets/right-arrow.svg"
        alt="right arrow"
        @click="nextPage"
      />
    </div>
    <span v-if="arrayLength">Page {{ page }} of {{ totalPages }}</span>
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
      return this.$store.getters.getIsLoading
    },
    arrayLength() {
      return this.images.length
    },
    page() {
      return this.$store.getters.getCurrentPage
    },
    totalPages() {
      return this.$store.getters.getTotalPages
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
      if (this.page > 1) {
        let newPage = this.page - 1
        // this.$root.page--
        this.$store.dispatch('setPage', newPage)
        // this.$store.dispatch('fetchImages')
        if (this.$route.path == '/') {
          this.$store.dispatch('fetchImages')
        } else {
          this.$emit('fetchNewPage')
        }
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
      if (this.page < this.totalPages) {
        let newPage = this.page + 1
        // this.$root.page--
        this.$store.dispatch('setPage', newPage)

        // this.$root.page++
        if (this.$route.path == '/') {
          this.$store.dispatch('fetchImages')
        } else {
          this.$emit('fetchNewPage')
        }
      }
    },
    hideLightbox() {
      this.showModal = false
      document.body.style.overflow = 'scroll'
      this.$emit('updateFavorites')
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
$ipad-cutoff: 770px;
$mobile-cutoff: 542px;

.modal-enter,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.5s;
}

.modal-enter-to,
.modal-leave {
  opacity: 1;
}

.gallery-wrapper {
  display: flex;
  margin: 3rem 0;
  justify-content: center;

  .wrapper {
    display: flex;
    width: 90%;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    img {
      cursor: pointer;
      width: 30%;
      height: 13rem;
      object-fit: cover;
      margin: 0.5rem;

      @media screen and (max-width: $mobile-cutoff) {
        width: 28%;
        height: 8rem;
        margin: 5px;
      }
    }
  }

  .arrow {
    cursor: pointer;
    width: 2rem;

    @media screen and (max-width: $mobile-cutoff) {
      width: 1rem;
    }
  }
}

span {
  display: block;
  text-align: center;
  font-size: 0.9rem;
}
</style>
