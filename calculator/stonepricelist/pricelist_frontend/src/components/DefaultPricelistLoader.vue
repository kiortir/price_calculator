<template>
  <div class="row row-cols-1 row-cols-lg-2 gx-1">
    <div
      class="col h-100"
      v-for="manufacturer in stonelist"
      :key="manufacturer.name"
    >
      <div class="card px-0">
        <div class="card-header">
          <div class="h5 my-auto">{{ manufacturer.name }}</div>
        </div>
        <div class="card-body">
          <table
            class="table table-sm table-striped table-hover mb-0"
            v-if="spotlightConfigurations == null"
          >
            <thead>
              <tr>
                <th scope="col">Коллекция</th>
                <th scope="col" class="text-end pe-2">Цена</th>
              </tr>
            </thead>
            <tbody>
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
                  {{ collection.price
                  }}<span class="ms-1">руб/м<sup>2</sup></span>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-else>
            <table class="table table-sm table-striped table-hover mb-0">
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
    </div>
  </div>
</template>

<script>
export default {
  name: "DefaultPricelistLoader",
  data() {
    return {
      stonelist: null,
      spotlightConfigurations: null,
    };
  },
  mounted() {
    this.axios
      .get("/pricelist/acryl/default")
      .then((response) => {
        this.stonelist = response.data;
      })
      .catch((err) => {
        console.log(err);
      });
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


<style scoped>
.configuration {
  font-size: 0.9em !important;
}
</style>