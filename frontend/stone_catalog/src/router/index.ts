import { createRouter, createWebHistory } from 'vue-router'



const routes = [

    {
        path: '/settings',
        name: 'settings',
        component: () => import('../components/settings/Main.vue'),
        children: [
            {
                path: 'import/session',
                name: 'import_session',
                component: () => import('../components/settings/ImportSession.vue')
            },
            {
                path: 'import',
                name: 'import',
                component: () => import('../components/settings/Import.vue')
            },
            {
                path: 'general',
                name: 'general',
                component: () => import('../components/settings/General.vue')
            }
        ]
    },

    {
        path: '/:material',
        name: 'material',
        component: () => import('../components/pricelist/Material.vue')
    },

]


export const router = createRouter({
    history: createWebHistory('/price_list/'),
    routes,
})