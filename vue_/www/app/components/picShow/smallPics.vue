<template>
    <div class="smallpics">
        <div class="train" ref="train" :style="{left: - nowPage*420 + 'px'}">
            <ul v-for="i in allPages">
                <li 
                :class="{cur: picShowState.idx===index+(i-1)*4}"
                v-for="(pic,index) in nowPicsArr.slice((i-1)*4,i*4)"
                @click="changeIdx(index+(i-1)*4)"
                >
                    <img :src="`carimages_small/${picShowState.id}/${picShowState.album}/${pic}`" alt="">
                </li>
                
            </ul>
        </div>

        <ol class="nav" ref="nav">
            <li 
            :class="{cur: i-1 === nowPage}" 
            v-for="i in allPages"
            :style="{width: (100/allPages - 2*allPages) + '%'}"
            >
            </li>
        </ol>
    </div>
</template>

<script>
    export default {
        //生命周期，上树
        mounted() {
            //备份this
            var self = this;
            //点击导航条切换小图页面
            $(this.$refs.nav).on("click","li", function () {
                //让火车小图移动
                $(self.$refs.train).css("left",-420*$(this).index()+"px");
                //加cur，去掉兄弟cur
                $(this).addClass("cur").siblings().removeClass("cur");
            });

            //鼠标离开小图归位，回到idx那一页
            $(this.$refs.train).mouseleave(function () {
                //火车归位
                $(self.$refs.train).css("left",-420*(self.nowPage)+"px");
                //cur还原
                $(self.$refs.nav).find("li").eq(self.nowPage).addClass("cur").siblings().removeClass("cur");
            })
        },
        computed: {
            picShowState() {
                return this.$store.state.picShowState;
            }, 

            //当前album的图片的数组
            nowPicsArr() {
                return this.picShowState.info.images[this.picShowState.album];
            },
            //小图总页数(向上取整)
            allPages() {
                return Math.ceil(this.nowPicsArr.length/4);
            },

            nowPage() {
                return parseInt(this.picShowState.idx/4);
            }
        },
        methods: {
            changeIdx(idx) {
                this.$store.commit("changeIdx",{idx});
            },
        },
    }
</script>

<style lang='less' scoped>
    .smallpics{
        overflow:hidden;
        width: 90%;
        margin:20px 0;
        .train{
            position: relative;
            width: 8888888px;
            transition: all 0.5s;
        }
        ul{
            float:left;
            width:420px;
            list-style:none;
            
            li{
                cursor: pointer;
                float:left;width:46%;
                margin:0 3% 3% 0;
                position:relative;
                img{
                    width: 100%;
                    height: 100%;
                }
            }

            li::before{
                content: "";
                position: absolute;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.6);
            }

            li.cur::before{
                opacity: 0;
            }
        }
        
        .nav{
            width: 99%;
            overflow: hidden;
            list-style: none;
            li{
                // width: 30%;
                height: 6px;
                border-radius: 3px;
                margin-right: 4%;
                background-color: grey;
                float: left;
                cursor: pointer;
            }
            li.cur{
                background-color: white;
            }
        }
    }
</style>