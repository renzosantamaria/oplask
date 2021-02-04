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
        v-show="!showPreloader"
      />

      <div ref="image" class="image-wrapper">
        <PreLoader v-show="showPreloader" />
        <img
          v-show="!showPreloader"
          ref="image"
          class="lightbox-image"
          :src="image.urls.regular"
          :alt="image.alt_description"
          @load="showPreloader = false"
        />
        <nav v-show="!showPreloader">
          <img
            class="heart"
            v-if="!toggleHeart"
            @click="addToFavorites"
            ref="image"
            src="@/assets/favorite-empty.svg"
            alt="Non-favorite Heart"
          />
          <img
            class="heart"
            v-else
            @click="removeFromFavorites"
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
        v-show="!showPreloader"
      />
    </div>
  </section>
</template>

<script>
import BaseButton from "./BaseButton.vue";
import PreLoader from "./PreLoader";
import * as API from "../api";

export default {
  components: { BaseButton, PreLoader },
  props: {
    image: Object,
  },
  data() {
    return {
      toggleHeart: false,
      showPreloader: true,
    };
  },
  created() {
    this.toggleHeart = !!API.isFavorite(this.image);
  },
  updated() {
    this.toggleHeart = !!API.isFavorite(this.image);
  },

  methods: {
    addToFavorites() {
      this.toggleHeart = !this.toggleHeart;
      API.setFavorite(this.image);
    },
    removeFromFavorites() {
      this.toggleHeart = !this.toggleHeart;
      API.removeFavorite(this.image);
    },
    saveImage() {
      API.saveImage(this.image, this.$root.searchPhrase);
    },
    nextImage() {
      this.$emit("showNextModalImage");
    },
    previousImage() {
      this.$emit("showPreviousModalImage");
    },
    closeModal(e) {
      if (this.$refs.modal == e.target || this.$refs.close == e.target) {
        this.$emit("closeModal");
      }
    },
  },
};
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
      width: 1.5rem;
    }
  }

  .outer-wrapper {
    align-items: center;
    display: flex;

    @media screen and (max-width: $ipad-cutoff) {
      padding: 1rem;
    }

    .image-wrapper {
      min-height: 50vh;
      align-items: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      @media screen and (max-width: $ipad-cutoff) {
        max-height: 90vh;
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
      width: 1rem;
      @media screen and (max-width: $ipad-cutoff) {
      }
    }

    nav {
      display: flex;
      justify-content: space-between;
      margin: 1rem 3rem;
      width: 88%;

      img {
        max-width: 3rem;
        cursor: pointer;
      }

      .download-button {
        background-color: #fff;
        box-shadow: none;

        @media screen and (max-width: $ipad-cutoff) {
          font-size: 0.8rem;
          padding: 0.5rem 1rem;
        }
      }
    }
  }
}
</style>
