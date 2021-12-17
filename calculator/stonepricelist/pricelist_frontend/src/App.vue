<template>
  <div class="container">
    <default-pricelist-loader>
      <div class="col text-end">
        <button
          id="work-btn"
          class="btn btn-primary p-0"
          @click="refreshWorkPricelist"
          data-bs-toggle="offcanvas"
          data-bs-target="#work-pricelist"
          type="button"
        >
          <font-awesome-icon class="p-0" icon="list" />
        </button></div
    ></default-pricelist-loader>
    <div class="offcanvas offcanvas-end wide" tabindex="-1" id="work-pricelist">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title">Дополнительные работы</h5>
        <button
          type="button"
          class="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div class="offcanvas-body">
        <work-pricelist :pricelist="work_pricelist"></work-pricelist>
      </div>
    </div>
  </div>
</template>

<script>
import DefaultPricelistLoader from "./components/DefaultPricelistLoader.vue";
import WorkPricelist from "./components/WorkPricelist.vue";

export default {
  name: "App",
  data() {
    return {
      work_pricelist: {},
    };
  },
  components: {
    DefaultPricelistLoader,
    WorkPricelist,
  },
  methods: {
    refreshWorkPricelist() {
      this.axios
        .post("/pricelist/acryl/work/")
        .then((response) => {
          this.work_pricelist = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
@media screen and (min-width: 1280px) {
  .wide {
    width: 60vw !important;
  }
}
@media screen and (max-width: 540px) {
  .wide {
    width: 100vw !important;
  }
}
#work-btn {
  width: 30px;
  height: 30px;
  border-radius: 40px;
}
</style>