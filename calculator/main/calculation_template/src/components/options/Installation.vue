<template>
  <div class="input-group my-2 col-12">
    <div class="input-group-text bg-white">
      <input
        class="form-check-input mt-0"
        type="checkbox"
        :id="'checkbox_installation' + cardIndex"
        v-model="checkBox"
      />
      <label
        class="form-check-label mx-1 my-auto"
        :for="'checkbox_installation' + cardIndex"
      >
        Монтаж изделия, п.м.
      </label>
    </div>
    <input
      type="number"
      class="form-control"
      :value="data.length"
      :ref="'installation_field_' + cardIndex"
      @input="setLength($event.target.value)"
    />
  </div>
</template>

<script>
export default {
  emits: ["refresh"],
  name: "installation",
  props: {
    cardIndex: Number,
  },
  computed: {
    data() {
      return this.$store.state.values.product_cards[this.cardIndex]
        .installation;
    },
    checkBox: {
      get() {
        return this.data.status;
      },
      set(value) {
        if (value && !this.data.length) {
          this.$refs["installation_field_" + this.cardIndex].focus();
        }
        this.setCheckbox(value);
      },
    },
  },
  methods: {
    setLength(value) {
      if (!this.checkBox) {
        this.setCheckbox(true);
      }
      if (!value) {
        this.setCheckbox(false);
      }
      this.$store.commit("updateInstallationLength", {
        cardIndex: this.cardIndex,
        value,
      });
    },
    setCheckbox(value) {
      this.$store.commit("updateInstallationStatus", {
        cardIndex: this.cardIndex,
        value,
      });
    },
  },
};
</script>
