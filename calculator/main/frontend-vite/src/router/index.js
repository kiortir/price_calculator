import { createRouter, createWebHistory } from 'vue-router'
import EstimationList from '/src/components/EstimationList.vue'
import Estimation from '/src/components/Estimation.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: EstimationList,
    },
    {
        path: '/:id',
        name: 'Estimation',
        component: Estimation,
        props: true,
    },
]

const router = createRouter({
    history: createWebHistory('/estimation/'),
    routes,
    // linkActiveClass: 'active'
})

export default router