<template>
  <div class="row row-cols-1 row-cols-lg-2">
    <div class="col" v-for="manufacturer in stonelist" :key="manufacturer.name">
      <h3>{{ manufacturer.name }}</h3>
      <table class="table table-sm table-striped table-hover">
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
          >
            <td class="align-middle ps-2 h6">
              {{ collection.name }}
            </td>
            <td>
              <ul class="fs-6 my-auto list-group list-group-flush">
                <li
                  class="list-group-item bg-transparent"
                  v-for="configuration in collection.configurations"
                  :key="configuration.alias"
                >
                  <div class="row row-cols-1 row-cols-sm-2">
                    <div class="col configuration">
                      <span v-if="collection.configurations.length > 1">
                        {{ configuration.alias }}
                        {{ configuration.thickness }}</span
                      >
                    </div>
                    <div class="text-end pe-2 col">
                      {{ configuration.price
                      }}<span class="configuration"
                        >&nbsp;руб/м<sup>2</sup></span
                      >
                    </div>
                  </div>
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "DefaultPricelistLoader",
  data() {
    return {
      stonelist: null,
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
};
</script>


<style scoped>
.configuration {
  font-size: 0.9em !important;
}
</style>