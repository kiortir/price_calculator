<template>
  <div class="container">
    <default-pricelist-loader></default-pricelist-loader>
  </div>
</template>

<script>
import DefaultPricelistLoader from "./components/DefaultPricelistLoader.vue";

export default {
  name: "App",
  components: {
    DefaultPricelistLoader,
  },
};
</script>