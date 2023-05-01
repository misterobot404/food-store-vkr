import { createRouter, createWebHistory } from "vue-router";
import Home from "./pages/Home.vue";
import Account from "./pages/Account.vue";
import PageNotFound from "./pages/PageNotFound.vue";

const routes = [
    {path: '/', component: Home},
    {path: '/account', component: Account},
    {path: "/:pathMatch(.*)*", component: PageNotFound},
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
