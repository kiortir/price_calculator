import { createApp } from 'vue';

import App from './App.vue';

import axios from 'axios';
import VueAxios from 'vue-axios';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faChevronLeft, faEllipsisV, faList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faChevronLeft);
library.add(faEllipsisV);
library.add(faList);

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

const app = createApp(App);

app.use(VueAxios, axios);

app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');
