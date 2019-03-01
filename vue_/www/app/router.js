import VueRouter from "vue-router";
import index from "./components/index.vue";
import carlist from "./components/carList/index.vue";
import users from "./components/users/index.vue";

export default new VueRouter({
    routes:[
        {
            path: "/",
            name: "首页",
            component: index
        },
        {
            path: "/carlist",
            name: "汽车列表",
            component: carlist
        },
        {
            path: "/users",
            name: "用户中心",
            component: users
        },
        {
            path: "*",
            redirect: "/"
        }
    ]
})