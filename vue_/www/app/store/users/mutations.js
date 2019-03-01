export default{
    changeUsersCount(state,payload) {
        state.usersState.count = payload.count;
    },
    changeUsersResults(state,payload) {
        state.usersState.results = payload.results;
    },
    changeUsersSortby(state,payload) {
        state.usersState.sortby = payload.sortby;
    },
    changeUsersSortDirection(state,payload) {
        state.usersState.sortdirection = payload.sortdirection;
    },
    changeUsersPage(state,payload) {
        state.usersState.page = payload.page;
    },
    changeUsersPageSize(state,payload) {
        state.usersState.pagesize = payload.pagesize;
    },
    changeUsersKeyword(state,payload) {
        state.usersState.keyword = payload.keyword;
    }
}