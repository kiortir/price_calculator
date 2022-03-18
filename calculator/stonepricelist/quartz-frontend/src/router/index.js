import { createRouter, createWebHistory } from 'vue-router'
import PriceListTable from '/src/components/PriceListTable.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: PriceListTable,
    },
]

const router = createRouter({
    history: createWebHistory('/pricelist/quartz/'),
    routes,
})

export default router