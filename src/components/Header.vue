<template>
    <div class="header">
        <div class="header-title">
            诊所药品进销管理系统
        </div>
        <el-menu mode="horizontal" default-active="/manage/dashboard" @select="handleSelect" router background-color="#f5f7fa" text-color="#606266">
            <el-menu-item index="/manage/dashboard">首页</el-menu-item>
            <!-- <el-menu-item index="/manage/patients">病历管理</el-menu-item>
            <el-menu-item index="/manage/records">就诊记录</el-menu-item> -->
            <el-menu-item index="/manage/medicines">药品清单</el-menu-item>
            <el-menu-item index="/manage/purchase">进货清单</el-menu-item>
            <el-menu-item index="/manage/sale">销售清单</el-menu-item>
        </el-menu>
    </div>
</template>

<style lang="css">
.header-title {
    position: absolute;
    top: 0;
    left: 50px;
    z-index: 1000;
    line-height: 60px;
    color: #409EFF;
    font-size: 20px;
}

.header .el-menu {
    padding-left: 400px;
}

.header .el-menu-item {
    font-size: 16px;
}
</style>

<script>
export default {
    methods: {
        handleSelect(key, keyPath) {}
    }
}
</script>
