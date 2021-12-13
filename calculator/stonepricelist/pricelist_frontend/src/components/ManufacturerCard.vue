<template>
  <div class="card card-shadow px-0">
    <div
      class="card-header manufacturer"
      :class="manufacturer.name.toLowerCase().replace(' ', '-')"
    >
      <div class="h5 my-auto">{{ manufacturer.name }}</div>
    </div>
    <div
      class="card-body manufacturer"
      :class="manufacturer.name.toLowerCase().replace(' ', '-')"
    >
      <table
        class="table table-sm table-hover table-borderless mb-0"
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


<style lang="scss">
$hanex: #ddf2f0;
$tristone: #b0f3fc;
$staron: #ffdace;
$grandex: #ced1ff;
$lg_hi_macs: #ffcef8;
$corian_dupont: #ffcece;
$akrilika: #cefff7;
$montelli: #cfceff;

.card-header.manufacturer {
  filter: brightness(96%) saturate(150%);
}
.card-body.manufacturer {
  filter: brightness(108%) saturate(150%);
}

tbody tr:nth-child(odd) {
  filter: brightness(95%) saturate(90%) !important;
}

tbody tr {
  border-bottom: solid rgb(187, 183, 183) 0.03rem;
}

.hanex {
  background-color: $hanex !important;
}
.grandex {
  background-color: $grandex !important;
}
.lg-hi-macs {
  background-color: $lg_hi_macs !important;
}
.tristone {
  background-color: $tristone !important;
}
.staron {
  background-color: $staron !important;
}
.corian-dupont {
  background-color: $corian_dupont !important;
}
.akrilika {
  background-color: $akrilika !important;
}
.montelli {
  background-color: $montelli !important;
}

header tr:hover {
  filter: brightness(80%);
}
</style>