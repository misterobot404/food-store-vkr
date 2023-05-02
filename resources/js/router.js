import { createRouter, createWebHistory } from "vue-router";
import Catalog from "./pages/Catalog.vue";
import Basket from "@/pages/Basket.vue";
import Orders from "@/pages/Orders.vue";

const routes = [
    {path: '/', component: Catalog},
    {path: '/basket', component: Basket},
    {path: '/orders', component: Orders},
    {path: '/admin_panel', component: Basket},
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
