import { createApp } from 'vue';
import App from './App.vue';

import axios from 'axios';
import VueAxios from 'vue-axios';
import VueApexCharts from 'vue3-apexcharts';

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + '=') {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

const csrftoken = getCookie('csrftoken');
axios.defaults.headers.common = { 'X-CSRFToken': csrftoken };

// axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';

let app = createApp(App);
app.use(VueApexCharts);
app.use(VueAxios, axios);
app.mount('#app');
