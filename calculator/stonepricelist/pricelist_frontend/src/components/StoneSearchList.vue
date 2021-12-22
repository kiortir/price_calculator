<template>
  <div class="offcanvas-header">
    <h5 class="offcanvas-title">Поиск камней</h5>
    <button
      type="button"
      class="btn-close text-reset"
      data-bs-dismiss="offcanvas"
      aria-label="Close"
    ></button>
  </div>
  <div class="offcanvas-body pt-0 mt-3">
    <input
      type="search"
      class="form-control mb-3 mt-0 sticky-top"
      placeholder="Фильтр"
      v-model="searchinput"
      @input="serverSearch($event.target.value)"
      ref="searchBarServer"
    />
    <table
      v-if="searchresult.length > 0"
      class="table table-sm table-hover table-borderless mb-0"
    >
      <tbody>
        <tr v-for="(stone, index) in searchresult" :key="index">
          <td>
            <span>{{ stone.name }}</span>
          </td>
          <td>
            <span>{{ stone.code }}</span>
          </td>
          <td>
            <span>{{ stone.manufacturer }}</span>
          </td>
          <td>
            <span>{{ stone.collection }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
export default {
  name: "StoneSearchList",
  // props: {
  //   collection_name: String,
  //   manufacturer: String,
  //   configurations: Object,
  // },
  data() {
    return {
      searchinput: "",
      searchresult: [],
    };
  },
  //   mounted() {
  //     document.getElementById("searchBarServer").focus;
  //   },
  methods: {
    serverSearch(searchStr) {
      this.axios
        .post("/pricelist/acryl/stones/", {
          searchStr,
        })
        .then((response) => {
          this.searchresult = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>