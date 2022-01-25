<template>
  <div class="card">
    <div class="card-header bg-transparent">
      <div class="row g-0">
        <div class="col-10 h-100 my-auto">Данные ступеней</div>
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
    <div class="card-body row g-1">
      <select
        class="form-select"
        :value="data.edgeType"
        @change="update('edgeType', $event.target.value)"
      >
        <option value="">тип фаски</option>
        <option>Верх</option>
        <option>Верх и низ</option>
      </select>
      <input
        type="number"
        class="form-control"
        placeholder="длина ступеней, п.м."
        :value="data.stepLength"
        @input="update('stepLength', $event.target.value)"
      />
      <input
        type="number"
        class="form-control"
        placeholder="длина подступков, п.м."
        :value="data.underStepLength"
        @input="update('underStepLength', $event.target.value)"
      />
    </div>
  </div>
</template>

<script>
export default {
  emits: ["removeoption", "refresh"],
  name: "ladder",
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
</script>