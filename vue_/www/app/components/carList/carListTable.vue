<template>
    <div>
        <!-- columns是多少列，data是对应的表格需要的数据数组 -->
        <Table :columns="columns1" :data="$store.state.carListState.results" @on-sort-change="changeSort"></Table>
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
            changeSort(a) {
                // console.log(a);
                if (a.order == 'asc') {
                    var sortdirection = 1
                } else if(a.order == 'desc'){
                    var sortdirection = -1
                }else{
                    var sortdirection = this.$store.state.carListState.sortdirection;
                }
                this.$store.dispatch("changeSort",{sortby: a.key,sortdirection})
            },
            changePage(page) {
                this.$store.dispatch("changePage",{page})
            },
            changePageSize(pagesize) {
                this.$store.dispatch("changePageSize",{pagesize});
            }
        },
        data () {
            return {
                columns1: [

                    //key是results数据中对应的键名
                    {
                        title: 'id',
                        key: 'id',
                        sortable: 'custom'
                    },
                    {
                        title: '图片',
                        key: 'images',
                        render(h,{row}){
                            // console.log(row.images.view[0]);
                            return h({
                                data() {
                                    return {row}   
                                },
                                methods:{
                                    changeShowPic() {
                                        this.$store.dispatch("changeShowPic",{...row});
                                    }
                                },
                                template:"<img width='75px' :src='`/carimages_small/${row.id}/view/${row.images.view[0]}`' @click='changeShowPic'></img>"
                            })
                        }
                    },
                    {
                        title: '品牌',
                        key: 'brand'
                    },
                    {
                        title: '车型',
                        key: 'series'
                    },
                    {
                        title: '价格',
                        key: 'price',
                        sortable: 'custom'
                    },
                    {
                        title: '公里',
                        key: 'km'
                    },
                    {
                        title: '颜色',
                        key: 'color'
                    },
                    {
                        title: '变速箱',
                        key: 'gearbox'
                    },
                    {
                        title: '排放',
                        key: 'environmental'
                    },
                    {
                        title: '排量',
                        key: 'displacement'
                    },
                    {
                        title: '能源',
                        key: 'fuel'
                    },
                    {
                        title: '级别',
                        key: 'type'
                    },
                    {
                        title: '是否上牌',
                        key: 'licence',
                        render:(h,{row})=>{
                            return h({
                                data() {
                                    return {row}
                                },
                                template:`
                                    <div>
                                        <span v-if='${row.licence}'>是</span>
                                        <span v-if='${!row.licence}'>否</span>
                                    </div>
                                `
                            })
                        }
                    },
                    {
                        title: '是否本地车',
                        key: 'locality',
                        render:(h,{row})=>{
                            return h({
                                data() {
                                    return {row}
                                },
                                template:`
                                    <div>
                                        <span v-if='${row.locality}'>是</span>
                                        <span v-if='${!row.locality}'>否</span>
                                    </div>
                                `
                            })
                        }
                    },
                    {
                        title: '购买时间',
                        key: 'buydate',
                        render(h,{row}) {
                            // console.log(new Date(row.buydate));
                            return h({
                                data() {
                                    return {
                                        // date: new Date(row.buydate)
                                    }
                                },
                                template:`
                                    <p>${new Date(row.buydate).getFullYear()}年${new Date(row.buydate).getMonth()+1}月</p>
                                `
                            })
                        }
                    }
                ]
            }
        }
    }
</script>

<style scoped>
    .showPic{
        cursor: pointer;
    }
</style>