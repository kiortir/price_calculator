import axios from 'axios'
import { createRouter, createWebHistory } from 'vue-router'
import Estimation from '/src/components/Estimation.vue'
// import PriceListNew from '/src/components/PriceListNew.vue'



const checkExistance = (to: any) => {
    axios.get('/estimation/api/', {
        params: { id: to.params.id }
    }).then(response => {
        const data = response.data.data
        to.data = data
    }).catch(e => {
        // alert(e)
        // return {
        //     path: '/new'
        // }
    })
    console.log({ to })
    return to
}

const routes = [
    // {
    //     path: '/',
    //     name: 'Список прайс-листов',
    //     component: {}
    // },
    {
        path: '/list',
        name: 'estimation_list',
        component: () => import('../components/EstimationList.vue'),
        // beforeEnter: [checkExistance],
    },
    {
        path: '/empty',
        name: '404',
        component: () => import('../components/404.vue'),
        // beforeEnter: [checkExistance],
    },
    {
        path: '/new',
        name: 'new',
        component: () => import('../components/Estimation.vue'),
        // beforeEnter: [checkExistance],
    },
    {
        path: '/:id',
        name: 'estimation',
        component: () => import('../components/Estimation.vue'),
        props: route => ({ id: route.params.id })
        // beforeEnter: [checkExistance],
    },

    // {
    //     path: '/new/',
    //     name: 'estimation1',
    //     component: Estimation,
    // },
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
export const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory('/estimation/'),
    routes, // short for `routes: routes`
})