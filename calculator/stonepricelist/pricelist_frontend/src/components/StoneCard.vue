<template>
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
          {{ stone.info }}
          {{ stone.name }} {{ stone.code }}
        </div>
        <div class="col text-end my-auto">
          <button
            type="button"
            class="btn-close text-reset"
            @click="$emit('closeStone')"
          ></button>
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