import { createStore } from 'vuex';
import axios from 'axios';
export default createStore({
  state: {
    active_component: null,
    component_data: null,
    chosenStone: null,
  },
  actions: {
    setCollection({ commit }, payload) {
      axios
        .post('/pricelist/acryl/collectioninfo/', {
          manufacturer: payload.manufacturer,
          collection: payload.collection,
        })
        .then((response) => {
          payload.stones = response.data;
        })
        .then(() => {
          commit('showCollections', payload);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mutations: {
    showCollections(state, payload) {
      console.log(payload);
      state.active_component = 'CollectionContent';
      state.component_data = payload;
    },
    showSearch(state) {
      state.active_component = 'StoneSearchList';
    },
  },
});
