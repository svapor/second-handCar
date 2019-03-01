
//封装请求数据函数
async function load(commit,state) {
    var page = state.carListState.page;
    var pagesize = state.carListState.pagesize;
    var sortby = state.carListState.sortby;
    var sortdirection = state.carListState.sortdirection;

    //筛选条件
    var filters = state.carListState.filters;
    var str = "";
    for(var i = 0;i < filters.length;i++) {
        if(filters[i].v.length != 0) {
            str = str + "&" + filters[i].k + "=" + JSON.stringify(filters[i].v);
        }
    }

    console.log(str);

    const {results,count} = await fetch(`/api/cars?page=${page}&pagesize=${pagesize}&sortby=${sortby}&sortdirection=${sortdirection}${str}`).then(data=>data.json());

    commit("changeResults",{results});
    commit("changeCount",{count});
}

export default{
    async carlist_init({commit,state}) {
        await load(commit,state);
    },

    async changePage({commit,state},payload) {
        commit("changePage",{page: payload.page});  //先改变页码
        await load(commit,state);       //请求数据
    },
    
    async changePageSize({commit,state},payload) {
        commit("changePage",{page: 1});  //先页码归一
        commit("changePageSize",{pagesize: payload.pagesize});  //改变每页条数
        await load(commit,state);
    },

    async changeSort({commit,state},payload) {
        commit("changeSort",{sortby: payload.sortby, sortdirection: payload.sortdirection});
        await load(commit, state);
    },

    async changeFilters({commit,state},payload) {
        commit("changeFilters",payload);  //改变筛选条件
        commit("changePage",{page: 1});   //页面归一
        
        await load(commit, state);
        // console.log(state.carListState.count);
    }
}