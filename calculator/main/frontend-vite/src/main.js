import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from "./router"
import './index.css'

import axios from 'axios'
import VueAxios from 'vue-axios'


axios.defaults.headers.common['X-CSRFToken'] = document.getElementsByName('csrfmiddlewaretoken')[0].value;

const app = createApp(App)
app.use(VueAxios, axios)
app.use(store)
app.use(router)
app.mount('#app')
