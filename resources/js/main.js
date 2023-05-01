import {createApp} from 'vue';
import {Notify, Quasar} from 'quasar';
import 'quasar/dist/quasar.prod.css';
import langRu from 'quasar/lang/ru';
import router from "./router";
import App from "./App.vue";

createApp(App)
    .use(router)
    .use(Quasar, {lang: langRu, plugins: {Notify}})
    .mount('#app');

