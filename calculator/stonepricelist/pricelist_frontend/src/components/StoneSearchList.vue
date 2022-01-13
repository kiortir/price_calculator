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
        <tr
          v-for="(stone, index) in searchresult"
          :key="index"
          @click="showStoneCard(stone)"
        >
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
    <stone-card
      class="position-fixed top-50 start-50 translate-middle"
      v-if="chosenStone != null"
      :stone="chosenStone"
      @closeStone="chosenStone = null"
    ></stone-card>
  </div>
</template>


<script>
import StoneCard from "./StoneCard.vue";
export default {
  name: "StoneSearchList",
  components: {
    StoneCard,
  },
  data() {
    return {
      searchinput: "",
      searchresult: [],
      chosenStone: null,
    };
  },
  created() {
    setTimeout(this.serverSearch(), 1500);
  },
  methods: {
    async serverSearch(searchStr = "") {
      this.axios
        .post("/pricelist/acryl/stones/", {
          searchStr,
        })
        .then((response) => {
          if (searchStr == this.searchinput) {
            this.searchresult = response.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async showStoneCard(stone) {
      this.axios
        .post("/pricelist/prox/", {
          url: `https://unirock.ru/include/popup/get-list-stone.php?popular[]=on&search=${stone.code}&nbsp;${stone.manufacturer}&sort=rat&page=1`,
        })
        .then((response) => {
          response = response.data;
          if (response.success == true && response.total == 1) {
            console.log(response.rocks[0].image);
            this.chosenStone = {
              pic: response.rocks[0].image,
              name: stone.name,
              code: stone.code,
              manufacturer: stone.manufacturer,
            };
          } else {
            this.chosenStone = {
              pic: null,
              name: stone.name,
              code: stone.code,
              info: "Не нашелся(",
            };
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
.stone-card {
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
  height: 40vh;
  width: 40vw;
  top: 30%;
}
</style>