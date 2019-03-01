<template>
    <div>
        <Row>
            <Col span="10">
                <Input suffix="ios-search" v-model="keyword" placeholder="请输入姓名或者手机号"></Input>
            </Col>
        </Row>
        <b>共{{usersState.count}}条信息</b>
        <Table :columns="columns1" :data="usersState.results"
            @on-sort-change="changeUsersSort"
        ></Table>
        <Page
        :total="usersState.count" show-sizer 
        :current="usersState.page"
        :page-size="usersState.pagesize"
        :page-size-opts="[2,5,10,20,50]"
        @on-change="changeUsersPage"
        @on-page-size-change="changeUsersPageSize"
        ></Page>
    </div>
</template>

<script>
    export default {
        created() {
            this.$store.dispatch("users_init");
        },
        data () {
            return {
                columns1: [
                    {
                        title: 'id',
                        key: 'id',
                        sortable: "custom"
                    },
                    {
                        title: '姓名',
                        key: 'name'
                    },
                    {
                        title: '年龄',
                        key: 'age',
                        sortable: 'custom'
                    },
                    {
                        title: '号码',
                        key: 'tel'
                    }
                ]
            }
        },
        computed: {
            usersState() {
                return this.$store.state.usersState 
            },
            keyword: {
                get() {
                    return this.$store.state.usersState.keyword;
                },
                set(val) {
                    var keyword = val.replace(/\s/g,",");
                    console.log(keyword);
                    this.$store.dispatch("changeUsersKeyword",keyword);
                }
            }
        },
        methods: {
            changeUsersSort(a) {
                this.$store.dispatch("changeUsersSort",a);
            },
            changeUsersPage(page) {
                this.$store.dispatch("changeUsersPage",page);
            },
            changeUsersPageSize(pagesize) {
                this.$store.dispatch("changeUsersPageSize",pagesize);
            }
        },
    }
</script>

<style scoped>

</style>