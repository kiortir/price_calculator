<template>
  <div class="card">
    <div class="card-header bg-transparent">
      <div class="row g-0">
        <div class="col-10 h-100 my-auto">Мойка</div>
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
    <div class="card-body row">
      <div class="col-12 col-xl-8 m-xl-auto mb-1">
        <select
          class="form-select"
          :value="data.type"
          @change="update('type', $event.target.value)"
        >
          <option disabled value="">Тип мойки</option>
          <option>Накладная</option>
          <option>Поджимная</option>
          <option>Интегрированная</option>
          <option>Интегрированная 45°</option>
          <option>Вровень</option>
        </select>
      </div>
      <div class="sink-quantity col-12 col-xl-4 m-xl-auto mb-1">
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
  name: "sink",
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
  },
};

// update() {
//   let data = this.sinkData.data;
//   let pricing = this.$store.state.currentPriceList.sink;
//   try {
//     this.sinkData.result = {
//       price: pricing.type.finalPrice(data.type) * data.quantity,
//     };
//     this.sinkData.salary = {
//       price: pricing.type[data.type].price * data.quantity,
//     };
//     this.sinkData.consumables = 0;
//     this.sinkData.consumablesRaw = 0;
//   } catch (e) {
//     console.log(e);
//   }
//   this.sinkData.name =
//     `Тип мойки: ${data.type}, ${data.quantity} шт.`.toLowerCase();
</script>