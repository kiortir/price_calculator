import { createApp } from 'vue';

import App from './App.vue';

import axios from 'axios';
import VueAxios from 'vue-axios';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronLeft, faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faChevronLeft)
library.add(faEllipsisV)

const app = createApp(App);

app.use(VueAxios, axios);

app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app');
