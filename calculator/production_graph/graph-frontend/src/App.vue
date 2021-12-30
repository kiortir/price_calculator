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
          @change="setQzData"
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
          @change="setAcData"
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
      // dealdata: JSON.parse(
      //   '[{"lead_id":24709633,"material":"Акрил","specialist":"","deal_number":"4832","start_date":"2021-12-08","deal_duration":20,"work_duration":5,"work_start":null},{"lead_id":24677101,"material":"Акрил","specialist":"","deal_number":"9655","start_date":"2021-11-29","deal_duration":15,"work_duration":3,"work_start":null},{"lead_id":24625231,"material":"Акрил","specialist":"Мустайкин","deal_number":"1345","start_date":"2021-11-18","deal_duration":17,"work_duration":7,"work_start":"2021-12-01"},{"lead_id":24188257,"material":"Кварц","specialist":"Сенокосов","deal_number":"4785","start_date":"2021-11-03","deal_duration":15,"work_duration":5,"work_start":"2021-11-25"},{"lead_id":24099275,"material":null,"specialist":"Мустайкин","deal_number":"3400","start_date":"2021-09-24","deal_duration":15,"work_duration":5,"work_start":"2021-10-13"},{"lead_id":24723137,"material":"Акрил","specialist":null,"deal_number":"4836","start_date":"2021-12-11","deal_duration":20,"work_duration":null,"work_start":null},{"lead_id":24087325,"material":"Акрил","specialist":null,"deal_number":"4776","start_date":"2021-12-09","deal_duration":12,"work_duration":5,"work_start":null},{"lead_id":24678463,"material":"Кварц","specialist":"","deal_number":"9654","start_date":"2021-11-30","deal_duration":20,"work_duration":10,"work_start":null},{"lead_id":23998993,"material":"Кварц","specialist":"Казьмин","deal_number":"7306","start_date":"2021-09-05","deal_duration":20,"work_duration":2,"work_start":"2021-12-03"},{"lead_id":24533681,"material":"Кварц","specialist":"Коровин","deal_number":"9627","start_date":"2021-11-29","deal_duration":20,"work_duration":8,"work_start":"2021-12-15"},{"lead_id":24703171,"material":"Акрил","specialist":null,"deal_number":"1351","start_date":"2021-12-09","deal_duration":20,"work_duration":10,"work_start":null},{"lead_id":24682373,"material":"Акрил","specialist":null,"deal_number":"3461","start_date":"2021-12-01","deal_duration":20,"work_duration":6,"work_start":null},{"lead_id":24568616,"material":"Акрил","specialist":"","deal_number":"1339","start_date":"2021-11-05","deal_duration":15,"work_duration":5,"work_start":null},{"lead_id":24542043,"material":"Кварц","specialist":"","deal_number":"7349","start_date":"2021-10-30","deal_duration":15,"work_duration":4,"work_start":null},{"lead_id":24643479,"material":"Акрил","specialist":"Экимов","deal_number":"3452","start_date":"2021-11-22","deal_duration":15,"work_duration":5,"work_start":"2021-12-10"},{"lead_id":24647235,"material":"Акрил","specialist":null,"deal_number":"1343","start_date":"2021-11-12","deal_duration":20,"work_duration":5,"work_start":null},{"lead_id":24661125,"material":"Кварц","specialist":"","deal_number":"4815","start_date":"2021-11-25","deal_duration":20,"work_duration":12,"work_start":null},{"lead_id":24684561,"material":"Кварц","specialist":"Музафаров","deal_number":"7364","start_date":"2021-12-01","deal_duration":15,"work_duration":8,"work_start":"2021-12-09"},{"lead_id":24660873,"material":"Кварц","specialist":"","deal_number":"3457","start_date":"2021-11-25","deal_duration":20,"work_duration":6,"work_start":null},{"lead_id":24070925,"material":"Кварц","specialist":"","deal_number":"9577","start_date":"2021-12-06","deal_duration":20,"work_duration":10,"work_start":null},{"lead_id":24603505,"material":"Кварц","specialist":"Казьмин","deal_number":"3437","start_date":"2021-11-12","deal_duration":20,"work_duration":5,"work_start":"2021-12-07"},{"lead_id":24654797,"material":"Кварц","specialist":"Козырев","deal_number":"9644","start_date":"2021-11-24","deal_duration":20,"work_duration":14,"work_start":"2021-12-09"},{"lead_id":24576493,"material":"Кварц","specialist":"Халибеков","deal_number":"9630","start_date":"2021-11-02","deal_duration":20,"work_duration":12,"work_start":"2021-12-07"},{"lead_id":24672285,"material":"Акрил","specialist":"","deal_number":"9646","start_date":"2021-11-25","deal_duration":15,"work_duration":4,"work_start":null},{"lead_id":24687735,"material":"Кварц","specialist":"Халибеков П.","deal_number":"4824","start_date":"2021-12-01","deal_duration":15,"work_duration":4,"work_start":"2021-12-03"},{"lead_id":24720387,"material":"Акрил","specialist":null,"deal_number":"3468","start_date":"2021-12-09","deal_duration":20,"work_duration":null,"work_start":null},{"lead_id":24718645,"material":"Акрил","specialist":null,"deal_number":"3469","start_date":"2021-12-09","deal_duration":20,"work_duration":4,"work_start":null},{"lead_id":24551941,"material":"Акрил","specialist":"","deal_number":"4804","start_date":"2021-11-02","deal_duration":15,"work_duration":6,"work_start":null},{"lead_id":24632275,"material":"Акрил","specialist":"","deal_number":"1346","start_date":"2021-11-19","deal_duration":20,"work_duration":4,"work_start":null},{"lead_id":24637231,"material":"Акрил","specialist":"","deal_number":"3442","start_date":"2021-11-22","deal_duration":20,"work_duration":9,"work_start":null},{"lead_id":24652269,"material":"Акрил","specialist":"","deal_number":"3453","start_date":"2021-11-23","deal_duration":20,"work_duration":5,"work_start":null},{"lead_id":24689041,"material":"Кварц","specialist":"Буяновский","deal_number":"3451","start_date":"2021-12-02","deal_duration":20,"work_duration":3,"work_start":"2021-12-10"},{"lead_id":24656717,"material":"Акрил","specialist":"","deal_number":"1348","start_date":"2021-11-23","deal_duration":20,"work_duration":5,"work_start":null},{"lead_id":24587943,"material":"Акрил","specialist":"Акимов","deal_number":"1341","start_date":"2021-11-10","deal_duration":20,"work_duration":7,"work_start":"2021-11-29"},{"lead_id":24680977,"material":"Акрил","specialist":"","deal_number":"9656","start_date":"2021-11-29","deal_duration":15,"work_duration":4,"work_start":null},{"lead_id":24658481,"material":"Кварц","specialist":"","deal_number":"4822","start_date":"2021-11-25","deal_duration":20,"work_duration":4,"work_start":null},{"lead_id":24675077,"material":"Кварц","specialist":"Халибеков","deal_number":"3459","start_date":"2021-11-29","deal_duration":15,"work_duration":7,"work_start":"2021-12-03"},{"lead_id":24541999,"material":"Акрил","specialist":"Уулу","deal_number":"4799","start_date":"2021-10-30","deal_duration":15,"work_duration":4,"work_start":"2021-12-03"},{"lead_id":24687003,"material":"Кварц","specialist":"","deal_number":"4827","start_date":"2021-12-02","deal_duration":20,"work_duration":4,"work_start":null},{"lead_id":24675041,"material":"Кварц","specialist":"","deal_number":"3460","start_date":"2021-12-03","deal_duration":20,"work_duration":5,"work_start":null},{"lead_id":24514153,"material":"Кварц","specialist":"","deal_number":"3420","start_date":"2021-11-24","deal_duration":20,"work_duration":12,"work_start":"2021-12-06"},{"lead_id":24628393,"material":"Акрил","specialist":"","deal_number":"7356","start_date":"2021-11-18","deal_duration":20,"work_duration":20,"work_start":null},{"lead_id":24698605,"material":"Кварц","specialist":"","deal_number":"7368","start_date":"2021-12-04","deal_duration":25,"work_duration":7,"work_start":null},{"lead_id":24700787,"material":"Акрил","specialist":"","deal_number":"7369","start_date":"2021-12-05","deal_duration":15,"work_duration":4,"work_start":null},{"lead_id":24682427,"material":"Кварц","specialist":"","deal_number":"4826","start_date":"2021-12-01","deal_duration":20,"work_duration":8,"work_start":null},{"lead_id":23801551,"material":"Кварц","specialist":"Коровин","deal_number":"9543","start_date":"2021-07-29","deal_duration":25,"work_duration":6,"work_start":"2021-12-06"},{"lead_id":24656747,"material":"Кварц","specialist":"","deal_number":"1349","start_date":"2021-11-23","deal_duration":20,"work_duration":12,"work_start":null},{"lead_id":24661373,"material":"Акрил","specialist":"","deal_number":"9651","start_date":"2021-11-25","deal_duration":20,"work_duration":6,"work_start":null},{"lead_id":24689043,"material":"Акрил","specialist":"","deal_number":"7365","start_date":"2021-12-02","deal_duration":20,"work_duration":6,"work_start":null},{"lead_id":24686293,"material":"Кварц","specialist":"","deal_number":"3438","start_date":"2021-12-01","deal_duration":20,"work_duration":7,"work_start":null},{"lead_id":24630293,"material":"Акрил","specialist":"","deal_number":"4817","start_date":"2021-11-20","deal_duration":20,"work_duration":5,"work_start":null},{"lead_id":24108685,"material":"Кварц","specialist":"Халибеков П.","deal_number":"9597","start_date":"2021-09-30","deal_duration":20,"work_duration":7,"work_start":"2021-12-03"},{"lead_id":24678987,"material":"Кварц","specialist":"","deal_number":"4825","start_date":"2021-11-30","deal_duration":20,"work_duration":8,"work_start":null},{"lead_id":24707619,"material":"Кварц","specialist":"","deal_number":"4831","start_date":"2021-12-07","deal_duration":20,"work_duration":7,"work_start":null},{"lead_id":24691441,"material":"Кварц","specialist":"Халибеков","deal_number":"9657","start_date":"2021-12-03","deal_duration":20,"work_duration":12,"work_start":"2021-12-08"},{"lead_id":24694709,"material":"Акрил","specialist":"","deal_number":"7366","start_date":"2021-12-03","deal_duration":15,"work_duration":3,"work_start":null},{"lead_id":23758205,"material":"Акрил","specialist":null,"deal_number":"4732/1","start_date":"2021-12-07","deal_duration":17,"work_duration":6,"work_start":null},{"lead_id":24690127,"material":"Кварц","specialist":"","deal_number":"9660","start_date":"2021-12-02","deal_duration":20,"work_duration":10,"work_start":null},{"lead_id":24701437,"material":"Кварц","specialist":"","deal_number":"3458","start_date":"2021-12-05","deal_duration":20,"work_duration":4,"work_start":null},{"lead_id":24637281,"material":"Акрил","specialist":"Ильин","deal_number":"3446","start_date":"2021-11-22","deal_duration":20,"work_duration":5,"work_start":"2021-12-08"},{"lead_id":24592283,"material":"Акрил","specialist":"","deal_number":"4811","start_date":"2021-11-11","deal_duration":15,"work_duration":5,"work_start":null},{"lead_id":24679703,"material":"Акрил","specialist":"","deal_number":"7361","start_date":"2021-11-30","deal_duration":15,"work_duration":5,"work_start":null},{"lead_id":24708007,"material":"Акрил","specialist":"","deal_number":"1352","start_date":"2021-12-07","deal_duration":20,"work_duration":5,"work_start":null},{"lead_id":24707027,"material":"Акрил","specialist":"","deal_number":"4830","start_date":"2021-12-07","deal_duration":20,"work_duration":5,"work_start":null},{"lead_id":24711763,"material":"Акрил","specialist":"","deal_number":"4820","start_date":"2021-12-08","deal_duration":20,"work_duration":8,"work_start":null},{"lead_id":23546131,"material":"Кварц","specialist":"","deal_number":"3349/1","start_date":null,"deal_duration":15,"work_duration":3,"work_start":null},{"lead_id":24695327,"material":"Кварц","specialist":"Халибеков","deal_number":"1350","start_date":"2021-12-04","deal_duration":10,"work_duration":8,"work_start":"2021-12-08"},{"lead_id":24561591,"material":"Акрил","specialist":"Экимов","deal_number":"7352","start_date":"2021-11-04","deal_duration":15,"work_duration":5,"work_start":"2021-12-01"},{"lead_id":24620883,"material":"Кварц","specialist":"Буяновский","deal_number":"3440","start_date":"2021-11-17","deal_duration":20,"work_duration":8,"work_start":"2021-12-03"},{"lead_id":23973499,"material":"Кварц","specialist":"","deal_number":"9565","start_date":"2021-08-31","deal_duration":25,"work_duration":10,"work_start":null},{"lead_id":24718515,"material":"Кварц","specialist":null,"deal_number":"1356","start_date":"2021-12-09","deal_duration":20,"work_duration":null,"work_start":null},{"lead_id":23837173,"material":"Кварц","specialist":"Салямов","deal_number":"3380","start_date":"2021-08-06","deal_duration":20,"work_duration":6,"work_start":"2021-12-03"},{"lead_id":24618935,"material":"Кварц","specialist":"Халибеков","deal_number":"9640","start_date":"2021-11-16","deal_duration":20,"work_duration":5,"work_start":"2021-12-08"},{"lead_id":24053773,"material":"","specialist":"","deal_number":"9579","start_date":"2021-09-15","deal_duration":20,"work_duration":3,"work_start":null},{"lead_id":24720099,"material":"Кварц","specialist":null,"deal_number":"3450","start_date":"2021-11-24","deal_duration":20,"work_duration":null,"work_start":null},{"lead_id":24633915,"material":"Кварц","specialist":"Козырев","deal_number":"3447","start_date":"2021-11-21","deal_duration":20,"work_duration":7,"work_start":"2021-12-08"},{"lead_id":24617565,"material":"Акрил","specialist":"Лайков","deal_number":"9638","start_date":"2021-11-16","deal_duration":20,"work_duration":5,"work_start":"2021-12-10"},{"lead_id":24672393,"material":"Акрил","specialist":"","deal_number":"9652","start_date":"2021-11-24","deal_duration":14,"work_duration":4,"work_start":null},{"lead_id":24593517,"material":"Акрил","specialist":"Экимов","deal_number":"1342","start_date":"2021-11-10","deal_duration":20,"work_duration":5,"work_start":"2021-12-09"},{"lead_id":24721771,"material":"Кварц","specialist":null,"deal_number":"3448","start_date":"2021-12-10","deal_duration":20,"work_duration":null,"work_start":null},{"lead_id":24662305,"material":"Акрил","specialist":"Экимов","deal_number":"9650","start_date":"2021-11-26","deal_duration":10,"work_duration":4,"work_start":"2021-12-01"},{"lead_id":23551443,"material":"Кварц","specialist":"Музафаров","deal_number":"4684","start_date":"2021-06-11","deal_duration":20,"work_duration":5,"work_start":"2021-12-06"},{"lead_id":24632261,"material":"Акрил","specialist":"Лайков","deal_number":"1347","start_date":"2021-11-20","deal_duration":20,"work_duration":9,"work_start":"2021-11-29"},{"lead_id":24677959,"material":"Акрил","specialist":"","deal_number":"3415","start_date":"2021-11-30","deal_duration":15,"work_duration":4,"work_start":null},{"lead_id":24709537,"material":"Кварц","specialist":"","deal_number":"9658","start_date":"2021-12-01","deal_duration":20,"work_duration":7,"work_start":null},{"lead_id":24688323,"material":"Акрил","specialist":"","deal_number":"4828","start_date":"2021-12-02","deal_duration":20,"work_duration":4,"work_start":null},{"lead_id":24713675,"material":"Акрил","specialist":"","deal_number":"1355","start_date":"2021-12-08","deal_duration":20,"work_duration":5,"work_start":null},{"lead_id":24512755,"material":"Кварц","specialist":"Халибеков","deal_number":"9621","start_date":"2021-10-25","deal_duration":15,"work_duration":5,"work_start":"2021-12-03"},{"lead_id":24681747,"material":"Кварц","specialist":"","deal_number":"7362","start_date":"2021-12-01","deal_duration":20,"work_duration":9,"work_start":null},{"lead_id":24723683,"material":"Акрил","specialist":null,"deal_number":"4834","start_date":"2021-12-10","deal_duration":20,"work_duration":null,"work_start":null},{"lead_id":24648599,"material":"Кварц","specialist":"Ткаченко","deal_number":"4818","start_date":"2021-11-23","deal_duration":20,"work_duration":8,"work_start":"2021-12-09"}]'
      // ),
      dayoffs: [],
      status: null,
      pollInterval: null,
      qz_specialists: 9,
      acryl_specialists: 7,
      series: [],
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
              return `Дата заключения: ${new Date(
                w.config.series[seriesIndex].data[0].contract_start_date
              ).toLocaleDateString()}`;
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
    deserializeDayoffs(year) {
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
      // return this.axios.post("/amo/leads").then((response) => {
      return this.axios
        .post("/pricelist/prox/", { url: "https://dev.unirock.ru/amo/leads" })
        .then((response) => {
          let deals = response.data.leads.sort((x, y) => {
            return x.contract_start_date - y.contract_start_date;
          });
          let qz = [];
          let ac = [];
          deals.forEach((deal) => {
            if (deal.material == "Акрил") {
              ac.push(deal);
            } else {
              qz.push(deal);
            }
          });
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
          });
      const next = () =>
        this.axios
          .post("/pricelist/prox/", {
            url: `http://xmlcalendar.ru/data/ru/${
              new Date().getFullYear() + 1
            }/calendar.json`,
          })
          .then((response) => {
            return this.deserializeDayoffs(response);
          });
      const year = () =>
        this.axios
          .post("/pricelist/prox/", {
            url: `http://xmlcalendar.ru/data/ru/${new Date().getFullYear()}/calendar.json`,
          })
          .then((response) => {
            return this.deserializeDayoffs(response);
          });
      return Promise.all([prev(), next(), year()]).then((results) => {
        this.dayoffs = [].concat.apply([], [...results]);
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
      for (let lead of this.dealdata.qz) {
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
      // this.series = lead_array;
    },
    async setAcData() {
      let lead_array = [];
      let specialists = [...Array(this.acryl_specialists)].map(() => 0);
      for (let lead of this.dealdata.ac) {
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
  },
  mounted() {
    Promise.allSettled([this.getLeads(), this.getDayoffs()]).then(() => {
      Promise.all([this.setQzData(), this.setAcData()]);
    });
  },
};
</script>

