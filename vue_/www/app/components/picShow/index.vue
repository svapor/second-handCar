<template>
    <div class="picShow">
        <bigPic></bigPic>
        <div class="rightPart">
            <Tuji></Tuji>
            <MoreCars></MoreCars>
            <smallPics></smallPics>
        </div>
        <Icon class="close" type="ios-close" size="32" @click="close"/>
    </div>
</template>
<script>
    import bigPic from "./bigPic.vue";
    import Tuji from "./Tuji.vue";
    import MoreCars from "./MoreCars.vue";
    import smallPics from "./smallPics.vue";
    export default{
        created(){
            // console.log(this.$store.state.picShowState);
            this.$store.dispatch("init");
        },
        methods: {
            close() {
                this.$store.commit("changeShowPic");
            },
        },
        components: {
            bigPic,
            Tuji,
            MoreCars,
            smallPics
        },
    }
</script>
<style lang="less">
    .picShow{
        width: 100%;
        height: 100%;
        padding: 2%;
        box-sizing: border-box;
        list-style: none;
        position: fixed;
        z-index: 999;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        background-color: rgb(67, 70, 69);
        color: #fff;
        img{
            // 消除图片间隙
            display: block;
        }
    }
    .rightPart{
        width: 30%;
        height: 100%;
        position: absolute;
        top: 0;
        right: 0;

        h2{
            margin-top: 5%;
        }
    }

    .close{
        position: absolute;
        right: 5px;
        top: 5px;
        cursor: pointer;
    }

</style>
