<template>
    <div>
        <carListFilter></carListFilter>
        <carListTable></carListTable>
        <carListCard />
    </div>
</template>

<script>
    import carListTable from './carListTable.vue';
    import carListFilter from './carListFilter.vue';
    import carListCard from './carListCard.vue';
    export default {
        created() {
            //请求数据
            this.$store.dispatch("carlist_init");
        },
        components: {
            carListTable,
            carListFilter,
            carListCard
        },
    }
</script>

<style scoped>
    
</style>