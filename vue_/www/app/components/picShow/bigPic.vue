<template>
    <div class="bigPic">
        <img :src="`/carimages/${picShowState.id}/${picShowState.album}/${pic}`" width="100%">
        <button class="lBtn" @click="Prev">上一张</button>
        <button class="rBtn" @click="Next">下一张</button>
        <!-- {{picShowState.info.images[picShowState.album][picShowState.idx]}} -->
    </div>
</template>

<script>
    export default {
        computed:{
            picShowState(){
                return this.$store.state.picShowState;
            },
            //当前图片名
            pic(){
                var _state = this.picShowState;
                return _state.info.images[_state.album][_state.idx];
            }
        },
        methods: {
            Next() {
                this.$store.dispatch("Next");
            },
            Prev() {
                this.$store.dispatch("Prev");
            }
        },
    }
</script>

<style lang='less' scoped>
    .bigPic{
        position: relative;
        width: 65%;
        button{
            position: absolute;
            top: 0;
            height: 100%;
            width: 220px;
            opacity: 0;
        }

        .lBtn{
            left: 0;
            cursor:url(https://www.easyicon.net/download/png/517210/48),pointer;
        }
        .rBtn{
            right: 0;
            cursor:url(https://www.easyicon.net/download/png/517224/48),pointer;
        }
    } 
</style>