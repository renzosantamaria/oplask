import Vue from 'vue'
import Vuex from 'vuex'
import * as Api from "@/api";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentSearchResults: [],
    errorMsg: false,
    isLoading: false,
    page: 1,
    searchPage: 1,
    searchPhrase: "",
    searchTotalPages: 1,
    totalPages: 1
  },
  mutations: {
    setIsLoading(state, payload) {
      state.isLoading = payload
    },
    setPage(state, payload) {
      state.page = payload
    },
    setSearchPhrase(state, payload) {
      state.searchPhrase = payload
    },
    setSearchResults(state, payload) {
      if (typeof payload != "string") {
        state.currentSearchResults = payload.results;
        state.totalPages = payload.total_pages;
        state.searchTotalPages = state.totalPages;
        state.searchPage = state.page;
        state.isLoading = false;
      } else {
        state.errorMsg = true;
      }
    },
    setSearchTotalPages(state, payload) {
      state.searchTotalPages = payload
    },
    setTotalPages(state, payload) {
      state.totalPages = payload
    }
  },
  actions: {
    async fetchImages(context) {
      context.commit('setIsLoading', true)
      const data = await Api.fetchImages(
        context.state.searchPhrase,
        context.state.page
      );

      context.commit('setSearchResults', data)
      // if (typeof data != "string") {
      //   this.$root.currentSearchResults = data.results;
      //   this.$root.totalPages = data.total_pages;
      //   this.$root.searchTotalPages = this.$root.totalPages;
      //   this.$root.searchPage = this.$root.page;
      //   this.$root.isLoading = false;
      // } else {
      //   this.errorMsg = true;
      // }
    },
    setPage(context, payload) {
      context.commit('setPage', payload)
    },
    setSearchPhrase(context, payload) {
      context.commit('setSearchPhrase', payload)
    },
    setSearchTotalPages(context, payload) {
      context.commit('setSearchTotalPages', payload)
    },
    setTotalPages(context, payload) {
      context.commit('setTotalPages', payload)
    }
  },
  getters: {
    getCurrentPage(state) {
      return state.page
    },
    getErrorMsg(state) {
      return state.errorMsg
    },
    getIsLoading(state) {
      return state.isLoading
    },
    getSearchPage(state) {
      return state.searchPage
    },
    getSearchPhrase(state) {
      return state.searchPhrase
    },
    getSearchResults(state) {
      return state.currentSearchResults
    },
    getSearchTotalPages(state) {
      return state.searchTotalPages
    },
    getTotalPages(state) {
      return state.totalPages
    }
  },
  modules: {
  }
})
