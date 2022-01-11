<template>
  <div class="mt-3">
    <div class="qz-block">
      <div class="h3">Кварцевый агломерат</div>
      <div class="mb-3">
        <label for="qz_spec" class="form-label">Число мастеров</label>
        <input
          type="number"
          class="form-control"
          id="qz_spec"
          v-model.number="qz_specialists"
          @input="setQzData"
          @change="updateCount('qz_specialists', $event.target.value)"
        />
      </div>
      <div id="chart" class="apex">
        <apexchart
          ref="realtimeQzChart"
          :height="600"
          :options="chartOptions"
          :series="series"
          @click="clickHandler"
        ></apexchart>
      </div>
    </div>
    <div class="ac-block">
      <div class="h3">Акриловый камень</div>
      <div class="mb-3">
        <label for="ac_spec" class="form-label">Число мастеров</label>
        <input
          type="number"
          class="form-control"
          id="ac_spec"
          v-model.number="acryl_specialists"
          @input="setAcData"
          @change="updateCount('acryl_specialists', $event.target.value)"
        />
      </div>
      <div id="chart" class="apex">
        <apexchart
          ref="realtimeAcChart"
          :height="600"
          :options="chartOptions"
          :series="series"
          @click="clickHandler"
        ></apexchart>
      </div>
    </div>
  </div>
</template>

<script>
Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf()).getTime();
  return new Date(date + days * 86400000);
};

export default {
  name: "app",
  data() {
    return {
      dealdata: [],
      dayoffs: [],
      status: null,
      updating: false,
      qz_specialists: 5,
      acryl_specialists: 5,
      series: [],
      pollInterval: null,
      chartOptions: {
        noData: {
          text: "Загрузка...",
        },
        chart: {
          locales: [
            {
              name: "ru",
              options: {
                months: [
                  "Январь",
                  "Февраль",
                  "Март",
                  "Апрель",
                  "Май",
                  "Июнь",
                  "Июль",
                  "Август",
                  "Сентябрь",
                  "Октябрь",
                  "Ноябрь",
                  "Декабрь",
                ],
                shortMonths: [
                  "Янв",
                  "Фев",
                  "Мар",
                  "Апр",
                  "Май",
                  "Июн",
                  "Июл",
                  "Авг",
                  "Сен",
                  "Окт",
                  "Ноя",
                  "Дек",
                ],
                days: [
                  "Понедельник",
                  "Вторник",
                  "Среда",
                  "Четверг",
                  "Пятница",
                  "Суббота",
                  "Воскресенье",
                ],
                shortDays: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
                toolbar: {
                  exportToSVG: "Сохранить как SVG",
                  exportToPNG: "Сохранить как  PNG",
                  menu: "Меню",
                  selection: "Выбранная область",
                  selectionZoom: "Приблизить выбранную область",
                  zoomIn: "Приблизить",
                  zoomOut: "Отдалить",
                  pan: "Панорамировать",
                  reset: "Сбросить зум",
                },
              },
            },
          ],
          type: "rangeBar",
          defaultLocale: "ru",
        },
        plotOptions: {
          bar: {
            horizontal: true,
            barHeight: "50%",
            rangeBarGroupRows: true,
          },
        },
        colors: [
          "#008FFB",
          "#00E396",
          "#FEB019",
          "#FF4560",
          "#775DD0",
          "#3F51B5",
          "#546E7A",
          "#D4526E",
          "#8D5B4C",
          "#F86624",
          "#D7263D",
          "#1B998B",
          "#2E294E",
          "#F46036",
          "#E2C044",
        ],
        fill: {
          type: "solid",
        },

        tooltip: {
          enabled: true,
          y: {
            formatter: function (val, { seriesIndex, w }) {
              let data = w.config.series[seriesIndex].data[0];
              let work_start = data.work_start_date;
              let template = `<div>Дата заключения: ${new Date(
                data.contract_start_date
              ).toLocaleDateString()}</div>${
                work_start > 0
                  ? `<div>Дата передачи в производство: ${new Date(
                      work_start
                    ).toLocaleDateString()}</div>`
                  : ""
              }`;

              console.log(template);
              return template;
            },
            title: {
              formatter: (seriesName) => seriesName,
            },
          },
        },
        annotations: {
          xaxis: [
            {
              x: new Date().getTime(),
              strokeDashArray: 0,
              borderColor: "#ff0000",
            },
          ],
        },
        dataLabels: {
          enabled: true,
          formatter: function (val, { seriesIndex, w }) {
            return w.config.series[seriesIndex].name;
          },
          textAnchor: "middle",
          style: {
            fontSize: "0.6em",
          },
          distributed: false,
          offsetX: 0,
          offsetY: 0,
        },
        xaxis: {
          type: "datetime",
        },
        legend: { show: false },
        grid: {
          xaxis: {
            lines: {
              show: true,
            },
          },
        },
      },
    };
  },
  methods: {
    addBusyDays(date, days) {
      for (let i = 0; i < days; i++) {
        date = date.addDays(1);
        this.isDayoff(date) ? days++ : days;
      }
      return date;
    },
    async deserializeDayoffs(year) {
      let dayoff_array = [];
      year.data.months.forEach((month) => {
        month.days.split(",").forEach((day) => {
          dayoff_array.push(
            Date.UTC(
              year.data.year,
              month.month - 1,
              Number(day.replace(/\D/g, ""))
            )
          );
        });
      });
      return dayoff_array;
    },
    async getLeads() {
      return this.axios.post("/amo/leads").then((response) => {
        // return this.axios
        //   .post("/pricelist/prox/", { url: "https://dev.unirock.ru/amo/leads" })
        //   .then((response) => {
        let deals = response.data.leads;
        let qz = {
          in_progress: [],
          queue: [],
        };
        let ac = {
          in_progress: [],
          queue: [],
        };
        deals.forEach((deal) => {
          if (deal.material == "Акрил") {
            if (deal.status_id == 18033010) {
              ac.in_progress.push(deal);
            } else {
              ac.queue.push(deal);
            }
          } else {
            if (deal.status_id == 18033010) {
              qz.in_progress.push(deal);
            } else {
              qz.queue.push(deal);
            }
          }
        });
        qz.in_progress.sort((x, y) => x.work_start_date - y.work_start_date);
        qz.queue.sort((x, y) => x.contract_start_date - y.contract_start_date);
        ac.in_progress.sort((x, y) => x.work_start_date - y.work_start_date);
        ac.queue.sort((x, y) => x.contract_start_date - y.contract_start_date);
        this.dealdata = {
          qz,
          ac,
        };
      });
    },
    async getDayoffs() {
      const prev = () =>
        this.axios
          .post("/pricelist/prox/", {
            url: `http://xmlcalendar.ru/data/ru/${
              new Date().getFullYear() - 1
            }/calendar.json`,
          })
          .then((response) => {
            return this.deserializeDayoffs(response);
          })
          .catch(() => []);
      const next = () =>
        this.axios
          .post("/pricelist/prox/", {
            url: `http://xmlcalendar.ru/data/ru/${
              new Date().getFullYear() + 1
            }/calendar.json`,
          })
          .then((response) => {
            return this.deserializeDayoffs(response);
          })
          .catch(() => []);
      const year = () =>
        this.axios
          .post("/pricelist/prox/", {
            url: `http://xmlcalendar.ru/data/ru/${new Date().getFullYear()}/calendar.json`,
          })
          .then((response) => {
            return this.deserializeDayoffs(response);
          })
          .catch(() => []);
      return Promise.all([prev(), next(), year()])
        .then((results) => {
          this.dayoffs = [].concat.apply([], [...results]);
        })
        .then(() => {
          if (this.dayoffs.length == 0) {
            alert("Ошибка! Обновите страницу");
          }
        });
    },
    clickHandler(event, chartContext, config) {
      if (event.ctrlKey) {
        window.open(
          "https://unirock.amocrm.ru/leads/detail/" +
            config.config.series[config.seriesIndex].data[0].lead
        );
      }
    },
    isDayoff(date) {
      if (date instanceof Date) {
        date = date.getTime();
      }
      return this.dayoffs.length == 0 ? false : this.dayoffs.includes(date);
    },
    firstToFinish(array) {
      let min_index = 0;
      let min_value = Infinity;
      for (let specialist_index in array) {
        if (array[specialist_index] < min_value) {
          min_value = array[specialist_index];
          min_index = specialist_index;
        }
      }
      return {
        index: min_index,
        value: min_value,
      };
    },
    async setQzData() {
      let lead_array = [];
      let specialists = [...Array(this.qz_specialists)].map(() => 0);
      for (let lead of this.dealdata.qz.in_progress) {
        let utc_start = (lead.work_start_date + 10800) * 1000;
        console.log(specialists);
        let first_to_finish = this.firstToFinish(specialists);
        if (lead.contract_number == 9658) {
          console.log({ utc_start, first_to_finish, specialists });
        }
        let start =
          utc_start > first_to_finish.value ? utc_start : first_to_finish.value;
        let finish = this.addBusyDays(
          new Date(start),
          lead.work_duration
        ).getTime();

        lead_array.push({
          name: lead.contract_number,
          data: [
            {
              lead: lead.lead_id,
              contract_start_date: (lead.contract_start_date + 10800) * 1000,
              work_start_date: utc_start,
              x: `Мастер ${first_to_finish.index}`,
              y: [start, finish],
            },
          ],
        });
        specialists[first_to_finish.index] = finish;
      }
      for (let lead of this.dealdata.qz.queue) {
        let utc_start = (lead.contract_start_date + 10800) * 1000;
        let first_to_finish = this.firstToFinish(specialists);
        let start =
          utc_start > first_to_finish.value ? utc_start : first_to_finish.value;
        let finish = this.addBusyDays(
          new Date(start),
          lead.work_duration
        ).getTime();

        lead_array.push({
          name: lead.contract_number,
          data: [
            {
              lead: lead.lead_id,
              contract_start_date: utc_start,

              x: `Мастер ${first_to_finish.index}`,
              y: [start, finish],
            },
          ],
        });
        specialists[first_to_finish.index] = finish;
      }
      this.$refs.realtimeQzChart.updateSeries(lead_array);
    },
    async setAcData() {
      let lead_array = [];
      let specialists = [...Array(this.acryl_specialists)].map(() => 0);
      for (let lead of this.dealdata.ac.in_progress) {
        let utc_start = (lead.work_start_date + 10800) * 1000;
        let first_to_finish = this.firstToFinish(specialists);
        let start =
          utc_start > first_to_finish.value ? utc_start : first_to_finish.value;
        let finish = this.addBusyDays(
          new Date(start),
          lead.work_duration
        ).getTime();

        lead_array.push({
          name: lead.contract_number,
          data: [
            {
              lead: lead.lead_id,
              contract_start_date: (lead.contract_start_date + 10800) * 1000,
              work_start_date: utc_start,
              x: `Мастер ${first_to_finish.index}`,
              y: [start, finish],
            },
          ],
        });
        specialists[first_to_finish.index] = finish;
      }
      for (let lead of this.dealdata.ac.queue) {
        let utc_start = (lead.contract_start_date + 10800) * 1000;
        let first_to_finish = this.firstToFinish(specialists);
        let start =
          utc_start > first_to_finish.value ? utc_start : first_to_finish.value;
        let finish = this.addBusyDays(
          new Date(start),
          lead.work_duration
        ).getTime();

        lead_array.push({
          name: lead.contract_number,
          data: [
            {
              lead: lead.lead_id,
              contract_start_date: utc_start,

              x: `Мастер ${first_to_finish.index}`,
              y: [start, finish],
            },
          ],
        });
        specialists[first_to_finish.index] = finish;
      }
      this.$refs.realtimeAcChart.updateSeries(lead_array);
    },
    updateCount(field, count) {
      this.axios.put("/production/updatecount", {
        [field]: count,
      });
    },
    updateGraph() {
      const set_update = async () =>
        new Promise((resolve) => {
          this.updating = true;
          resolve();
        });
      Promise.allSettled([set_update(), this.getLeads()]).then(() => {
        Promise.all([this.setQzData(), this.setAcData()]).then(() => {
          this.updating = false;
          return;
        });
      });
    },
  },
  mounted() {
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState == "visible" && !this.updating) {
        this.updateGraph();
      }
    });
    const setSpecialistCount = async () => {
      return new Promise((resolve) => {
        let specialists = JSON.parse(
          document.getElementById("specialists").textContent
        );
        Object.keys(specialists).forEach((key) => {
          this[key] = specialists[key];
          resolve();
        });
      });
    };
    Promise.allSettled([
      this.getLeads(),
      this.getDayoffs(),
      setSpecialistCount(),
    ])
      .then(() => {
        Promise.all([this.setQzData(), this.setAcData()]);
      })
      .then(() => {
        const update = this.updateGraph;
        this.pollInterval = setTimeout(function tick() {
          update();
          this.pollInterval = setTimeout(tick, 5000);
        }, 5000);
      });
  },
};
</script>

