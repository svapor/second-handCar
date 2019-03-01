export default {
    changeInfo(state,payload) {
        // console.log(state.picShowState);
        // console.log(payload);
        state.picShowState.info = payload.info;
    },
    changeAlbum(state,payload) {
        state.picShowState.album = payload.album;
    },
    changeIdx(state,payload) {
        state.picShowState.idx = payload.idx;
    },
    changeCarlike(state,payload) {
        state.picShowState.carlike = payload.carlike;
    },
    changeID(state,payload) {
        state.picShowState.id = payload.id;
    },

    //控制图集显示 / 隐藏
    changeShowPic(state,payload) {
        state.picShowState.showPic = !state.picShowState.showPic;
    }
}