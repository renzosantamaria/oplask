<template>
  <section ref="modal" @click="closeModal" class="image-modal">
    <img
      ref="close"
      class="close-icon"
      @click="closeModal"
      src="@/assets/close.svg"
      alt="Close Icon"
    />
    <div class="outer-wrapper">
      <img
        @click="previousImage"
        class="arrow"
        src="@/assets/left-arrow-white.svg"
        alt="Left arrow"
      />

      <div ref="image" class="image-wrapper">
        <PreLoader />
        <img
          ref="image"
          class="lightbox-image"
          :src="image.urls.regular"
          :alt="image.alt_description"
        />
        <nav>
          <img
            v-if="!favorite"
            @click="addToFavorites"
            ref="image"
            src="@/assets/favorite-empty.svg"
            alt="Non-favorite Heart"
          />
          <img
            v-else
            @click="addToFavorites"
            ref="image"
            src="@/assets/favorite-filled.svg"
            alt="Favorite Heart"
          />
          <base-button
            class="download-button"
            @click.native="saveImage"
            ref="image"
            >Download image</base-button
          >
        </nav>
      </div>
      <img
        @click="nextImage"
        class="arrow"
        src="@/assets/right-arrow-white.svg"
        alt="Right arrow"
      />
    </div>
  </section>
</template>

<script>
import BaseButton from './BaseButton.vue'
import PreLoader from './PreLoader'
import * as API from '../api'

export default {
  components: { BaseButton, PreLoader },
  props: {
    image: Object,
  },
  data() {
    return {
      favorite: false,
    }
  },
  methods: {
    addToFavorites() {
      this.favorite = true
      API.setFavorite(this.image)
    },
    saveImage() {
      API.saveImage(this.image, this.$root.searchPhrase)
    },
    nextImage() {
      this.favorite = false
      this.$emit('showNextModalImage')
    },
    previousImage() {
      this.favorite = false
      this.$emit('showPreviousModalImage')
    },
    closeModal(e) {
      if (this.$refs.modal == e.target || this.$refs.close == e.target) {
        this.$emit('closeModal')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
$ipad-cutoff: 770px;
$mobile-cutoff: 542px;

.image-modal {
  align-items: center;
  background-color: rgba(0, 0, 0, 0.9);
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  .close-icon {
    width: 2.5rem;
    cursor: pointer;
    position: absolute;
    top: 2rem;
    right: 2rem;

    @media screen and (max-width: $ipad-cutoff) {
      top: 1rem;
      right: 1rem;
    }
  }

  .outer-wrapper {
    align-items: center;
    display: flex;

    .image-wrapper {
      @media screen and (max-width: $ipad-cutoff) {
        align-items: center;
        display: flex;
        flex-direction: column;
        max-height: 90vh;
        justify-content: center;
      }
    }

    .lightbox-image {
      height: 30rem;
      width: auto;
      margin: 0 3rem;

      @media screen and (max-width: $ipad-cutoff) {
        height: auto;
        max-height: 100%;
        width: 85%;
        margin: 0 1rem;
        overflow: hidden;
        object-fit: contain;
      }
    }

    .arrow {
      fill: #fff;
      @media screen and (max-width: $ipad-cutoff) {
        padding: 0 1rem;
      }
    }

    nav {
      display: flex;
      justify-content: space-between;
      margin: 1rem 3rem;

      @media screen and (max-width: $ipad-cutoff) {
        width: 85%;
      }

      img {
        max-width: 3rem;
      }

      .download-button {
        background-color: #fff;
        box-shadow: none;
      }
    }
  }
}
</style>
