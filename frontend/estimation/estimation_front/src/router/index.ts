import { createRouter, createWebHistory } from 'vue-router'
import Estimation from '/src/components/Estimation.vue'
// import PriceListNew from '/src/components/PriceListNew.vue'


// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
    // {
    //     path: '/',
    //     name: 'Список прайс-листов',
    //     component: {}
    // },
    {
        path: '/',
        name: 'estimation',
        component: Estimation,
        props: route => ({ id: route.query.id })
    },
    {
        path: '/new/',
        name: 'estimation',
        component: Estimation,
    },
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
export const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory('/estimation/'),
    routes, // short for `routes: routes`
})