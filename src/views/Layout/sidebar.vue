<template>
    <div class="sidebar-container">
        <h3>证宝宝管理系统</h3>
        <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" theme="dark">
            <el-submenu index="1">
                <template slot="title">
                   用户管理
                </template>
                <el-menu-item-group>
                    <el-menu-item index="1-1">
                        <router-link to="/userList">用户列表</router-link>
                    </el-menu-item>
                    <el-menu-item index="1-2">
                        <router-link to="/survestaff">公测员管理</router-link>
                    </el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">
                    运营管理
                </template>
                <el-menu-item-group>
                    <el-menu-item index="2-1">
                        <router-link to="/compManage">投诉建议管理</router-link>
                    </el-menu-item>
                    <el-menu-item index="2-2">
                        <router-link to="/refund">退款处理</router-link>
                    </el-menu-item>
                    <el-menu-item index="2-3">
                        <router-link to="/HisManage">出证管理</router-link>
                    </el-menu-item>
                    <el-menu-item index="2-4">
                        <router-link to="/TrialManage">出庭管理</router-link>
                    </el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">
                   数据分析
                </template>
                <el-menu-item-group>
                    <el-menu-item index="3-1">
                        <router-link to="/userData">用户数据</router-link>
                    </el-menu-item>
                    <el-menu-item index="3-2">
                        <router-link to="/behaviourData">行为数据</router-link>
                    </el-menu-item>
                    <el-menu-item index="3-3">
                        <router-link to="/tradeData">交易统计</router-link>
                    </el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu  index="4">
                <template slot="title">
                   系统管理
                </template>
                <el-menu-item-group>
                    <el-menu-item index="4-1">
                        <router-link to="">管理员设置</router-link>
                    </el-menu-item>
                    <el-menu-item index="4-2">
                        <router-link to="">操作日志</router-link>
                    </el-menu-item>
                    <el-menu-item index="4-3">
                        <router-link to="">密钥管理</router-link>
                    </el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>


    </div>
</template>

<script>
    export default {
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    };
</script>

<style>
    .sidebar-container {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        width: 200px;
        background: #324157;
    }

    a {
        text-decoration: none;
        text-align:left;
        color:#fff;
    }
    .sidebar-container .el-submenu__title{
     color:#fff;
    }
    h3{
        color:#fff;
        text-indent: 20px;
        margin:0;
        margin-top:20px;
        height:50px;
        line-height: 50px;
    }

</style>
