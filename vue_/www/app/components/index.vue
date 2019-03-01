<template>
    <div>
        <h1>首页</h1>
        <h2>我的Vue练习作品</h2>
        <div>
            <ul>
            <li>
                <router-link to="/carlist">汽车列表</router-link>
                <small>实现了分页排序还有筛选功能</small>
            </li>
            <li>
                <router-link to="/users">用户中心</router-link>
            </li>
        </ul>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
    li{
        list-style: none;
        font-size: 16px;
    }
</style>