<template>
  <div>
    <div class="row" data-masonry='{"percentPosition": true }'>
      <div class="col col-12 col-md-6 col-xl-4 mb-4 masonry-grid-item" v-for="manufacturer in stonelist"
        :key="manufacturer.name">
        <manufacturer-card :manufacturer="manufacturer" @setOffcanvasData="setOffcanvasData"></manufacturer-card>
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
    };
  },
  mounted() {
    // const getData = async () => {
    //   this.stonelist = JSON.parse(
    //     document.getElementById("manufacturers").textContent
    //   );
    // };
    // getData().then(() => {
    //   let row = document.querySelector("[data-masonry]");
    //   new Masonry(row, {
    //     // options
    //     itemSelector: ".masonry-grid-item",
    //     percentPosition: true,
    //   });
    // });
    this.update()
    window.onfocus = () => this.update()
  },

  components: {
    ManufacturerCard,
  },
  methods: {
    async update() {
      await this.axios
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
    }
  }
};
</script>


<style scoped>
.configuration {
  font-size: 0.9em !important;
}
</style>