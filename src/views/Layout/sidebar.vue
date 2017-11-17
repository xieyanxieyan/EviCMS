<template>
    <div class="sidebar-container">
        <h3>证宝宝管理系统</h3>
        <el-menu default-active="2"
                 class="el-menu-vertical-demo"
                 @open="handleOpen"
                 @close="handleClose"
                 theme="dark"
                 v-for="(item,key,index) in this.options">
            <el-submenu index="">
                <template slot="title">
                    {{key}}
                </template>
                <el-menu-item-group v-for="(list,index) in item" :key="list.id" :label="list">
                    <el-menu-item index="">
                        <router-link :to='list.url'>{{list.name}}</router-link>
                    </el-menu-item>
                    <!--<el-menu-item index="'index'-'ind'">-->
                    <!--<router-link to="/survestaff">公测员管理</router-link>-->
                    <!--</el-menu-item>-->
                </el-menu-item-group>
            </el-submenu>
            <!--<el-submenu index="2">-->
            <!--<template slot="title">-->
            <!--运营管理-->
            <!--</template>-->
            <!--<el-menu-item-group>-->
            <!--<el-menu-item index="2-1">-->
            <!--<router-link to="/compManage">投诉建议管理</router-link>-->
            <!--</el-menu-item>-->
            <!--<el-menu-item index="2-2">-->
            <!--<router-link to="/refund">退款处理</router-link>-->
            <!--</el-menu-item>-->
            <!--<el-menu-item index="2-3">-->
            <!--<router-link to="/HisManage">出证管理</router-link>-->
            <!--</el-menu-item>-->
            <!--<el-menu-item index="2-4">-->
            <!--<router-link to="/TrialManage">出庭管理</router-link>-->
            <!--</el-menu-item>-->
            <!--</el-menu-item-group>-->
            <!--</el-submenu>-->
            <!--<el-submenu index="3">-->
            <!--<template slot="title">-->
            <!--数据分析-->
            <!--</template>-->
            <!--<el-menu-item-group>-->
            <!--<el-menu-item index="3-1">-->
            <!--<router-link to="/userData">用户数据</router-link>-->
            <!--</el-menu-item>-->
            <!--<el-menu-item index="3-2">-->
            <!--<router-link to="/behaviourData">行为数据</router-link>-->
            <!--</el-menu-item>-->
            <!--<el-menu-item index="3-3">-->
            <!--<router-link to="/tradeData">交易统计</router-link>-->
            <!--</el-menu-item>-->
            <!--</el-menu-item-group>-->
            <!--</el-submenu>-->
            <!--<el-submenu index="4">-->
            <!--<template slot="title">-->
            <!--系统管理-->
            <!--</template>-->
            <!--<el-menu-item-group>-->
            <!--<el-menu-item index="4-1">-->
            <!--<router-link to="/adminManage">管理员设置</router-link>-->
            <!--</el-menu-item>-->
            <!--<el-menu-item index="4-2">-->
            <!--<router-link to="/operationLog">操作日志</router-link>-->
            <!--</el-menu-item>-->
            <!--<el-menu-item index="4-3">-->
            <!--<router-link to="/keyManage">密钥管理</router-link>-->
            <!--</el-menu-item>-->
            <!--</el-menu-item-group>-->
            <!--</el-submenu>-->
            <!--<el-submenu index="5">-->
            <!--<template slot="title">-->
            <!--其他管理-->
            <!--</template>-->
            <!--<el-menu-item index="5-1">-->
            <!--<router-link to="/rightAllotment">权限分配</router-link>-->
            <!--</el-menu-item>-->
            <!--<el-menu-item index="5-2">-->
            <!--<router-link to="/menulist">菜单管理</router-link>-->
            <!--</el-menu-item>-->
            <!--</el-submenu>-->
        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                index: 0,
                options: {
                    '用户管理':
                        [
                            {
                                name: '用户列表',
                                url: '/userlist'
                            },
                            {
                                name: '公测员列表',
                                url: '/survestaff'
                            }
                        ],
                    '运营管理':
                        [
                            {
                                name: '投诉建议管理',
                                url: '/compManage'
                            },
                            {
                                name: '退款处理',
                                url: '/refund'
                            },
                            {
                                name: '出证管理',
                                url: '/HisManage'
                            },
                            {
                                name: '出庭管理',
                                url: '/TrialManage'
                            }
                        ],
                    '数据分析': [
                        {
                            name: '用户数据',
                            url: '/userData'
                        },
                        {
                            name: '行为数据',
                            url: '/userData'
                        },
                        {
                            name: '交易统计',
                            url: '/tradeData'
                        }
                    ],
                    '系统管理': [
                        {
                            name: '管理员设置',
                            url: '/adminManage'
                        },
                        {
                            name: '操作日志',
                            url: '/operationLog'
                        },
                        {
                            name: '密钥管理',
                            url: '/keyManage'
                        }
                    ],
                    '其他管理': [
                        {
                            name: '权限分配',
                            url: '/rightAllotment'
                        },
                        {
                            name: '菜单管理',
                            url: '/menulist'
                        }
                    ]
                }
            };
        },
        methods: {
            handleOpen(key, keyPath) {
//                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
//                console.log(key, keyPath);
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
        text-align: left;
        color: #fff;
    }

    .sidebar-container .el-submenu__title {
        color: #fff;
    }

    h3 {
        color: #fff;
        text-indent: 20px;
        margin: 0;
        margin-top: 20px;
        height: 50px;
        line-height: 50px;
    }
    .el-menu-item-group__title{
        padding-top:0;
    }

</style>
