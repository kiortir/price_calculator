<template>
  <div
    class="card-wrapper"
    v-touch:swipe.right="showDel"
    v-touch:swipe.left="showDel"
  >
    <div
      class="material-card card mt-5 mt-md-3"
      :ref="'mcard' + card_index"
      :class="group"
    >
      <div class="material card-body row g-3">
        <div class="col-12 col-sm-11 container">
          <div class="row row-cols-2 g-2">
            <div class="col-12 form-floating">
              <input
                :id="'materialname-' + card_index"
                :value="data.materialName"
                @input="
                  updateMaterialName({
                    index: card_index,
                    value: $event.target.value,
                  })
                "
                type="text"
                class="form-control border-info"
                placeholder="название материала"
              />
              <label :for="'materialname-' + card_index"
                >название материала</label
              >
            </div>
            <div class="col-12 col-sm-8 form-floating">
              <input
                :id="'materialprice-' + card_index"
                :value="data.materialPrice"
                @input="
                  updateMaterialField({
                    index: card_index,
                    value: $event.target.value,
                    field: 'materialPrice',
                  })
                "
                type="number"
                class="form-control"
                placeholder="цена слэба"
              />
              <label :for="'materialprice-' + card_index">цена слэба</label>
            </div>
            <div class="col-12 col-sm-4 form-floating">
              <input
                :id="'material-count-' + card_index"
                :value="data.materialCount"
                @input="
                  updateMaterialField({
                    index: card_index,
                    value: $event.target.value,
                    field: 'materialCount',
                  })
                "
                type="number"
                class="form-control"
                placeholder="число слэбов"
              />
              <label :for="'material-count-' + card_index">число слэбов</label>
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-1 d-none d-lg-block">
          <button
            type="button"
            class="btn btn-danger h-100 w-100 py-0 px-md-0"
            @click="$emit('remove')"
          >
            -
          </button>
        </div>
      </div>
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
import { mapMutations } from "vuex";

export default {
  name: "MaterialCard",
  props: {
    card_index: Number,
  },
  emits: ["remove"],
  data() {
    return {
      pulled: null,
    };
  },
  computed: {
    data() {
      return this.$store.state.values.material_cards[this.card_index];
    },
    group() {
      let code =
        this.data.materialName != null && this.data.materialName != ""
          ? this.data.materialName.slice(0, 1).charCodeAt(0)
          : 0;
      if (code > 1000) {
        code = code - 985;
      }
      code = code - 65;
      let c_group;
      if (code == -65) {
        c_group = 0;
      } else if (code < 10) {
        c_group = 1;
      } else if (code < 20) {
        c_group = 2;
      } else if (code < 32) {
        c_group = 3;
      }
      return `group-${c_group}`;
    },
  },

  methods: {
    ...mapMutations(["updateMaterialName", "updateMaterialField"]),
    showDel(direction) {
      if (this.pulled == null && direction != "right") {
        this.pulled = true;
        this.$refs["mcard" + this.card_index].classList.toggle("pulled");
      } else if (!this.pulled && direction != "right") {
        this.pulled = true;
        this.$refs["mcard" + this.card_index].classList.toggle("pulled");
        this.$refs["mcard" + this.card_index].classList.toggle("slideback");
      } else if (this.pulled && direction == "right") {
        this.pulled = false;
        this.$refs["mcard" + this.card_index].classList.toggle("pulled");
        this.$refs["mcard" + this.card_index].classList.toggle("slideback");
      }
      console.log(this.pulled);
    },
  },
};
</script>


<style scoped lang="scss">
$deletebuttonwidth: 15vw;
$pullspeed: 0.15s;
.group-1 {
  background-color: #ffdace !important;
}
.group-2 {
  background-color: #ced1ff !important;
}
.group-3 {
  background-color: #ffcdcd !important;
}
.material-card {
  transition: background-color 0.5s linear;
  z-index: 1000;
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
</style>