<template>
  <div class="row g-3 row-cols-1">
    <div class="col col-12 col-md-6 h-100">
      <div class="card">
        <div class="card-header">Замер</div>
        <div class="card-body">
          <input
            type="number"
            class="form-control mb-2"
            placeholder="число выездов"
            :value="logistics.measurement"
            @input="update('measurement', $event.target.value)"
          />
          <input
            type="number"
            class="form-control"
            placeholder="цена за шаблон"
            :value="logistics.templatePrice"
            @input="update('templatePrice', $event.target.value)"
          />
        </div>
      </div>
    </div>
    <div class="col col-12 col-md-6 h-100">
      <div class="card">
        <div class="card-header">Доставка</div>
        <div class="card-body">
          <input
            type="number"
            class="form-control"
            placeholder="число выездов"
            :value="logistics.delivery"
            @input="update('delivery', $event.target.value)"
          />
        </div>
      </div>
    </div>
    <div class="col col-12 col-md-6 h-100">
      <div class="card">
        <div class="card-header">Монтаж</div>
        <div class="card-body">
          <input
            type="number"
            class="form-control"
            placeholder="число выездов"
            :value="logistics.mounting"
            @input="update('mounting', $event.target.value)"
          />
        </div>
      </div>
    </div>
    <div class="col col-12 col-md-6 h-100">
      <div class="card">
        <div class="card-header">Расстояние за Мкад</div>
        <div class="card-body">
          <input
            type="number"
            class="form-control"
            placeholder="км"
            :value="logistics.distance"
            @input="update('distance', $event.target.value)"
          />
        </div>
      </div>
    </div>
    <div class="col col-12 col-md-6 h-100">
      <div class="card">
        <div class="card-header">Ручной подъем</div>
        <div class="card-body">
          <input
            type="number"
            class="form-control"
            placeholder="км"
            :value="logistics.manualLifting"
            @input="update('manualLifting', $event.target.value)"
          />
        </div>
      </div>
    </div>
    <div class="col col-12 col-md-6 h-100">
      <div class="card">
        <div class="card-header">Дополнительные работы</div>
        <div class="card-body">
          <input
            type="number"
            class="form-control"
            placeholder="руб."
            :value="logistics.additionalWork"
            @input="update('additionalWork', $event.target.value)"
          />
        </div>
      </div>
    </div>
    <div class="col col-12 col-md-6 h-100">
      <div class="card">
        <div class="card-header">Накрутка</div>
        <div class="card-body">
          <input
            type="number"
            class="form-control"
            placeholder="руб."
            :value="logistics.overPrice"
            @input="update('overPrice', $event.target.value)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LogisticsBlock",
  computed: {
    logistics() {
      return this.$store.state.values.logistics;
    },
  },
  methods: {
    update(field, value) {
      this.$store.commit("updateLogisticsInfo", { field, value });
    },
  },
};
</script>
