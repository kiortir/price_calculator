import { createApp } from 'vue';
import App from './App.vue';

import axios from 'axios';
import VueAxios from 'vue-axios';
import VueApexCharts from 'vue3-apexcharts';

axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';

let app = createApp(App);
app.use(VueApexCharts);
app.use(VueAxios, axios);
app.mount('#app');
