import Vue from 'vue'
import Vuex from 'vuex'
import * as Api from "@/api";

Vue.use(Vuex)
//Modules: [Home, favorite]
export default new Vuex.Store({
  state: {
    // currentSearchResults: [], //home
    // errorMsg: false, //home
    isLoading: false, //global
    // page: 1, // 1 for home and 1 for favorites
    // searchPage: 1, //avvaktar, tas bort sen
    // searchPhrase: "", //home
    // searchTotalPages: 1,//avvaktar, tas bort sen
    // totalPages: 1 // 1 for home and 1 for favorites
  },

  //home page/total page

  mutations: {
    setIsLoading(state, payload) { // global
      state.isLoading = payload
    },
    // setPage(state, payload) { // 1 for home and 1 for favorites
    //   state.page = payload
    // },
    // setSearchPhrase(state, payload) { //home
    //   state.searchPhrase = payload
    // },
    // setSearchResults(state, payload) { //home
    //   if (typeof payload != "string") {
    //     state.currentSearchResults = payload.results;
    //     state.totalPages = payload.total_pages;
    //     state.searchTotalPages = state.totalPages;
    //     state.searchPage = state.page;
    //     state.isLoading = false;
    //   } else {
    //     state.errorMsg = true;
    //   }
    // },
    // setSearchTotalPages(state, payload) { // tas bort?
    //   state.searchTotalPages = payload
    // },
    // setTotalPages(state, payload) { // 1 for home and 1 for favorites
    //   state.totalPages = payload
    // }
  },
  actions: {
    // async fetchImages(context) { //home
    //   context.commit('setIsLoading', true)
    //   const data = await Api.fetchImages(
    //     context.state.searchPhrase,
    //     context.state.page
    //   );

    //   context.commit('setSearchResults', data)
    //   // // if (typeof data != "string") {
    //   // //   this.$root.currentSearchResults = data.results;
    //   // //   this.$root.totalPages = data.total_pages;
    //   // //   this.$root.searchTotalPages = this.$root.totalPages;
    //   // //   this.$root.searchPage = this.$root.page;
    //   // //   this.$root.isLoading = false;
    //   // // } else {
    //   // //   this.errorMsg = true;
    //   // // }
    // },
    // setPage(context, payload) { // 1 for home and 1 for favorites
    //   context.commit('setPage', payload)
    // },
    // setSearchPhrase(context, payload) { // Home
    //   context.commit('setSearchPhrase', payload)
    // },
    // setSearchTotalPages(context, payload) { // tas bort?
    //   context.commit('setSearchTotalPages', payload)
    // },
    // setTotalPages(context, payload) { // 1 for home and 1 for favorites
    //   context.commit('setTotalPages', payload)
    // }
  },
  getters: {
    // getCurrentPage(state) { // 1 for home and 1 for favorites
    //   return state.page
    // },
    // getErrorMsg(state) { //Home
    //   return state.errorMsg
    // },
    getIsLoading(state) { // Global
      return state.isLoading
    },
    // getSearchPage(state) { // Tas bort
    //   return state.searchPage
    // },
    // getSearchPhrase(state) { // Home
    //   return state.searchPhrase
    // },
    // getSearchResults(state) { //Home
    //   return state.currentSearchResults
    // },
    // getSearchTotalPages(state) { //Tas bort
    //   return state.searchTotalPages
    // },
    // getTotalPages(state) { //1 for Home 1 for Favorites
    //   return state.totalPages
    // }
  },


//--------MODULES-------//

  modules: {
    homeModule:{
      namespaced: true,
      state: () => ({
        currentSearchResults: [], //home
        errorMsg: false, //home
        page: 1, // 1 for home and 1 for favorites
        searchPhrase: "", //home
        totalPages: 1 // 1 for home and 1 for favorites
      }),

      mutations: {
        setPage(state, payload) { // 1 for home and 1 for favorites
          state.page = payload
        },
        setSearchPhrase(state, payload) { //home
          state.searchPhrase = payload
        },
        setSearchResults(state, payload) { //home
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
        setTotalPages(state, payload) { // 1 for home and 1 for favorites
          state.totalPages = payload
        }
      },

      actions: {
        async fetchImages(context) { //home
          context.commit('setIsLoading', true)
          const data = await Api.fetchImages(
            context.state.searchPhrase,
            context.state.page
          );
          context.commit('setSearchResults', data)
        },        

        setPage(context, payload) { // 1 for home and 1 for favorites
          context.commit('setPage', payload)
        },
        setSearchPhrase(context, payload) { // Home
          context.commit('setSearchPhrase', payload)
        },
        setTotalPages(context, payload) { // 1 for home and 1 for favorites
          context.commit('setTotalPages', payload)
        }
      },
      getters: {
        getCurrentPage(state) { // 1 for home and 1 for favorites
          return state.page
        },
        getErrorMsg(state) { //Home
          return state.errorMsg
        },

        getSearchPhrase(state) { // Home
          return state.searchPhrase
        },
        getSearchResults(state) { //Home
          return state.currentSearchResults
        },
        getTotalPages(state) { //1 for Home 1 for Favorites
          return state.totalPages
        }
      }
    },
    favoriteModule:{
      namespaced: true,
      state: () => ({
        page: 1, // 1 for home and 1 for favorites
        totalPages: 1 // 1 for home and 1 for favorites
      }),

      mutations: {
        setPage(state, payload) { // 1 for home and 1 for favorites
          state.page = payload
        },
        setTotalPages(state, payload) { // 1 for home and 1 for favorites
          state.totalPages = payload
        }
      },
      actions: {

        setPage(context, payload) { // 1 for home and 1 for favorites
          context.commit('setPage', payload)
        },
        setTotalPages(context, payload) { // 1 for home and 1 for favorites
          context.commit('setTotalPages', payload)
        }
      },

      getters: {
        getCurrentPage(state) { // 1 for home and 1 for favorites
          return state.page
        },
        getTotalPages(state) { //1 for Home 1 for Favorites
          return state.totalPages
        }
      },

    }
  }
})
