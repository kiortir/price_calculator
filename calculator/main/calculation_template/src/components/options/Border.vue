<template>
  <div class="card">
    <div class="card-header bg-transparent">
      <div class="row g-0">
        <div class="col-10 h-100 my-auto">Бортик</div>
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
      <div class="col m-xl-auto">
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            value="Простой"
            :name="cardIndex + 'borderRadio1' + optionIndex"
            :id="cardIndex + 'borderRadio1' + optionIndex"
            v-model="type"
          />
          <label
            class="form-check-label"
            :for="cardIndex + 'borderRadio1' + optionIndex"
          >
            Простой
          </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            value="Калиброванный"
            :name="cardIndex + 'borderRadio2' + optionIndex"
            :id="cardIndex + 'borderRadio2' + optionIndex"
            v-model="type"
          />
          <label
            class="form-check-label"
            :for="cardIndex + 'borderRadio2' + optionIndex"
          >
            Калиброванный
          </label>
        </div>
      </div>
      <div class="col m-xl-auto my-auto">
        <input
          type="number"
          class="form-control"
          placeholder="п.м."
          :value="data.length"
          @input="update('length', $event.target.value)"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["removeoption", "refresh"],
  name: "border",
  props: {
    cardIndex: Number,
    optionIndex: Number,
  },
  computed: {
    data() {
      return this.$store.state.values.product_cards[this.cardIndex].option_card[
        this.optionIndex
      ].data;
    },
    type: {
      get() {
        return this.data.type;
      },
      set(value) {
        this.update('type', value)
      },
    },
  },
  methods: {
    update(field, value){
      this.$emit('refresh', this.optionIndex, field, value)
    },
    // update() {
    //   let data = this.borderData.data;
    //   let pricing = this.$store.state.currentPriceList.border;
    //   try {
    //     this.borderData.result = {
    //       price: pricing.type.finalPrice(data.type) * data.length,
    //     };
    //     this.borderData.salary = {
    //       price: pricing.type[data.type].price * data.length,
    //     };
    //     this.borderData.consumables = 0;
    //     this.borderData.consumablesRaw = 0;
    //   } catch (e) {
    //     console.log(e);
    //   }
    //   this.borderData.name =
    //     `Бортик: ${data.type}, ${data.length} шт.`.toLowerCase();
    // },
  },
};
</script>