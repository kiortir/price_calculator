<template>
  <product-card
    class="product-card"
    v-for="(productCard, cardIndex) of cards"
    :key="cardIndex"
    :cardIndex="cardIndex"
    :id="'product-card-' + cardIndex"
    @remove="removeProductCard(cardIndex)"
  ></product-card>
  <div class="button-row row justify-content-center mt-3 d-none d-lg-block">
    <div class="w-50 mx-auto">
      <button type="button" class="btn btn-primary w-100" @click="newCard">
        +
      </button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import ProductCard from "./ProductCard.vue";

export default {
  name: "productBlock",
  computed: {
    cards() {
      return this.$store.state.values.product_cards;
    },
  },
  methods: {
    ...mapMutations(["addProductCard", "removeProductCard"]),
    // focusNew() {
    //   let id = this.cards.length;
    //   setTimeout(function () {
    //     document.getElementById("product-card-el-" + (id - 1)).scrollIntoView({
    //       block: "start",
    //       behavior: "smooth",
    //     });
    //   }, 100);
    // },
    newCard() {
      this.addProductCard();
    },
  },
  components: {
    ProductCard,
  },
};
</script>

<!-- <style>
.product-card:nth-child(odd) > .card > .card-body {
  background-color: rgb(255, 240, 240);
}
.product-card:nth-child(even) > .card > .card-body {
  background-color: azure;
}
.product-card:nth-child(odd) > .card > .card-header {
  background-color: rgb(245, 222, 222);
}
.product-card:nth-child(even) > .card > .card-header {
  background-color: rgb(222, 245, 245);
}
</style> -->