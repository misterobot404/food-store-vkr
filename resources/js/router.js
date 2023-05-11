import {createRouter, createWebHistory} from "vue-router";
import Catalog from "./pages/Catalog.vue";
import Basket from "./pages/Basket.vue";
import Orders from "./pages/Orders.vue";
import AdminPanel from "./pages/AdminPanel.vue";
import Checkout from "./pages/Checkout.vue";
import { useUserStore } from './stores/user'
import { Notify } from 'quasar';

const routes = [
    {
        path: '/',
        name: "Catalog",
        component: Catalog,
        meta: {
            requiresAuth: false
        }
    },
    {
        path: '/basket',
        component: Basket,
        meta: {
            requiresAuth: false
        }
    },
    {
        path: '/checkout',
        component: Checkout,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/orders',
        component: Orders,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/admin_panel',
        component: AdminPanel,
        meta: {
            requiresAuth: true,
            requiresAdmin: true
        }
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach(async (to, from, next) => {
    const user_store = useUserStore();

    // Если пытаемся перейти на защищенную страницу
    if (to.meta.requiresAuth && !user_store.token) {
        user_store.show_signin = true;
        Notify.create({
            icon: "info",
            message: "Для продолжения необходимо авторизоваться"
        });

        if (from.meta.requiresAuth === false) {
            next(false);
        }
        else {
            next("");
        }
    }
    // Все проверки пройдены, страницу можно открыть
    else {
        next()
    }
})

export default router
