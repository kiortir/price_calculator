import axios from 'axios'
import router from './router/index.js'
import store from './store/index.js'
import VueAxios from 'vue-axios'
import { createApp } from 'vue'
import App from './App.vue'
import './index.css'


const app = createApp(App)
app.use(VueAxios, axios)
app.use(router)
app.use(store)
app.mount('#app')
