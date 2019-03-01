<template>
    <div class="moreCar">
        <h3>更多{{info.brand}}{{info.series}}供您选择</h3>
        <ul>
            <li v-for="i in carlike" @click="changeID(i.id)">
                {{i.brand}}{{i.series}} {{i.color}}色 {{new Date(i.buydate).getFullYear()}}年 {{i.km}}公里 {{i.displacement}}排量 {{i.price}}万
            </li>
            <!-- <li>奥迪A8 2014年 5000公里1.6万</li>
            <li>奥迪A8 2014年 5000公里1.6万</li>
            <li>奥迪A8 2014年 5000公里1.6万</li>
            <li>奥迪A8 2014年 5000公里1.6万</li>
            <li>奥迪A8 2014年 5000公里1.6万</li>
            <li>奥迪A8 2014年 5000公里1.6万</li> -->
        </ul>
        <div class="drag"><b></b></div>
    </div>
</template>

<script>
    export default {
        computed:{
            info() {
                return this.$store.state.picShowState.info;
            },
            picShowState() {
                return this.$store.state.picShowState;
            },
            carlike() {
                return this.$store.state.picShowState.carlike.results;
            }
        },
        methods: {
            changeID(id) {
                this.$store.dispatch("changeID",{id});
            },
        },
    }
</script>

<style lang="less" scoped>
    .moreCar{
        position:relative;width: 92%;
        background:rgba(255,255,255,0.3);
        ul{
            list-style: none;
            li{
                cursor: pointer;
            }
        }
    }
    .drag{
        width: 10px;
        height: 100%;
        position: absolute;
        right: 0;
        top: 0;
        background-color: white;
        border-radius: 5px;
        b{
            position: absolute;
            width: 10px;
            height: 30px;
            background-color: salmon;
            border-radius: 5px;
        }
    }
</style>