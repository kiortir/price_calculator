<template>
  <div
    class="card-wrapper"
    v-touch:swipe.right="flip"
    v-touch:swipe.left="showDel"
  >
    <div class="card mt-md-3 mt-5" :class="type" :ref="'card' + cardIndex">
      <div
        class="card-header"
        :class="{ 'border-bottom-0': productCard.chosenType == '' }"
      >
        <div class="option-head row g-1">
          <button
            type="button"
            class="
              btn btn-outline-secondary btn-lg
              col-2 col-lg-1
              p-0
              d-none d-md-block
            "
            @click="flip"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-arrow-repeat"
              viewBox="0 0 16 16"
            >
              <path
                d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"
              />
              <path
                fill-rule="evenodd"
                d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"
              />
            </svg>
          </button>
          <div class="productCard col">
            <select
              class="form-select form-select-lg"
              :value="productCard.chosenType"
              @change="
                updateCardOptions({ cardIndex, choice: $event.target.value })
              "
            >
              <option disabled value="">Тип изделия</option>
              <option v-for="product in Object.keys(PRODUCTS)" :key="product">
                {{ product }}
              </option>
            </select>
          </div>
          <div class="col-2 align-self-end h-100 d-none d-md-block">
            <button
              type="button"
              class="btn btn-danger w-100 btn-lg px-0"
              @click="$emit('remove')"
            >
              -
            </button>
          </div>
        </div>
      </div>
      <transition name="fade" mode="out-in">
        <div
          class="product card-body front"
          :class="{ 'd-none': productCard.chosenType == '' }"
          v-if="!flipped"
        >
          <installation :cardIndex="cardIndex"></installation>
          <div class="option-container row-cols-1 row gx-3 gy-2">
            <div
              class="col col-card"
              v-for="(option, optionIndex) in productCard.option_card"
              :key="optionIndex + cardIndex"
            >
              <component
                class="h-100 o-card"
                :is="option.component_type"
                :key="optionIndex + cardIndex.toString()"
                :cardIndex="cardIndex"
                :optionIndex="optionIndex"
                @refresh="updateOption"
                @removeoption="removeCardOption({ optionIndex, cardIndex })"
              ></component>
            </div>
          </div>
          <div class="row mt-4 g-1 col-12">
            <div class="col-10">
              <select class="form-select" v-model="selectedAddOn">
                <option value="null" disabled>Выберите опцию</option>
                <option v-for="option in options" :key="option">
                  {{ option }}
                </option>
              </select>
            </div>
            <div class="col-2">
              <button
                @click="addCardOption({ choice: selectedAddOn, cardIndex })"
                class="btn btn-primary w-100 h-100 p-0"
              >
                +
              </button>
            </div>
          </div>
        </div>
        <div class="back card-body" v-else>
          <low-priority :cardIndex="cardIndex"></low-priority>
        </div>
      </transition>
    </div>
    <div class="hidden-delete m-0">
      <button
        type="button"
        class="btn btn-danger hidden-delete-button w-100 h-100 p-0 my-auto"
        @click="$emit('remove')"
      >
        <span class="vericaltext mx-auto"> У д а л и т ь</span>
      </button>
    </div>
  </div>
</template>

<script>
import {
  products as PRODUCTS,
  options as OPTIONS,
} from "../store/product_refs.js";
import { mapMutations } from "vuex";

import Edge from "./options/Edge.vue";
import Sink from "./options/Sink.vue";
import Socket from "./options/Socket.vue";
import Cookpanel from "./options/Cookpanel.vue";
import Border from "./options/Border.vue";
import Ladder from "./options/Ladder.vue";
import Cutout from "./options/Cutout.vue";
import WallpanelLength from "./options/WallpanelLength.vue";
import SurfaceDocking from "./options/SurfaceDocking.vue";
import Installation from "./options/Installation.vue";
import LowPriority from "./options/LowPriority.vue";

export default {
  name: "productCard",
  props: {
    cardIndex: Number,
  },
  emits: ["remove", "next", "prev"],
  data() {
    return {
      PRODUCTS,
      options: Object.keys(OPTIONS).filter(
        (option) => OPTIONS[option].type != "secondary"
      ),
      flipped: false,
      pulled: null,
      selectedAddOn: null,
    };
  },
  computed: {
    productCard() {
      return this.$store.state.values.product_cards[this.cardIndex];
    },
    type() {
      switch (this.productCard.chosenType) {
        case "Столешница":
          return "countertop";
        case "Барная стойка":
          return "bar";
        case "Подоконник":
          return "sill";
        case "Стеновая панель":
          return "wall";
        default:
          return "none";
      }
    },
  },
  methods: {
    ...mapMutations(["updateCardOptions", "addCardOption", "removeCardOption"]),

    flip() {
      if (this.$refs["card" + this.cardIndex].classList.contains("pulled")) {
        this.showDel({ forced: true });
      } else {
        if (this.productCard.chosenType != "") {
          this.flipped = !this.flipped;
        }
      }
    },

    showDel({ forced = false }) {
      if (this.pulled == null) {
        this.pulled = true;
        this.$refs["card" + this.cardIndex].classList.toggle("pulled");
      } else if (!this.pulled || forced) {
        console.log([!this.pulled, forced]);
        this.pulled = !this.pulled;
        this.$refs["card" + this.cardIndex].classList.toggle("pulled");
        this.$refs["card" + this.cardIndex].classList.toggle("slideback");
      }
    },

    updateOption(optionIndex, field, value) {
      this.$store.commit("updateOptionValue", {
        cardIndex: this.cardIndex,
        optionIndex,
        field,
        value,
      });
    },
  },
  components: {
    Edge,
    Sink,
    Socket,
    Cookpanel,
    Border,
    Ladder,
    Cutout,
    WallpanelLength,
    SurfaceDocking,
    LowPriority,
    Installation,
  },
};
</script>

<style lang="scss" scoped>
@use "sass:math";
$rotationspeed: 0.1s;
$deletebuttonwidth: 15vw;
$pullspeed: 0.15s;

@keyframes rotating {
  from {
    transform: rotateY(0deg);
  }

  to {
    transform: rotateY(90deg);
  }
}

@keyframes backrotating {
  from {
    transform: rotateY(270deg);
  }

  to {
    transform: rotateY(360deg);
  }
}

.back {
  transform: rotateY(360deg);
}

.card {
  z-index: 1000;
  perspective: 3000px;
}

.fade-enter-active {
  -webkit-animation: backrotating $rotationspeed forwards;
  -moz-animation: backrotating $rotationspeed forwards;
  -o-animation: backrotating $rotationspeed forwards;
  animation: backrotating $rotationspeed forwards;
}

.fade-leave-active {
  -webkit-animation: rotating $rotationspeed forwards;
  -moz-animation: rotating $rotationspeed forwards;
  -o-animation: rotating $rotationspeed forwards;
  animation: rotating $rotationspeed forwards;
}

.card-wrapper {
  position: relative;
}

.hidden-delete {
  position: absolute;
  top: 0px;
  right: 0px;
  width: $deletebuttonwidth + 1;
  height: 100%;
}

@-webkit-keyframes slide {
  0% {
    left: 0%;
  }

  100% {
    left: -$deletebuttonwidth;
  }
}
@keyframes slide {
  0% {
    left: 0%;
  }

  100% {
    left: -$deletebuttonwidth;
  }
}

@-webkit-keyframes slideback {
  0% {
    left: -$deletebuttonwidth;
  }

  100% {
    left: 0%;
  }
}
@keyframes slideback {
  0% {
    left: -$deletebuttonwidth;
  }

  100% {
    left: 0%;
  }
}

.pulled {
  -webkit-animation: slide $pullspeed forwards ease-out;
  animation: slide $pullspeed forwards ease-out;
}
.slideback {
  -webkit-animation: slideback $pullspeed forwards ease-out;
  animation: slideback $pullspeed forwards ease-out;
}

.hidden-delete-button {
  border-top-right-radius: 0.3rem;
  border-bottom-right-radius: 0.3rem;
}
.card {
  transition: background-color 0.5s linear;
}
.countertop {
  background-color: #ffdace;
}
.bar {
  background-color: #bdfff8;
}
.sill {
  background-color: #c1ffdb;
}
</style>
