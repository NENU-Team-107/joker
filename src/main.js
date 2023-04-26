import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import ViewUIPlus from 'view-ui-plus';
import './assets/main.css';
import $ from 'jquery';

const app = createApp(App);
window.$ = $;
window.jQuery = $;
app.use(router)
    .use(ViewUIPlus)
    .mount('#app');
