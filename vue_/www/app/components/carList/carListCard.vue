<template>
    <div class="car-list">
        <div class="car-list-card">
            <Card 
            class="card" 
            v-for="item,index in results" 
            :key="index" 
            :padding="10"
            :bordered="false"
            >
                <div class="card-inner">
                    <img 
                    :src="`/carimages/${item.id}/view/${item.images.view[1]}`" 
                    alt="" 
                    width="100%"
                    >
                    <h2>
                        <span>
                            {{item.brand}}
                            {{item.series}}
                            {{item.color}}
                            {{new Date(item.buydate).getFullYear()}}款
                        </span>
                    </h2>
                    <p>
                        {{new Date(item.buydate).getFullYear()}}年
                        <b>|</b>
                        {{item.displacement}}
                        <b>|</b>
                        {{~~(item.km/10000)}}万公里
                    </p>
                    <em>{{item.price}}万</em>
                    <!-- {{item}} -->
                </div>
            </Card>
        </div>
        <Page 
        :current="$store.state.carListState.page"
        :total="$store.state.carListState.count" 
        :page-size="$store.state.carListState.pagesize" 
        :page-size-opts="[5,10,20,50,100]" 
        show-total show-sizer show-elevator 
        @on-change="changePage" 
        @on-page-size-change="changePageSize"
        />
        {{results}}
    </div>
</template>

<script>
    export default {
        computed: {
            results() {
                return this.$store.state.carListState.results;
            },
        },
        methods: {
            changePage(page) {
                this.$store.dispatch("changePage",{page})
            },
            changePageSize(pagesize) {
                this.$store.dispatch("changePageSize",{pagesize});
            }
        },
    }
</script>

<style lang="less" scoped>
    .card {
        width: 24%;
        display: inline-block;
        margin: 0 5px 10px 0;
        .card-inner {
            h2 {
                font-size: 16px;
                font-weight: normal;
            }
            p{
                color: #999;
                padding: 5px 0;
            }
            em {
                font-size: 16px;
                color: #333;
            }
        }
    }
</style>