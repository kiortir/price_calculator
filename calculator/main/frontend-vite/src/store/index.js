import { createStore } from 'vuex'
import MaterialStore from './materials'
import ProductStore from './products'
import Fields from './fields'
import axios from 'axios'

export default createStore({
  state: {
  },
  mutations: {
    resetState(state) {
      state = {}
    }
  },
  actions: {
    async toDefault({ commit }) {
      commit('resetState')
      commit('materials/resetState')
    },
    async getEstimation({ commit, dispatch, state }, id) {
      await dispatch('toDefault').then(() => {
        axios
          .post("api/estimation/", { id }).then(r => { this.estimation = r.data; })
      });
    }
  },
  modules: {
    materials: MaterialStore,
    products: ProductStore,
    fields: Fields,
  },
  getters: {
    isDesktop() {
      return window.matchMedia("(min-width: 1024px)").matches;
    },
    // currentTab() {
    //   return this.$route.query.tab || "materials";
    // },
  }
})
