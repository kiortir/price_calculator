<template>
  <div class="card">
    <div class="card-header container mx-0 bg-transparent">
      <div class="row g-0">
        <div class="col-10 h-100 my-auto">Кромка</div>
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
      <div class="side-info row row-cols-1 row-cols-md-2 g-2">
        <div class="col">
          <select
            class="form-select form-select-sm"
            :value="data.type"
            @change="update('type', $event.target.value)"
          >
            <option value="" disabled>Тип кромки</option>
            <option>№1</option>
            <option>№2</option>
            <option>№3</option>
            <option>№4</option>
            <option>№6</option>
            <option>№7</option>
            <option>Утиный нос</option>
            <option>Фигурная</option>
          </select>
        </div>
        <div class="col">
          <select
            class="form-select form-select-sm"
            :value="data.width"
            @change="update('width', $event.target.value)"
          >
            <option value="" disabled>Толщина кромки</option>
            <option>20 мм</option>
            <option>30 мм</option>
            <option>40 мм</option>
            <option>Другая</option>
          </select>
        </div>
        <div class="col">
          <select
            class="form-select form-select-sm"
            :value="data.angle"
            @change="update('angle', $event.target.value)"
          >
            <option value="" disabled>Угол склейки</option>
            <option value="45">45°</option>
            <option value="90">90°</option>
          </select>
        </div>
        <div class="col">
          <input
            class="form-control form-control-sm"
            placeholder="п.м. кромки"
            type="number"
            :value="data.length"
            @input="update('length', $event.target.value)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["removeoption", "refresh"],
  name: "edge",
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
    //   let data = this.edgeData.data;
    //   let pricing = this.$store.state.currentPriceList.edge;
    //   try {
    //     this.edgeData.result = {
    //       price:
    //         (pricing.type.finalPrice(data.type) +
    //           pricing.angle.finalPrice(data.angle) +
    //           pricing.width.finalPrice(data.width)) *
    //         data.length,
    //     };
    //     this.edgeData.salary = {
    //       price:
    //         (pricing.type[data.type].price +
    //           pricing.angle[data.angle].price +
    //           pricing.width[data.width].price) *
    //         data.length,
    //     };
    //     this.edgeData.consumables =
    //       (pricing.width.consumablePrice(data.width) +
    //         pricing.type.consumablePrice(data.type)) *
    //       data.length;
    //     this.edgeData.consumablesRaw =
    //       (pricing.width.consumableRaw(data.width) +
    //         pricing.type.consumableRaw(data.type)) *
    //       data.length;
    //   } catch (e) {
    //     return 0;
    //   }
    //   this.edgeData.name =
    //     `обработка кромки ${data.type} ${data.width}, склейка ${data.angle}°, ${data.length} п.м`.toLowerCase();
    // },
  },
};
</script>