<template>
  <div
    class="container main-container"
    v-touch:swipe.right="btnBlockHide"
    v-touch:swipe.left="btnBlockShow"
  >
    <default-pricelist-loader> </default-pricelist-loader>
    <div
      class="offcanvas offcanvas-start main-offcanvas"
      tabindex="-1"
      id="collectioninfo"
    >
      <component :is="active_component"></component>
    </div>
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
    <transition name="slide">
      <div class="btn-block" v-if="showButtonBlock">
        <div class="work-button text-end">
          <button
            class="btn btn-primary p-0 func-btn"
            @click="refreshWorkPricelist"
            data-bs-toggle="offcanvas"
            data-bs-target="#work-pricelist"
            type="button"
          >
            <font-awesome-icon class="p-0" icon="list" />
          </button>
        </div>
        <div class="search-button">
          <button
            class="btn btn-primary p-0 func-btn"
            data-bs-toggle="offcanvas"
            data-bs-target="#collectioninfo"
            @click="showSearch"
            type="button"
          >
            <font-awesome-icon class="p-0" icon="search" />
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import DefaultPricelistLoader from "./components/DefaultPricelistLoader.vue";
import WorkPricelist from "./components/WorkPricelist.vue";
import CollectionContent from "./components/CollectionContent.vue";
import StoneSearchList from "./components/StoneSearchList.vue";

export default {
  name: "App",
  data() {
    return {
      work_pricelist: {},
      showButtonBlock: true,
    };
  },
  components: {
    DefaultPricelistLoader,
    WorkPricelist,
    CollectionContent,
    StoneSearchList,
  },
  computed: {
    active_component() {
      return this.$store.state.active_component;
    },
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
    btnBlockHide() {
      this.showButtonBlock = false;
    },
    btnBlockShow() {
      this.showButtonBlock = true;
    },
    showSearch() {
      this.$store.commit("showSearch");
    },
  },
};
</script>

<style lang="scss">
$slide_speed: 0.5s;

@media screen and (min-width: 1280px) {
  .wide {
    width: 80vw !important;
  }
  .main-offcanvas {
    width: 40vw !important;
  }
}
@media screen and (max-width: 540px) {
  .wide {
    width: 100vw !important;
  }
}

.btn-block {
  position: fixed;
  right: 8vh;
  bottom: 5vh;
  height: 15vh;
}
.work-button {
  position: absolute;
  bottom: 0;
}
.search-button {
  position: absolute;
  bottom: 7vh;
}

.func-btn {
  width: 6vh;
  height: 6vh;
  border-radius: 40px;
}

.main-container {
  overflow-x: hidden !important;
  position: relative;
}
// .offcanvas-body {
//   position: relative;
//   overflow-y: scroll;
// }

@keyframes swipeRight {
  to {
    position: absolute;
    right: -8vh;
  }
}
@keyframes swipeLeft {
  to {
    position: fixed;
    right: 8vh;
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: all $slide_speed ease-out;
}

.slide-enter-from {
  position: fixed;
  right: -8vh;
}

.slide-enter-to {
  transform: translateX(100%);
}
.slide-leave-to {
  animation: swipeRight $slide_speed forwards;
}

.slide-leave-from {
  position: fixed;
  right: 8vh;
}
</style>