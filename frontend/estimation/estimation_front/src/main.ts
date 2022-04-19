import { createApp } from 'vue'
import App from './App.vue'
import './style/index.css'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { Delete, Edit } from '@element-plus/icons-vue'
import VueScreen from 'vue-screen'



const app = createApp(App)

app.use(createPinia())

app.use(ElementPlus)
app.use(VueScreen, 'tailwind')

app
    .component('Delete', Delete)
    .component('Edit', Edit)

app.mount('#app')