<template>
    <div id="userSet">
        <div class="userSetTop">
            <span>管理员设置--角色设置</span>
        </div>
        <div class="userSettable">
           <div class="usertable">
               <table cellspacing="0" cellpadding="0" border="0">
                <thead>
                <tr>
                    <th>角色</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in userMessage">
                    <td style="border-right:0">{{item.admin}}</td>
                    <td style="border-left:0">
                        <span><router-link to="/adminPermission" style="color:#739dff">{{item.operation.Authorization}}</router-link></span>
                        <span>{{item.operation.del}}</span>
                    </td>
                </tr>
                </tbody>
            </table>
            <el-button type="primary" style="float:right">添加角色</el-button>
           </div>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                userMessage: [
                    {
                        admin: '超级管理员',
                        operation: {
                            Authorization: '权限设置',
                            del: '删除'
                        }

                    },
                    {
                        admin: '管理员',
                        operation: {
                            Authorization: '权限设置',
                            del: '删除'
                        }

                    },
                    {
                        admin: '客服',
                        operation: {
                            Authorization: '权限设置',
                            del: '删除'
                        }

                    },
                    {
                        admin: '财务',
                        operation: {
                            Authorization: '权限设置',
                            del: '删除'
                        }

                    }
                ]
            };
        }
    };
</script>
<style lang="scss">
    #userSet {
        padding: 0 15px;

    .userSetTop {
        padding: 15px 0;

    span {
        border-left: 2px solid #324157;
        padding-left: 5px;
    }
    }
    .userSettable{
        background:#fff;
        height:calc( 100vh - 220px);
    padding-top:100px;
    .usertable{
        width:500px;
    margin:0 auto;
    table{
    width:100%;
    margin-bottom:15px;
    th {
        background: #eee;
    }
    th,td{
        padding:5px 0;
        text-align: center;
    }
    td span{
        border:1px solid;
        color:#99B4FF;
        margin:0 10px;
    }
    td{
        border:1px solid #eee;
    }
    }

    }
    }
    }
</style>
