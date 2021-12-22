import { createApp } from 'vue';

import App from './App.vue';

import store from './store';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Vue3TouchEvents from 'vue3-touch-events';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faChevronLeft,
  faEllipsisV,
  faList,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faChevronLeft);
library.add(faEllipsisV);
library.add(faList);
library.add(faSearch);

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

// app.directive('focus', {
//   // When the bound element is mounted into the DOM...
//   mounted(el) {
//     // Focus the element
//     el.focus();
//   },
// });
app.use(store);
app.use(Vue3TouchEvents, {
  disableClick: true,
});
app.use(VueAxios, axios);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');
