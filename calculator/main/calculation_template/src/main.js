import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import Vue3TouchEvents from 'vue3-touch-events';

import axios from 'axios';
import VueAxios from 'vue-axios';

function keydown(e) {
  if (e.keyCode === 13) {
    document.activeElement.blur();
  }
}
document.addEventListener('keydown', keydown);

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

const app = createApp(App).use(store);
app.use(store);
app.use(Vue3TouchEvents, {
  disableClick: true,
});
app.use(VueAxios, axios);
app.mount('#app');
