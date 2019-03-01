export default{
    changeResults(state,payload){
        state.carListState.results = payload.results;
    },
    changeCount(state,payload){
        state.carListState.count = payload.count;
    },
    changePage(state,payload){
        state.carListState.page = payload.page;
    },
    changePageSize(state,payload) {
        state.carListState.pagesize = payload.pagesize;
    },
    changeSort(state,payload) {
        // console.log(payload);
        state.carListState.sortby = payload.sortby;
        state.carListState.sortdirection = payload.sortdirection;
    },
    changeFilters(state,payload) {
        state.carListState.filters = state.carListState.filters.map(item=>item.k === payload.k ? {...item , v : payload.v} : item);        
    }
}