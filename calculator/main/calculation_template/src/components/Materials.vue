<template>
  <div>
    <material-card
      class="material-block"
      v-for="(card, index) of cards"
      :card_index="index"
      :key="index"
      :id="'material-card-' + index"
      @remove="removeMaterialCard(index)"
    >
    </material-card>
    <div class="button-row row justify-content-center mt-3 d-none d-lg-block">
      <div class="w-50 mx-auto">
        <button
          type="button"
          class="btn btn-primary w-100"
          @click="addMaterialCard"
        >
          +
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import MaterialCard from "./MaterialCard.vue";

export default {
  name: "Material",
  computed: {
    cards() {
      return this.$store.state.values.material_cards;
    },
  },
  methods: {
    ...mapMutations(["addMaterialCard", "removeMaterialCard"]),
  },
  components: {
    MaterialCard,
  },
};
</script>

<style>
</style>