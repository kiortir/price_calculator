import { createStore } from 'vuex';
import axios from 'axios';
import {
  products as PRODUCTS,
  options as OPTIONS,
  defaultAddons as ADDONS,
} from './product_refs.js';
function capitalize(str) {
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function focusCard(tab, index) {
  setTimeout(function () {
    let element = document.getElementById(`${tab}-${index}`);
    element.scrollIntoView({
      block: 'center',
      behavior: 'auto',
    });
  }, 0);
}

export default createStore({
  state: JSON.parse(document.getElementById('values').textContent).values,
  actions: {
    save({ commit, state }) {
      axios
        .put('template/save', {
          data: {
            values: state.values,
            name: state.name,
          },
        })
        .then(function (response) {
          if (response.data.new) {
            window.history.pushState(
              {},
              `Расчет ${response.data.id}`,
              response.data.id
            );
            commit('setId', response.data.id);
          }
        })
        .catch(function (error) {
          alert(error);
        });
    },
  },

  mutations: {
    setId(state, id) {
      state.id = id;
    },
    addMaterialCard(state) {
      let cards = state.values.material_cards;
      cards.push({
        materialName: null,
        materialPrice: null,
        materialCount: null,
        result: 0,
      });
      focusCard('material-card', cards.length - 1);
    },
    removeMaterialCard(state, index) {
      state.values.material_cards.splice(index, 1);
    },
    updateMaterialName(state, payload) {
      state.values.material_cards[payload.index].materialName = capitalize(
        payload.value
      );
    },
    updateMaterialField(state, payload) {
      state.values.material_cards[payload.index][payload.field] = payload.value;
    },

    addProductCard(state) {
      let cards = state.values.product_cards;
      cards.push({
        chosenType: '',
        option_card: [],
        installation: { status: false, length: null },
        addons: JSON.parse(JSON.stringify(ADDONS)),
      });
      focusCard('product-card', cards.length - 1);
    },
    removeProductCard(state, index) {
      state.values.product_cards.splice(index, 1);
    },

    updateCardOptions(state, payload) {
      let card = state.values.product_cards[payload.cardIndex];
      card.chosenType = payload.choice;
      card.option_card = PRODUCTS[payload.choice].defaultOptions.map(
        (option) => {
          return {
            component_type: option.component,
            data: JSON.parse(JSON.stringify(option.data)),
            result: null,
          };
        }
      );
    },
    addCardOption(state, payload) {
      if (payload.choice != null) {
        let required_option = OPTIONS[payload.choice];
        let card_option_list =
          state.values.product_cards[payload.cardIndex].option_card;
        card_option_list.push({
          component_type: required_option.component,
          data: JSON.parse(JSON.stringify(required_option.data)),
          result: null,
        });
      }
    },
    removeCardOption(state, payload) {
      state.values.product_cards[payload.cardIndex].option_card.splice(
        payload.optionIndex,
        1
      );
    },

    updateOptionValue(state, payload) {
      let optionCard =
        state.values.product_cards[payload.cardIndex].option_card[
          payload.optionIndex
        ];
      optionCard.data[payload.field] = payload.value;
    },

    insertAddons(state, cardIndex) {
      state.values.product_cards[cardIndex].addons = JSON.parse(
        JSON.stringify(ADDONS)
      );
    },

    updateAddonInput(state, payload) {
      state.values.product_cards[payload.cardIndex].addons[payload.addonIndex][
        payload.field
      ] = payload.value;
    },
    updateAddonSelector(state, payload) {
      state.values.product_cards[payload.cardIndex].addons[payload.addonIndex][
        payload.field
      ].selected = payload.value;
    },
    updateAddonCheckbox(state, payload) {
      let checkbox =
        state.values.product_cards[payload.cardIndex].addons[
          payload.addonIndex
        ];
      checkbox.isChecked = !checkbox.isChecked;
    },

    updateInstallationLength(state, payload) {
      state.values.product_cards[payload.cardIndex].installation.length =
        payload.value;
    },
    updateInstallationStatus(state, payload) {
      state.values.product_cards[payload.cardIndex].installation.status =
        payload.value;
      if (payload.value === true && state.values.logistics.mounting < 1) {
        state.values.logistics.mounting = 1;
      }
    },

    updateLogisticsInfo(state, payload) {
      state.values.logistics[payload.field] = payload.value;
    },

    setDiscount(state, value) {
      state.values.discount = value;
    },
  },
});
