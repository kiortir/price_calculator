<template>
  <div id="chart">
    <apexchart
      :options="chartOptions"
      :series="leads"
      @click="clickHandler"
    ></apexchart>

    {{ leads }}
  </div>
</template>

<script>
// import axios from "axios";
Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

export default {
  name: "app",
  data() {
    return {
      dealdata: JSON.parse(
        '[{"lead_id":24709633,"material":"Акрил","specialist":"","deal_number":"4832","start_date":"2021-12-08","deal_duration":20,"work_duration":5,"work_start":null},{"lead_id":24677101,"material":"Акрил","specialist":"","deal_number":"9655","start_date":"2021-11-29","deal_duration":15,"work_duration":3,"work_start":null},{"lead_id":24625231,"material":"Акрил","specialist":"Мустайкин","deal_number":"1345","start_date":"2021-11-18","deal_duration":17,"work_duration":7,"work_start":"2021-12-01"},{"lead_id":24188257,"material":"Кварц","specialist":"Сенокосов","deal_number":"4785","start_date":"2021-11-03","deal_duration":15,"work_duration":5,"work_start":"2021-11-25"},{"lead_id":24099275,"material":null,"specialist":"Мустайкин","deal_number":"3400","start_date":"2021-09-24","deal_duration":15,"work_duration":5,"work_start":"2021-10-13"},{"lead_id":24723137,"material":"Акрил","specialist":null,"deal_number":"4836","start_date":"2021-12-11","deal_duration":20,"work_duration":null,"work_start":null},{"lead_id":24087325,"material":"Акрил","specialist":null,"deal_number":"4776","start_date":"2021-12-09","deal_duration":12,"work_duration":5,"work_start":null},{"lead_id":24678463,"material":"Кварц","specialist":"","deal_number":"9654","start_date":"2021-11-30","deal_duration":20,"work_duration":10,"work_start":null},{"lead_id":23998993,"material":"Кварц","specialist":"Казьмин","deal_number":"7306","start_date":"2021-09-05","deal_duration":20,"work_duration":2,"work_start":"2021-12-03"},{"lead_id":24533681,"material":"Кварц","specialist":"Коровин","deal_number":"9627","start_date":"2021-11-29","deal_duration":20,"work_duration":8,"work_start":"2021-12-15"},{"lead_id":24703171,"material":"Акрил","specialist":null,"deal_number":"1351","start_date":"2021-12-09","deal_duration":20,"work_duration":10,"work_start":null},{"lead_id":24682373,"material":"Акрил","specialist":null,"deal_number":"3461","start_date":"2021-12-01","deal_duration":20,"work_duration":6,"work_start":null},{"lead_id":24568616,"material":"Акрил","specialist":"","deal_number":"1339","start_date":"2021-11-05","deal_duration":15,"work_duration":5,"work_start":null},{"lead_id":24542043,"material":"Кварц","specialist":"","deal_number":"7349","start_date":"2021-10-30","deal_duration":15,"work_duration":4,"work_start":null},{"lead_id":24643479,"material":"Акрил","specialist":"Экимов","deal_number":"3452","start_date":"2021-11-22","deal_duration":15,"work_duration":5,"work_start":"2021-12-10"},{"lead_id":24647235,"material":"Акрил","specialist":null,"deal_number":"1343","start_date":"2021-11-12","deal_duration":20,"work_duration":5,"work_start":null},{"lead_id":24661125,"material":"Кварц","specialist":"","deal_number":"4815","start_date":"2021-11-25","deal_duration":20,"work_duration":12,"work_start":null},{"lead_id":24684561,"material":"Кварц","specialist":"Музафаров","deal_number":"7364","start_date":"2021-12-01","deal_duration":15,"work_duration":8,"work_start":"2021-12-09"},{"lead_id":24660873,"material":"Кварц","specialist":"","deal_number":"3457","start_date":"2021-11-25","deal_duration":20,"work_duration":6,"work_start":null},{"lead_id":24070925,"material":"Кварц","specialist":"","deal_number":"9577","start_date":"2021-12-06","deal_duration":20,"work_duration":10,"work_start":null},{"lead_id":24603505,"material":"Кварц","specialist":"Казьмин","deal_number":"3437","start_date":"2021-11-12","deal_duration":20,"work_duration":5,"work_start":"2021-12-07"},{"lead_id":24654797,"material":"Кварц","specialist":"Козырев","deal_number":"9644","start_date":"2021-11-24","deal_duration":20,"work_duration":14,"work_start":"2021-12-09"},{"lead_id":24576493,"material":"Кварц","specialist":"Халибеков","deal_number":"9630","start_date":"2021-11-02","deal_duration":20,"work_duration":12,"work_start":"2021-12-07"},{"lead_id":24672285,"material":"Акрил","specialist":"","deal_number":"9646","start_date":"2021-11-25","deal_duration":15,"work_duration":4,"work_start":null},{"lead_id":24687735,"material":"Кварц","specialist":"Халибеков П.","deal_number":"4824","start_date":"2021-12-01","deal_duration":15,"work_duration":4,"work_start":"2021-12-03"},{"lead_id":24720387,"material":"Акрил","specialist":null,"deal_number":"3468","start_date":"2021-12-09","deal_duration":20,"work_duration":null,"work_start":null},{"lead_id":24718645,"material":"Акрил","specialist":null,"deal_number":"3469","start_date":"2021-12-09","deal_duration":20,"work_duration":4,"work_start":null},{"lead_id":24551941,"material":"Акрил","specialist":"","deal_number":"4804","start_date":"2021-11-02","deal_duration":15,"work_duration":6,"work_start":null},{"lead_id":24632275,"material":"Акрил","specialist":"","deal_number":"1346","start_date":"2021-11-19","deal_duration":20,"work_duration":4,"work_start":null},{"lead_id":24637231,"material":"Акрил","specialist":"","deal_number":"3442","start_date":"2021-11-22","deal_duration":20,"work_duration":9,"work_start":null},{"lead_id":24652269,"material":"Акрил","specialist":"","deal_number":"3453","start_date":"2021-11-23","deal_duration":20,"work_duration":5,"work_start":null},{"lead_id":24689041,"material":"Кварц","specialist":"Буяновский","deal_number":"3451","start_date":"2021-12-02","deal_duration":20,"work_duration":3,"work_start":"2021-12-10"},{"lead_id":24656717,"material":"Акрил","specialist":"","deal_number":"1348","start_date":"2021-11-23","deal_duration":20,"work_duration":5,"work_start":null},{"lead_id":24587943,"material":"Акрил","specialist":"Акимов","deal_number":"1341","start_date":"2021-11-10","deal_duration":20,"work_duration":7,"work_start":"2021-11-29"},{"lead_id":24680977,"material":"Акрил","specialist":"","deal_number":"9656","start_date":"2021-11-29","deal_duration":15,"work_duration":4,"work_start":null},{"lead_id":24658481,"material":"Кварц","specialist":"","deal_number":"4822","start_date":"2021-11-25","deal_duration":20,"work_duration":4,"work_start":null},{"lead_id":24675077,"material":"Кварц","specialist":"Халибеков","deal_number":"3459","start_date":"2021-11-29","deal_duration":15,"work_duration":7,"work_start":"2021-12-03"},{"lead_id":24541999,"material":"Акрил","specialist":"Уулу","deal_number":"4799","start_date":"2021-10-30","deal_duration":15,"work_duration":4,"work_start":"2021-12-03"},{"lead_id":24687003,"material":"Кварц","specialist":"","deal_number":"4827","start_date":"2021-12-02","deal_duration":20,"work_duration":4,"work_start":null},{"lead_id":24675041,"material":"Кварц","specialist":"","deal_number":"3460","start_date":"2021-12-03","deal_duration":20,"work_duration":5,"work_start":null},{"lead_id":24514153,"material":"Кварц","specialist":"","deal_number":"3420","start_date":"2021-11-24","deal_duration":20,"work_duration":12,"work_start":"2021-12-06"},{"lead_id":24628393,"material":"Акрил","specialist":"","deal_number":"7356","start_date":"2021-11-18","deal_duration":20,"work_duration":20,"work_start":null},{"lead_id":24698605,"material":"Кварц","specialist":"","deal_number":"7368","start_date":"2021-12-04","deal_duration":25,"work_duration":7,"work_start":null},{"lead_id":24700787,"material":"Акрил","specialist":"","deal_number":"7369","start_date":"2021-12-05","deal_duration":15,"work_duration":4,"work_start":null},{"lead_id":24682427,"material":"Кварц","specialist":"","deal_number":"4826","start_date":"2021-12-01","deal_duration":20,"work_duration":8,"work_start":null},{"lead_id":23801551,"material":"Кварц","specialist":"Коровин","deal_number":"9543","start_date":"2021-07-29","deal_duration":25,"work_duration":6,"work_start":"2021-12-06"},{"lead_id":24656747,"material":"Кварц","specialist":"","deal_number":"1349","start_date":"2021-11-23","deal_duration":20,"work_duration":12,"work_start":null},{"lead_id":24661373,"material":"Акрил","specialist":"","deal_number":"9651","start_date":"2021-11-25","deal_duration":20,"work_duration":6,"work_start":null},{"lead_id":24689043,"material":"Акрил","specialist":"","deal_number":"7365","start_date":"2021-12-02","deal_duration":20,"work_duration":6,"work_start":null},{"lead_id":24686293,"material":"Кварц","specialist":"","deal_number":"3438","start_date":"2021-12-01","deal_duration":20,"work_duration":7,"work_start":null},{"lead_id":24630293,"material":"Акрил","specialist":"","deal_number":"4817","start_date":"2021-11-20","deal_duration":20,"work_duration":5,"work_start":null},{"lead_id":24108685,"material":"Кварц","specialist":"Халибеков П.","deal_number":"9597","start_date":"2021-09-30","deal_duration":20,"work_duration":7,"work_start":"2021-12-03"},{"lead_id":24678987,"material":"Кварц","specialist":"","deal_number":"4825","start_date":"2021-11-30","deal_duration":20,"work_duration":8,"work_start":null},{"lead_id":24707619,"material":"Кварц","specialist":"","deal_number":"4831","start_date":"2021-12-07","deal_duration":20,"work_duration":7,"work_start":null},{"lead_id":24691441,"material":"Кварц","specialist":"Халибеков","deal_number":"9657","start_date":"2021-12-03","deal_duration":20,"work_duration":12,"work_start":"2021-12-08"},{"lead_id":24694709,"material":"Акрил","specialist":"","deal_number":"7366","start_date":"2021-12-03","deal_duration":15,"work_duration":3,"work_start":null},{"lead_id":23758205,"material":"Акрил","specialist":null,"deal_number":"4732/1","start_date":"2021-12-07","deal_duration":17,"work_duration":6,"work_start":null},{"lead_id":24690127,"material":"Кварц","specialist":"","deal_number":"9660","start_date":"2021-12-02","deal_duration":20,"work_duration":10,"work_start":null},{"lead_id":24701437,"material":"Кварц","specialist":"","deal_number":"3458","start_date":"2021-12-05","deal_duration":20,"work_duration":4,"work_start":null},{"lead_id":24637281,"material":"Акрил","specialist":"Ильин","deal_number":"3446","start_date":"2021-11-22","deal_duration":20,"work_duration":5,"work_start":"2021-12-08"},{"lead_id":24592283,"material":"Акрил","specialist":"","deal_number":"4811","start_date":"2021-11-11","deal_duration":15,"work_duration":5,"work_start":null},{"lead_id":24679703,"material":"Акрил","specialist":"","deal_number":"7361","start_date":"2021-11-30","deal_duration":15,"work_duration":5,"work_start":null},{"lead_id":24708007,"material":"Акрил","specialist":"","deal_number":"1352","start_date":"2021-12-07","deal_duration":20,"work_duration":5,"work_start":null},{"lead_id":24707027,"material":"Акрил","specialist":"","deal_number":"4830","start_date":"2021-12-07","deal_duration":20,"work_duration":5,"work_start":null},{"lead_id":24711763,"material":"Акрил","specialist":"","deal_number":"4820","start_date":"2021-12-08","deal_duration":20,"work_duration":8,"work_start":null},{"lead_id":23546131,"material":"Кварц","specialist":"","deal_number":"3349/1","start_date":null,"deal_duration":15,"work_duration":3,"work_start":null},{"lead_id":24695327,"material":"Кварц","specialist":"Халибеков","deal_number":"1350","start_date":"2021-12-04","deal_duration":10,"work_duration":8,"work_start":"2021-12-08"},{"lead_id":24561591,"material":"Акрил","specialist":"Экимов","deal_number":"7352","start_date":"2021-11-04","deal_duration":15,"work_duration":5,"work_start":"2021-12-01"},{"lead_id":24620883,"material":"Кварц","specialist":"Буяновский","deal_number":"3440","start_date":"2021-11-17","deal_duration":20,"work_duration":8,"work_start":"2021-12-03"},{"lead_id":23973499,"material":"Кварц","specialist":"","deal_number":"9565","start_date":"2021-08-31","deal_duration":25,"work_duration":10,"work_start":null},{"lead_id":24718515,"material":"Кварц","specialist":null,"deal_number":"1356","start_date":"2021-12-09","deal_duration":20,"work_duration":null,"work_start":null},{"lead_id":23837173,"material":"Кварц","specialist":"Салямов","deal_number":"3380","start_date":"2021-08-06","deal_duration":20,"work_duration":6,"work_start":"2021-12-03"},{"lead_id":24618935,"material":"Кварц","specialist":"Халибеков","deal_number":"9640","start_date":"2021-11-16","deal_duration":20,"work_duration":5,"work_start":"2021-12-08"},{"lead_id":24053773,"material":"","specialist":"","deal_number":"9579","start_date":"2021-09-15","deal_duration":20,"work_duration":3,"work_start":null},{"lead_id":24720099,"material":"Кварц","specialist":null,"deal_number":"3450","start_date":"2021-11-24","deal_duration":20,"work_duration":null,"work_start":null},{"lead_id":24633915,"material":"Кварц","specialist":"Козырев","deal_number":"3447","start_date":"2021-11-21","deal_duration":20,"work_duration":7,"work_start":"2021-12-08"},{"lead_id":24617565,"material":"Акрил","specialist":"Лайков","deal_number":"9638","start_date":"2021-11-16","deal_duration":20,"work_duration":5,"work_start":"2021-12-10"},{"lead_id":24672393,"material":"Акрил","specialist":"","deal_number":"9652","start_date":"2021-11-24","deal_duration":14,"work_duration":4,"work_start":null},{"lead_id":24593517,"material":"Акрил","specialist":"Экимов","deal_number":"1342","start_date":"2021-11-10","deal_duration":20,"work_duration":5,"work_start":"2021-12-09"},{"lead_id":24721771,"material":"Кварц","specialist":null,"deal_number":"3448","start_date":"2021-12-10","deal_duration":20,"work_duration":null,"work_start":null},{"lead_id":24662305,"material":"Акрил","specialist":"Экимов","deal_number":"9650","start_date":"2021-11-26","deal_duration":10,"work_duration":4,"work_start":"2021-12-01"},{"lead_id":23551443,"material":"Кварц","specialist":"Музафаров","deal_number":"4684","start_date":"2021-06-11","deal_duration":20,"work_duration":5,"work_start":"2021-12-06"},{"lead_id":24632261,"material":"Акрил","specialist":"Лайков","deal_number":"1347","start_date":"2021-11-20","deal_duration":20,"work_duration":9,"work_start":"2021-11-29"},{"lead_id":24677959,"material":"Акрил","specialist":"","deal_number":"3415","start_date":"2021-11-30","deal_duration":15,"work_duration":4,"work_start":null},{"lead_id":24709537,"material":"Кварц","specialist":"","deal_number":"9658","start_date":"2021-12-01","deal_duration":20,"work_duration":7,"work_start":null},{"lead_id":24688323,"material":"Акрил","specialist":"","deal_number":"4828","start_date":"2021-12-02","deal_duration":20,"work_duration":4,"work_start":null},{"lead_id":24713675,"material":"Акрил","specialist":"","deal_number":"1355","start_date":"2021-12-08","deal_duration":20,"work_duration":5,"work_start":null},{"lead_id":24512755,"material":"Кварц","specialist":"Халибеков","deal_number":"9621","start_date":"2021-10-25","deal_duration":15,"work_duration":5,"work_start":"2021-12-03"},{"lead_id":24681747,"material":"Кварц","specialist":"","deal_number":"7362","start_date":"2021-12-01","deal_duration":20,"work_duration":9,"work_start":null},{"lead_id":24723683,"material":"Акрил","specialist":null,"deal_number":"4834","start_date":"2021-12-10","deal_duration":20,"work_duration":null,"work_start":null},{"lead_id":24648599,"material":"Кварц","specialist":"Ткаченко","deal_number":"4818","start_date":"2021-11-23","deal_duration":20,"work_duration":8,"work_start":"2021-12-09"}]'
      ),
      dayoffs: null,
      status: null,
      pollInterval: null,
      specialists_count: 9,
      series: [
        // George Washington
        {
          name: "George Washington",
          data: [
            {
              x: "President",
              y: [
                new Date(1789, 3, 30).getTime(),
                new Date(1797, 2, 4).getTime(),
              ],
            },
          ],
        },
        // John Adams
        {
          name: "John Adams",
          data: [
            {
              x: "President",
              y: [
                new Date(1797, 2, 4).getTime(),
                new Date(1801, 2, 4).getTime(),
              ],
            },
            {
              x: "Vice President",
              y: [
                new Date(1789, 3, 21).getTime(),
                new Date(1797, 2, 4).getTime(),
              ],
            },
          ],
        },
        // Thomas Jefferson
        {
          name: "Thomas Jefferson",
          data: [
            {
              x: "President",
              y: [
                new Date(1801, 2, 4).getTime(),
                new Date(1809, 2, 4).getTime(),
              ],
            },
            {
              x: "Vice President",
              y: [
                new Date(1797, 2, 4).getTime(),
                new Date(1801, 2, 4).getTime(),
              ],
            },
            {
              x: "Secretary of State",
              y: [
                new Date(1790, 2, 22).getTime(),
                new Date(1793, 11, 31).getTime(),
              ],
            },
          ],
        },
        // Aaron Burr
        {
          name: "Aaron Burr",
          data: [
            {
              x: "Vice President",
              y: [
                new Date(1801, 2, 4).getTime(),
                new Date(1805, 2, 4).getTime(),
              ],
            },
          ],
        },
        // George Clinton
        {
          name: "George Clinton",
          data: [
            {
              x: "Vice President",
              y: [
                new Date(1805, 2, 4).getTime(),
                new Date(1812, 3, 20).getTime(),
              ],
            },
          ],
        },
        // John Jay
        {
          name: "John Jay",
          data: [
            {
              x: "Secretary of State",
              y: [
                new Date(1789, 8, 25).getTime(),
                new Date(1790, 2, 22).getTime(),
              ],
            },
          ],
        },
        // Edmund Randolph
        {
          name: "Edmund Randolph",
          data: [
            {
              x: "Secretary of State",
              y: [
                new Date(1794, 0, 2).getTime(),
                new Date(1795, 7, 20).getTime(),
              ],
            },
          ],
        },
        // Timothy Pickering
        {
          name: "Timothy Pickering",
          data: [
            {
              x: "Secretary of State",
              y: [
                new Date(1795, 7, 20).getTime(),
                new Date(1800, 4, 12).getTime(),
              ],
            },
          ],
        },
        // Charles Lee
        {
          name: "Charles Lee",
          data: [
            {
              x: "Secretary of State",
              y: [
                new Date(1800, 4, 13).getTime(),
                new Date(1800, 5, 5).getTime(),
              ],
            },
          ],
        },
        // John Marshall
        {
          name: "John Marshall",
          data: [
            {
              x: "Secretary of State",
              y: [
                new Date(1800, 5, 13).getTime(),
                new Date(1801, 2, 4).getTime(),
              ],
            },
          ],
        },
        // Levi Lincoln
        {
          name: "Levi Lincoln",
          data: [
            {
              x: "Secretary of State",
              y: [
                new Date(1801, 2, 5).getTime(),
                new Date(1801, 4, 1).getTime(),
              ],
            },
          ],
        },
        // James Madison
        {
          name: "James Madison",
          data: [
            {
              x: "Secretary of State",
              y: [
                new Date(1801, 4, 2).getTime(),
                new Date(1809, 2, 3).getTime(),
              ],
            },
          ],
        },
      ],
      chartOptions: {
        chart: {
          height: 500,
          type: "rangeBar",
          zoom: {
            enabled: true,
            type: "x",
            autoScaleYaxis: false,
            zoomedArea: {
              fill: {
                color: "#90CAF9",
                opacity: 0.4,
              },
              stroke: {
                color: "#0D47A1",
                opacity: 0.4,
                width: 1,
              },
            },
          },
        },

        dataLabels: {
          enabled: true,
          formatter: function (val, { seriesIndex, w }) {
            return w.config.series[seriesIndex].name;
          },
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
        xaxis: {
          type: "datetime",
        },
        grid: {
          show: true,
          borderColor: "#90A4AE",
          strokeDashArray: 0,
          position: "back",
          xaxis: {
            lines: {
              show: true,
            },
          },
          yaxis: {
            lines: {
              show: false,
            },
          },
        },
        legend: {
          show: false,
          position: "right",
        },
        tooltip: {
          enabled: true,
          enabledOnSeries: undefined,
        },
      },
    };
  },
  methods: {
    clickHandler(event, chartContext, config) {
      alert(
        "https://unirock.amocrm.ru/leads/detail/" +
          config.config.series[config.seriesIndex].data[0].lead
      );
      console.log(config.config.series[config.seriesIndex]);
      console.log(config.config.series[config.seriesIndex].name);
      console.log(
        config.config.series[config.seriesIndex].data[config.dataPointIndex]
      );
    },
    getFirstToFree(arr) {
      let min = Infinity;
      let index = 0;
      for (let el in arr) {
        if (arr[el] < min) {
          min = arr[el];
          index = el;
        }
      }
      return { end_date: min, index };
    },
  },
  computed: {
    leads() {
      let Leads = [];

      let sorted = [
        ...this.dealdata.filter(
          (deal) => deal.start_date != null && deal.work_duration != null
        ),
      ].sort((x, y) => {
        return (
          new Date(x.start_date).getTime() - new Date(y.start_date).getTime()
        );
      });
      // console.log([this.dealdata.slice(1, 5), sorted.slice(1, 5)]);
      let specialist_array = sorted
        .slice(0, 5)
        .map((el) => new Date(el.start_date));
      for (let lead of sorted) {
        let last_spec = this.getFirstToFree(specialist_array);

        let flead = {
          name: lead.deal_number,

          data: [
            {
              lead: lead.lead_id,
              x: "Мастер" + last_spec.index,
              y: [
                last_spec.end_date,
                new Date(lead.start_date).addDays(lead.work_duration).getTime(),
              ],
            },
          ],
        };
        specialist_array[last_spec.index] = new Date(lead.start_date)
          .addDays(lead.work_duration)
          .getTime();
        Leads.push(flead);
      }
      return Leads;
    },

    // fLeads() {
    //   return this.leads.map((lead) => {
    //     // let start = new Date(lead.start_date).getTime();
    //     return {
    //       name: lead.deal_number,
    //       data: [
    //         {
    //           x: lead.lead_id,
    //           y: [new Date(lead.start_date).getTime(), new Date().getTime()],
    //         },
    //       ],
    //     };
    //   });
    // },
  },
  mounted() {
    console.log([new Date(), new Date().addDays(15)]);
  },
  // mounted() {
  //   this.fetchData().then((data) => {
  //     // console.log("zzz");
  //     // console.log(data);
  //     this.dayoffs = data;
  //   });
  //check if the status is completed, if not fetch data every 10minutes.
  // },
  // components: {
  //   apexchart: VueApexCharts,
  // },
};
</script>