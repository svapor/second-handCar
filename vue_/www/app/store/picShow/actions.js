export default {
    async init({commit,state}) {
        var id = state.picShowState.id;
        var {info} = await fetch("/api/cars/"+ id).then(data=>data.json()); 
        var carlike = await fetch("/api/carlike/"+ id).then(data=>data.json());
        console.log(carlike);
        //拿到数据之后，去改变state中的数据
        commit("changeInfo",{info});
        commit("changeCarlike",{carlike});
    },
    Next({commit,state}) {
        var _state = state.picShowState;
        // console.log(_state.idx);
        // console.log(_state.info.images[_state.album].length);
        if (_state.idx < _state.info.images[_state.album].length-1 ) {
            commit("changeIdx",{idx: _state.idx + 1});
        } else {
            // switch (_state.album) {
            //     case "view":
            //         commit("changeIdx",{idx:0});
            //         commit("changeAlbum",{album:"inner"})
            //         break;
            //     case "inner":
            //         commit("changeIdx",{idx:0});
            //         commit("changeAlbum",{album:"engine"})
            //         break;
            //     case "engine":
            //         commit("changeIdx",{idx:0});
            //         commit("changeAlbum",{album:"more"})
            //         break;
            //     case "more":
            //         commit("changeIdx",{idx:0});
            //         commit("changeAlbum",{album:"view"})
            //         break;
            
            //     default:
            //         break;
            // }

            var arr = ["view","inner","engine","more"];
            var type = arr.indexOf(_state.album);
            type = type < arr.length-1 ? type+1 : 0 ;
            var nextAlbum = arr[type];
            commit("changeIdx",{idx: 0});
            commit("changeAlbum",{album: nextAlbum});
        }
    },
    Prev({commit,state}) {
        var _state = state.picShowState;
        if (_state.idx > 0) {
            commit("changeIdx",{idx: _state.idx - 1});
        } else {
            // switch (_state.album) {
            //     case "view":
            //         commit("changeAlbum",{album: "more"});
            //         commit("changeIdx",{idx: _state.info.images["more"].length-1});
            //         break;
            //     case "inner":
            //         commit("changeAlbum",{album: "view"});
            //         commit("changeIdx",{idx: _state.info.images["view"].length-1});
            //         break;
            //     case "engine":
            //         commit("changeAlbum",{album: "inner"});
            //         commit("changeIdx",{idx: _state.info.images["inner"].length-1});
            //         break;
            //     case "more":
            //         commit("changeAlbum",{album: "engine"});
            //         commit("changeIdx",{idx: _state.info.images["engine"].length-1});
            //         break;
            
            //     default:
            //         break;
            // }
            var arr = ["view","inner","engine","more"];
            var type =  arr.indexOf(_state.album);
            type = type>0 ? type-1 : arr.length-1 ;
            var prevAlbum = arr[type];
            commit("changeAlbum",{album: prevAlbum});
            commit("changeIdx",{idx: _state.info.images[prevAlbum].length-1});
        }
    },
    async changeID({commit,state},{id}) {
        var {info} = await fetch("api/cars/" + id).then(data=>data.json());
        var carlike = await fetch("api/carlike/" + id).then(data=>data.json());

        commit("changeID",{id});
        commit("changeInfo",{info});
        commit("changeCarlike",{carlike});
        
        //回到外观第一张图
        commit("changeAlbum",{album: "view"});
        commit("changeIdx",{idx: 0});
    },
    
    async changeShowPic({commit,state},payload) {
        console.log(payload);
        var {info} = await fetch("api/cars/" + payload.id).then(data=>data.json());
        var carlike = await fetch("api/carlike/" + payload.id).then(data=>data.json());

        console.log(info);
        console.log(carlike);
        commit("changeID",{id:payload.id});
        commit("changeInfo",{info});
        commit("changeCarlike",{carlike});

        //回到外观第一张图
        commit("changeAlbum",{album: "view"});
        commit("changeIdx",{idx: 0});

        commit("changeShowPic");
        
    }
}