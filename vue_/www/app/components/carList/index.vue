<template>
    <div>
        <carListFilter></carListFilter>
        <carListTable></carListTable>
    </div>
</template>

<script>
    import carListTable from './carListTable.vue';
    import carListFilter from './carListFilter.vue';
    export default {
        created() {
            //请求数据
            this.$store.dispatch("carlist_init");
        },
        components: {
            carListTable,
            carListFilter
        },
    }
</script>

<style scoped>
    
</style>