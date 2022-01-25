<template>
  <div class="card">
    <div class="card-header bg-transparent">
      <div class="row g-0">
        <div class="col-10 h-100 my-auto">Вырез под розетку</div>
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
    <div class="card-body">
      <div class="col m-xl-auto my-auto">
        <input
          type="number"
          class="form-control"
          placeholder="шт."
          :value="data.quantity"
          @input="update('quantity', $event.target.value)"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["removeoption", "refresh"],
  name: "socket",
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
      this.$emit("refresh", this.optionIndex, field, value);
    },
    // update() {
    //   let data = this.socketData.data;
    //   let pricing = this.$store.state.currentPriceList.socket;
    //   try {
    //     this.socketData.result = {
    //       price: pricing.finalPrice() * data.quantity,
    //     };
    //     this.socketData.salary = {
    //       price: pricing.price * data.quantity,
    //     };
    //     this.socketData.consumables = 0;
    //     this.socketData.consumablesRaw = 0;
    //   } catch (e) {
    //     console.log(e);
    //   }
    //   this.socketData.name =
    //     `вырез под розетку: ${data.quantity} шт.`.toLowerCase();
    // },
  },
};
</script>
