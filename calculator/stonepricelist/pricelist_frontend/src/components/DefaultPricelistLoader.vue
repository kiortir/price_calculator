<template>
  <div class="row row-cols-1 row-cols-lg-2">
    <div class="col" v-for="manufacturer in stonelist" :key="manufacturer.name">
      <h3>{{ manufacturer.name }}</h3>
      <table class="table table-sm table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Коллекция</th>
            <th scope="col">Цена</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="collection in manufacturer.collections"
            :key="collection.name"
          >
            <td class="align-middle">
              {{ collection.name }}
            </td>
            <!-- <td
              class="text-end pe-2"
              v-if="collection.configurations.length === 1"
            >
              {{ collection.configurations[0].price }} руб.
            </td> -->
            <table class="table table-sm mb-0">
              <tbody>
                <tr
                  class="fs-6"
                  v-for="configuration in collection.configurations"
                  :key="configuration.alias"
                >
                  <td v-if="collection.configurations.length > 1">
                    {{ configuration.alias }}
                    {{ configuration.thickness }}
                  </td>
                  <td class="text-end pe-2">
                    {{ configuration.price }}&nbsp;руб/м<sup>2</sup>
                  </td>
                </tr>
              </tbody>
            </table>
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
