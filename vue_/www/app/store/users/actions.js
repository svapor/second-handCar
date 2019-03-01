//先封装请求数据的函数load
//参数多重结构 
async function load(commit,{usersState:{page,pagesize,sortby,sortdirection,keyword}}) {
    // console.log(state);

    // var page = state.usersState.page;
    // var pagesize = state.usersState.pagesize;
    // var sortby = state.usersState.sortby;
    // var sortdirection = state.usersState.sortdirection;
    // var count = state.usersState.count;
    // var keyword = state.usersState.keyword;

    // console.log(page,pagesize,sortby,sortdirection,keyword);
    
    const {count,results} = await fetch(`/api/users?page=${page}&pagesize=${pagesize}&sortby=${sortby}&sortdirection=${sortdirection}&keyword=${keyword}`).then(data=>data.json());
    // console.log(count,results);

    commit("changeUsersCount",{count});
    commit("changeUsersResults",{results});
}

export default{
    async users_init({commit,state}) {
        await load(commit,state);
    },
    async changeUsersSort({commit,state},payload) {
        commit("changeUsersSortby",{sortby: payload.key});
        var sortdirection;
        payload.order === "asc" ? sortdirection = 1 : sortdirection = -1;
        commit("changeUsersSortDirection",{sortdirection});
        await load(commit,state);
    },
    async changeUsersPage({commit,state},page) {
        commit("changeUsersPage",{page});
        await load(commit,state);
    },
    async changeUsersPageSize({commit,state},pagesize) {
        commit("changeUsersPageSize",{pagesize});
        commit("changeUsersPage",{page: 1});  //页面归一
        await load(commit,state);
    },
    async changeUsersKeyword({commit,state},keyword) {
        commit("changeUsersPage",{page: 1});  //页面归一
        commit("changeUsersKeyword",{keyword});
        await load(commit,state);
    }
}