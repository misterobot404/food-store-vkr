import {createApp} from 'vue';
import {Loading, LocalStorage, Notify, Quasar} from 'quasar';
import 'quasar/dist/quasar.prod.css';
import langRu from 'quasar/lang/ru';
import router from "./router";
import { createPinia } from 'pinia'
import App from "./App.vue";
import "./global.css";

createApp(App)
    .use(router)
    .use(createPinia())
    .use(Quasar, {lang: langRu, plugins: {Notify, Loading, LocalStorage}})
    .mount('#app');

