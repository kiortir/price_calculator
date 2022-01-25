<template>
  <div>
    <input
      class="form-control form-control-lg mb-3"
      type="text"
      placeholder="название шаблона"
    />
    <div class="row mx-0">
      <div class="gx-2 mb-5">
        <div class="infocard">
          <div class="sticky-top mb-4 bg-white border-bottom">
            <ul class="nav nav-pills nav-fill py-3">
              <li class="nav-item" v-for="tab of tabs" :key="tab.component">
                <button
                  class="nav-link category-toggle"
                  type="button"
                  :id="`head-${tab.component}`"
                  :class="{ active: tab.component == chosenTab }"
                  @click="switchTab(tab.component)"
                  v-html="tab.name"
                ></button>
              </li>
            </ul>
          </div>
          <div class="tab-content" id="mainContent">
            <div
              v-for="tab of tabs"
              class="tab-pane fade px-2 p-lg-0"
              :id="tab.component"
              :key="tab.component"
              :class="{
                active: tab.component == chosenTab,
                show: tab.component == chosenTab,
              }"
            >
              <component
                :is="tab.component"
                :key="tab.component"
                @focusCard="focusCard"
              ></component>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="fixed-bottom container d-block d-lg-none bg-white border-top pb-2"
    >
      <div class="row py-3">
        <div class="col" v-if="chosenTab != 'logistics'">
          <button class="btn btn-primary w-100" type="button" @click="addCard">
            +
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import Materials from "./components/Materials.vue";
import Products from "./components/Products.vue";
import Logistics from "./components/Logistics.vue";

export default {
  name: "App",
  data() {
    return {
      tabs: [
        {
          component: "materials",
          name: "Материал",
        },
        {
          component: "products",
          name: "Изделия",
        },
        {
          component: "logistics",
          name: "Логистика",
        },
      ],
      chosenTab: "products",
    };
  },
  methods: {
    ...mapMutations(["addMaterialCard", "addProductCard"]),
    ...mapActions(["save"]),
    focusCard(tab, id) {
      setTimeout(function () {
        let element = document.getElementById(`${tab}-${id}`);
        element.scrollIntoView({
          block: "center",
          behavior: "auto",
        });
      }, 0);
    },
    addCard() {
      let functions = {
        materials: this.addMaterialCard,
        products: this.addProductCard,
      };
      functions[this.chosenTab]();
    },
    switchTab(tab) {
      this.chosenTab = tab;
      window.localStorage.setItem("chosenTab", tab);
    },
  },
  created() {
    let preTab = window.localStorage.getItem("chosenTab");
    if (preTab != null) {
      this.chosenTab = preTab;
    } else {
      this.chosenTab = this.tabs[0].component;
    }
  },
  components: {
    Materials,
    Products,
    Logistics,
  },
};
</script>

<style>
.vericaltext {
  width: 1px;
  word-wrap: break-word;
  display: block;
}

#mainContent {
  padding-bottom: 50vh !important;
}

#onload-block {
  display: none;
}

.small-text {
  font-size: 0.8em;
}

.recommended-discount {
  border-color: green !important;
  color: green !important;
}
.recommended-discount:hover {
  background-color: green !important;
  color: white !important;
}
.btn-check:checked + .btn-outline-primary.recommended-discount {
  background-color: green !important;
  color: white !important;
}
</style>
