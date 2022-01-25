<template>
  <div class="card px-0">
    <div
      class="card-header manufacturer mx-0"
      :class="manufacturer.name.toLowerCase().replace(' ', '-')"
    >
      <div class="h5 my-auto">{{ manufacturer.name }}</div>
    </div>
    <div
      class="card-body manufacturer"
      :class="manufacturer.name.toLowerCase().replace(' ', '-')"
    >
      <div
        class="mb-2 pb-2 border-table-bottom"
        v-if="collections.white.length > 0"
      >
        <div class="h5">Белые текстуры</div>
        <table class="table table-sm table-hover table-borderless mb-0">
          <tbody :class="manufacturer.name.toLowerCase().replace(' ', '-')">
            <tr v-for="collection in collections.white" :key="collection.name">
              <td class="align-middle ps-2 h6">
                <span>{{ collection.name }}</span>
              </td>
              <td class="text-end pe-2 my-auto">
                {{ collection.price
                }}<span class="ms-1">руб/м<sup>2</sup></span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="h5">Коллекции</div>
      <table class="table table-sm table-hover table-borderless mb-0">
        <tbody :class="manufacturer.name.toLowerCase().replace(' ', '-')">
          <tr
            v-for="collection in collections.basic"
            :key="collection.name"
            data-bs-toggle="offcanvas"
            data-bs-target="#collectioninfo"
            @click="setOffcanvas(collection)"
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
      <div
        class="mt-1 pt-2 mb-0 additional-info border-table-top"
        v-html="manufacturer.additional_info"
        v-if="manufacturer.additional_info"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ManufacturerCard",
  props: {
    manufacturer: Object,
  },
  emits: ["setOffcanvasData"],

  computed: {
    collections() {
      let white = [];
      let basic = [];
      for (let collection of this.manufacturer.collections) {
        if (collection.isWhite) {
          white.push(collection);
        } else {
          basic.push(collection);
        }
      }
      return {
        white,
        basic,
      };
    },
  },
  methods: {
    setOffcanvas(collection) {
      this.$store.dispatch("setCollection", {
        collection: collection.name,
        manufacturer: this.manufacturer.name,
        configurations: collection.configurations,
      });
    },
  },
};
</script>


<style lang="scss">
.card-header.manufacturer {
  filter: brightness(96%) saturate(150%);
}
.card-body.manufacturer {
  filter: brightness(108%) saturate(150%);
}

tbody tr:last-child {
  border: 0 !important;
}

tbody tr {
  border-bottom: solid rgb(187, 183, 183) 0.03rem;
}

header tr:hover {
  filter: brightness(80%);
}

.additional-info {
  font-size: 0.9em;
}
.border-table-bottom {
  border-bottom: solid gray 0.07em;
}
.border-table-top {
  border-top: solid gray 0.07em;
}
</style>

