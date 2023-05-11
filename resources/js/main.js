import {createApp} from 'vue';
import {Loading, LocalStorage, Notify, Quasar} from 'quasar';
import 'quasar/dist/quasar.prod.css';
import langRu from 'quasar/lang/ru';
import router from "./router";
import {createPinia} from 'pinia'
import App from "./App.vue";
import "./global.css";
import axios from "axios";
import {useUserStore} from "./stores/user";

createApp(App)
    .use(router)
    .use(createPinia())
    .use(Quasar, {lang: langRu, plugins: {Notify, Loading, LocalStorage}})
    .mount('#app');

// Обращение к защищенному ресурсу без прав удаляет авторизацию
axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 401) {
            useUserStore().removeAuth();
        } else return Promise.reject(error);
    });

