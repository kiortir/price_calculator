import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    manufacturers: []
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
    }
  },
  actions: {
    async hydrate({ commit, dispatch }) {
      axios
        .post("manufacturers/")
        .then(response => {
          commit('setManufacturers', response.data);
          return response.data
        })
        .then((manufacturers) => manufacturers.forEach(manufacturer => dispatch('loadManufacturer', manufacturer.name)))
    },
    async loadManufacturer({ state, commit }, manufacturers) {
      if (!Array.isArray(manufacturers)) {
        manufacturers = [manufacturers,]
      }
      manufacturers = manufacturers.filter(manufacturer => !state.manufacturers[manufacturer].stones.length)

      if (manufacturers.length) {
        axios
          .post("manufacturer/", {
            manufacturers: manufacturers
          }).then(response => {
            commit('addManufacturers', response.data);
          })
      }
    }
  },

  getters: {
    isDesktop() {
      return window.matchMedia("(min-width: 1024px)").matches;
    },

  }
})
