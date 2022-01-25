<template>
  <ul class="list-group backlist px-0">
    <li
      v-for="(addon, addonIndex) in data"
      :key="addon.name"
      class="list-group-item"
    >
      <div class="row g-2">
        <div
          class="col-1 form-check"
          v-if="typeof addon.isChecked !== 'undefined'"
        >
          <input
            class="form-check-input"
            type="checkbox"
            :value="addon.isChecked"
            :id="'checkbox' + addonIndex"
            @change="
              updateAddonCheckbox({
                cardIndex,
                addonIndex,
              })
            "
          />
        </div>
        <label class="col h6 form-check-label" :for="'checkbox' + addonIndex">
          {{ addon.name }}
        </label>

        <div class="col" v-if="typeof addon.count !== 'undefined'">
          <input
            type="number"
            class="form-control form-control-sm"
            :placeholder="addon.measurement"
            :value="addon.count"
            @input="
              updateAddonInput({
                cardIndex,
                addonIndex,
                field: 'count',
                value: $event.target.value,
              })
            "
          />
        </div>
        <div class="col-12" v-if="typeof addon.type !== 'undefined'">
          <select
            class="form-select form-select-sm"
            :value="addon.type.selected"
            @change="
              updateAddonSelector({
                cardIndex,
                addonIndex,
                field: 'type',
                value: $event.target.value,
              })
            "
          >
            <option value="">тип</option>
            <option v-for="selector in addon.type.selectors" :key="selector">
              {{ selector }}
            </option>
          </select>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "lowPriority",
  props: {
    cardIndex: Number,
  },
  //  created() {
  //  this.$store.commit("insertAddons", this.cardIndex);
  //},
  computed: {
    data() {
      return this.$store.state.values.product_cards[this.cardIndex].addons;
    },
  },
  methods: {
    ...mapMutations([
      "updateAddonInput",
      "updateAddonSelector",
      "updateAddonCheckbox",
    ]),
  },
};
</script>
