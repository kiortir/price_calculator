import { createRouter, createWebHistory } from 'vue-router'



const routes = [

    {
        path: '/list',
        name: 'estimation_list',
        component: () => import('../components/EstimationList.vue'),
    },
    {
        path: '/empty',
        name: '404',
        component: () => import('../components/404.vue'),
    },
    {
        path: '/new',
        name: 'new',
        component: () => import('../components/Estimation.vue'),
    },
    {
        path: '/:id',
        name: 'estimation',
        component: () => import('../components/Estimation.vue'),
        props: route => ({ id: route.params.id })
    },

]


export const router = createRouter({
    history: createWebHistory('/estimation/'),
    routes,
})