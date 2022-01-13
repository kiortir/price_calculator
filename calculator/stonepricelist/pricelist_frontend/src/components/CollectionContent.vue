<template>
  <div class="offcanvas-header">
    <h5 class="offcanvas-title">
      {{ info.manufacturer }} {{ info.collection }}
    </h5>
    <button
      type="button"
      class="btn-close text-reset"
      data-bs-dismiss="offcanvas"
      aria-label="Close"
    ></button>
  </div>
  <div class="offcanvas-body pt-0 mt-3">
    <div class="mb-4" v-if="info.configurations.length > 0">
      <div class="h6">Нестандартные конфигурации</div>
      <table class="table table-sm table-hover mb-4">
        <tbody>
          <tr
            v-for="configuration in info.configurations"
            :key="configuration.alias"
          >
            <td>
              {{ configuration.alias }},
              {{ configuration.thickness }}
            </td>
            <td class="text-end pe-2 my-auto">
              {{ configuration.price
              }}<span class="ms-1">руб/м<sup>2</sup></span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <input
      type="search"
      id="collectionsearch"
      class="form-control mb-3 mt-0 sticky-top"
      placeholder="Фильтр"
      v-model="searchinput"
    />

    <div v-if="info.stones.length > 0">
      <div class="h5">Камни в коллекции</div>
      <ul>
        <li
          type="button"
          v-for="stone in filteredStones"
          :key="stone.code"
          @click="$emit('showStone', stone)"
        >
          <span class="me-2">{{ stone.code }}</span>
          <span class="">{{ stone.name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
export default {
  name: "CollectionContent",
  // props: {
  //   collection_name: String,
  //   manufacturer: String,
  //   configurations: Object,
  // },
  emits: ["showStone"],
  data() {
    return {
      searchinput: "",
    };
  },
  computed: {
    info() {
      return this.$store.state.component_data;
    },
    filteredStones() {
      return this.info.stones.filter((stone) => {
        return (
          stone.name.toLowerCase().search(this.searchinput.toLowerCase()) !=
            -1 ||
          stone.code.toLowerCase().search(this.searchinput.toLowerCase()) != -1
        );
      });
    },
  },
};
</script>