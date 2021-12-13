<template>
  <div class="row" data-masonry='{"percentPosition": true }'>
    <div
      class="col-12 col-md-6 col-xl-4 mb-4"
      v-for="manufacturer in stonelist"
      :key="manufacturer.name"
    >
      <manufacturer-card :manufacturer="manufacturer"></manufacturer-card>
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
    this.axios
      .post("/pricelist/acryl/default/")
      .then((response) => {
        this.stonelist = response.data;
      })
      .catch((err) => {
        console.log(err);
      });
    var row = document.querySelector("[data-masonry]");
    new Masonry(row, {
      // options
      percentPosition: true,
    });
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