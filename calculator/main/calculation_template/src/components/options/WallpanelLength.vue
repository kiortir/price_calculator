<template>
  <div class="card">
    <div class="card-header bg-transparent">
      <div class="row g-0">
        <div class="col-10 h-100 my-auto">Длина стеновой панели</div>
        <div class="col-2">
          <button
            class="btn btn-outline-danger w-100 p-0"
            type="button"
            @click="$emit('removeoption')"
          >
            -
          </button>
        </div>
      </div>
    </div>
    <div class="card-body g-1">
      <input
        type="number"
        class="form-control"
        placeholder="длина панели, п.м."
        :value="data.length"
        @input="update('length', $event.target.value)"
      />
    </div>
  </div>
</template>

<script>
export default {
  emits: ["removeoption", "refresh"],
  name: "wallpanel-length",
  props: {
    optionIndex: Number,
    cardIndex: Number,
  },
  computed: {
    data() {
      return this.$store.state.values.product_cards[this.cardIndex].option_card[
        this.optionIndex
      ].data;
    },
  },
  methods: {
    update(field, value) {
      this.$store.commit("updateInstallationLength", {
        cardIndex: this.cardIndex,
        value,
      });
      this.$emit("refresh", this.optionIndex, field, value);
    },
  },
};
</script>