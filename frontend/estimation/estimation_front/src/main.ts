import { createApp } from 'vue'
import App from './App.vue'
import './style/index.css'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
import ru from 'element-plus/lib/locale/lang/ru'
import { createPinia } from 'pinia'
import { router } from './router'



const app = createApp(App)
app.use(router)
app.use(createPinia())
app.use(ElementPlus, {
    locale: ru,
})
app.mount('#app')