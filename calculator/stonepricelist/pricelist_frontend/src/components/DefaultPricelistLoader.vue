<template>
  <div>
    <div class="row" data-masonry='{"percentPosition": true }'>
      <div
        class="col col-12 col-md-6 col-xl-4 mb-4 masonry-grid-item"
        v-for="manufacturer in stonelist"
        :key="manufacturer.name"
      >
        <manufacturer-card
          :manufacturer="manufacturer"
          @setOffcanvasData="setOffcanvasData"
        ><slot></slot></manufacturer-card>
      </div>
    </div>
    <div class="offcanvas offcanvas-start" tabindex="-1" id="collectioninfo">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasExampleLabel">
          {{ chosen_manufacturer
          }}<span class="ms-1">{{ collection_data.name }}</span>
        </h5>
        <button
          type="button"
          class="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div class="offcanvas-body">
        <div class="mb-4" v-if="configs_non_std.length > 0">
          <div class="h6">Нестандартные конфигурации</div>
          <table class="table table-sm table-hover mb-4">
            <tbody>
              <tr
                v-for="configuration in configs_non_std"
                :key="configuration.alias"
              >
                <td>
                  {{ configuration.alias }},
                  {{ configuration.thickness }}
                </td>
                <td class="text-end pe-2 my-auto">
                  {{ configuration.price
                  }}<span class="ms-1">руб/м<sup>2</sup></span>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-if="collection_data.stones.length > 0">
            <div class="h5">Камни в коллекции</div>

            <input
              type="search"
              id="collectionsearch"
              class="form-control mb-3"
              placeholder="Фильтр"
              v-model="search"
            />

            <ul>
              <li v-for="stone in stones" :key="stone.code">
                <span class="me-2">{{ stone.code }}</span>
                <span class="">{{ stone.name }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ManufacturerCard from "./ManufacturerCard.vue";

import Masonry from "masonry-layout";

export default {
  name: "DefaultPricelistLoader",
  data() {
    return {
      stonelist: null,
      collection_data: { stones: [] },
      chosen_manufacturer: null,
      configs_non_std: [],
      search: "",
    };
  },
  computed: {
    stones() {
      if (this.collection_data.stones.length > 0) {
        return this.collection_data.stones.filter((stone) => {
          return (
            stone.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
            stone.code.toLowerCase().indexOf(this.search.toLowerCase()) > -1
          );
        });
      } else {
        return [];
      }
    },
  },
  mounted() {
    this.axios
      .post("/pricelist/acryl/default/")
      .then((response) => {
        this.stonelist = response.data;
      })
      .then(() => {
        let row = document.querySelector("[data-masonry]");
        new Masonry(row, {
          // options
          itemSelector: ".masonry-grid-item",
          percentPosition: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    setOffcanvasData(info) {
      this.search = "";
      this.collection_data = { stones: [] };
      let emitted_collection = info.collection;
      this.chosen_manufacturer = info.manufacturer;
      this.collection_data.price = emitted_collection.price;
      this.collection_data.name = emitted_collection.name;
      this.axios
        .post("/pricelist/acryl/collectioninfo/", {
          manufacturer: info.manufacturer,
          collection: emitted_collection.name,
        })
        .then((response) => {
          this.collection_data.stones = response.data;
          this.configs_non_std = info.collection.configurations;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  components: {
    ManufacturerCard,
  },
};
</script>


<style scoped>
.configuration {
  font-size: 0.9em !important;
}
</style>