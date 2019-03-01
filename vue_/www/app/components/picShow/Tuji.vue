<template>
    <div>
        <h2>{{info.brand}}{{info.series}}<small>[{{info.id}}]</small></h2>
        <ul class="tuji" ref="tuji">
            <li :class="{cur: album === 'view'}" @click="changeAlbum('view')">
                外观({{info.images.view.length}})
            </li>
            <li :class="{cur: album === 'inner'}" @click="changeAlbum('inner')">
                内饰({{info.images.inner.length}})
            </li>
            <li :class="{cur: album === 'engine'}" @click="changeAlbum('engine')">
                结构({{info.images.engine.length}})
            </li>
            <li :class="{cur: album === 'more'}" @click="changeAlbum('more')">
                更多({{info.images.more.length}})
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        computed: {
            info() {
                return this.$store.state.picShowState.info;
            },
            album() {
                return this.$store.state.picShowState.album;
            }
        },
        methods: {
            changeAlbum(album) {
                this.$store.commit("changeAlbum",{album});
                //重置idx
                this.$store.commit("changeIdx",{idx: 0});
            },
        },
    }
</script>

<style lang='less' scoped>
    .tuji{
        list-style: none;
        overflow: hidden;
        margin: 10px 0;
    }
    .tuji li{
        float: left;
        width: 45%;
        height: 50px;
        margin: 0 2% 2% 0;
        background-color: #333;
        border-radius: 10px;
        text-align: center;
        line-height: 50px;
        cursor: pointer;
    }
    .tuji li.cur{background:#999;}
</style>