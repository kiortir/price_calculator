<template>
  <div class="card">
    <div class="card-header bg-transparent">
      <div class="row g-0">
        <div class="col-10 h-100 my-auto">Стыковка плоскости</div>
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
        :value="data.type"
        @change="update('type', $event.target.value)"
      >
        <option disabled value="">Тип стыковки</option>
        <option>Прямая</option>
        <option>Косая</option>
      </select>

      <input
        type="number"
        class="form-control"
        placeholder="количество склеек, шт.."
        :value="data.quantity"
        @input="update('quantity', $event.target.value)"
      />
    </div>
  </div>
</template>

<script>
export default {
  emits: ["removeoption", "refresh"],
  name: "surface-docking",
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