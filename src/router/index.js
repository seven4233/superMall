import VueRouter from "vue-router";
import Vue from "vue";

Vue.use(VueRouter)

const router = new VueRouter({


    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            component: () => import('@/views/TheHome.vue')
        },
        {
            path: '/category',
            component: () => import('@/views/TheCategory.vue')
        },
        {
            path: '/shopcart',
            component: () => import('@/views/TheShopCart.vue')
        },
        {
            path: '/profile',
            component: () => import('@/views/TheProfile.vue')
        }
    ]
})
export default router