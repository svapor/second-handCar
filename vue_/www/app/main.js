import Vue from "vue";
import App from "./App.vue";
import store from "./store";  //import store from "./store/index.js"
import iView from 'iview';
import router from "./router.js"; //路由

Vue.use(iView);

import VueRouter from "vue-router";
Vue.use(VueRouter);

new Vue({
    el: "#app",
    store,
    router,
    render: h=>h(App)
})