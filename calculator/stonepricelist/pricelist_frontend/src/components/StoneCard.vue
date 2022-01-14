<template>
  <div class="bg-white container">
    <div class="card">
      <img
        class="card-img-top"
        v-if="stone.pic != null"
        :src="'https://unirock.ru' + stone.pic"
        :alt="stone.name"
      />
      <div class="card-body">
        <div class="row card-text">
          <div class="col my-auto">
            <span class="h3">{{ stone.name }} {{ stone.code }}</span>
            {{ stone.info }}
          </div>
          <div class="col text-end my-auto">
            <button
              type="button"
              class="btn-close text-reset"
              @click="$emit('closeStone')"
            ></button>
          </div>
          <div
            class="col-12 pt-4 mt-1 border-top"
            v-if="stone.equivalents.length > 0"
          >
            <div class="h3">Аналоги</div>
            <table class="table table-sm table-hover table-borderless mb-0">
              <tbody>
                <tr
                  v-for="equivalent in stone.equivalents"
                  :key="equivalent.code"
                  @click="$emit('showStone', stone)"
                >
                  <td>
                    <span>{{ equivalent.name }}</span>
                  </td>
                  <td>
                    <span>{{ equivalent.code }}</span>
                  </td>
                  <td>
                    <span>{{ equivalent.manufacturer }}</span>
                  </td>
                  <td>
                    <span>{{ equivalent.collection }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "StoneCard",
  props: {
    stone: Object,
  },
  emits: ["closeStone"],
  mounted() {
    var myOffcanvas = document.getElementById("collectioninfo");
    myOffcanvas.addEventListener("hidden.bs.offcanvas", () =>
      this.$emit("closeStone")
    );
  },
  methods: {
    getStoneImage() {
      if (this.stone != null) {
        this.axios
          .get(
            `https://unirock.ru/include/popup/get-list-stone.php?popular[]=on&search=${this.stone.code} ${this.stone.manufacturer}&sort=rat&page=1`
          )
          .then((response) => {
            if (response.success == true && response.total === 1) {
              this.stoneImg = response.stones[0].image;
            } else {
              this.stoneImg = null;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.stoneImg = null;
      }
    },
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

<style>
.card-img-top {
  max-height: 50vh;
  width: auto !important;
  object-fit: contain;
}
</style>