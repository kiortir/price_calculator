import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    loaded: false,
    manufacturers: {}
  },
  mutations: {
    setManufacturers(state, value) {
      state.manufacturers = Object.assign({}, ...value.map(manufacturer => {
        return { [manufacturer.name]: manufacturer }
      }))
    },
    addManufacturers(state, manufacturers) {
      manufacturers.forEach((manufacturer) => {
        state.manufacturers[manufacturer.name] = { ...state.manufacturers[manufacturer.name], ...manufacturer }
      })
      state.loaded = true
    }
  },
  actions: {
    async hydrate({ commit, dispatch }) {
      axios
        .get("manufacturers/")
        .then(response => {
          commit('setManufacturers', response.data);
        })
        .then(() => dispatch('loadManufacturers'))
    },
    async loadManufacturers({ commit },) {
      axios
        .get('manufacturer/').then(response => {
          commit('addManufacturers', response.data);
        })
    }
  },

  getters: {
    isDesktop() {
      return window.matchMedia("(min-width: 1024px)").matches;
    },

  }
})
