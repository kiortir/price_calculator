<template>
  <div class="card card-shadow px-0">
    <div class="card-header">
      <div class="h5 my-auto">{{ manufacturer.name }}</div>
    </div>
    <div class="card-body">
      <table
        class="table table-sm table-hover mb-0"
        v-if="spotlightConfigurations == null"
      >
        <thead>
          <tr>
            <th scope="col">Коллекция</th>
            <th scope="col" class="text-end pe-2">Цена</th>
          </tr>
        </thead>
        <tbody :class="manufacturer.name.toLowerCase().replace(' ', '-')">
          <tr
            v-for="collection in manufacturer.collections"
            :key="collection.name"
            @click="
              showConfigurations({
                data: collection.configurations,
                collection: {
                  name: collection.name,
                  price: collection.price,
                },
              })
            "
          >
            <td class="align-middle ps-2 h6">
              <font-awesome-icon
                class="me-2"
                v-if="collection.configurations.length > 0"
                icon="ellipsis-v"
              />
              <span>{{ collection.name }}</span>
            </td>
            <td class="text-end pe-2 my-auto">
              {{ collection.price }}<span class="ms-1">руб/м<sup>2</sup></span>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else>
        <table class="table table-sm table-hover mb-0">
          <thead>
            <tr>
              <th scope="col">Конфигурация</th>
              <th scope="col" class="text-end pe-2">Цена</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Стандарт</td>
              <td class="text-end pe-2 my-auto">
                {{ spotlightConfigurations.collection.price
                }}<span class="ms-1">руб/м<sup>2</sup></span>
              </td>
            </tr>
            <tr
              v-for="configuration in spotlightConfigurations.data"
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
        <div @click="hideConfigurations" type="button" class="mt-3">
          <font-awesome-icon icon="chevron-left" /><span class="ms-2 h6"
            >Коллекция {{ spotlightConfigurations.collection.name }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ManufacturerCard",
  props: {
    manufacturer: Object,
  },
  data() {
    return { spotlightConfigurations: null };
  },
  methods: {
    showConfigurations(configurations) {
      if (configurations.data.length > 0) {
        this.spotlightConfigurations = configurations;
      }
    },
    hideConfigurations() {
      this.spotlightConfigurations = null;
    },
  },
};
</script>


<style>
tbody.hanex tr:nth-child(odd) {
  background-color: #ddf2f0;
}
tbody.tristone tr:nth-child(odd) {
  background-color: #b0f3fc;
}
tbody.lg-hi-macs tr:nth-child(odd) {
  background-color: #c7fbff;
}
tbody.corian-dupont tr:nth-child(odd) {
  background-color: #fffab8;
}
tbody.staron tr:nth-child(odd) {
  background-color: #ffdace;
}
</style>