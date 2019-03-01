import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);  //将vuex安装到vue中
import picShowState from "./picShow/state.js";
import picShowActions from "./picShow/actions.js";
import picShowMutations from "./picShow/mutations.js";

import carListState from "./carList/state.js";
import carListActions from "./carList/actions.js";
import carListMutations from "./carList/mutations";

import usersState from "./users/state.js";
import usersActions from "./users/actions.js";
import usersMutations from "./users/mutations.js";

//引用createLogger插件
import createLogger from "vuex/dist/logger";


//export default new Vuex.Store({...})
const store = new Vuex.Store({
    state: {
        picShowState,
        carListState,
        usersState
    },

    mutations: {
        ...picShowMutations,
        ...carListMutations,
        ...usersMutations
    },

    actions: {
        ...picShowActions,
        ...carListActions,
        ...usersActions
    },

    plugins: [createLogger()]
})

export default store;

