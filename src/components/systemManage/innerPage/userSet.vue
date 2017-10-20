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
                        <span @click="duerdel">{{item.operation.del}}</span>
                    </td>
                </tr>
                </tbody>
            </table>
            <el-button type="primary" @click="adduserVisible=true" style="float:right">添加角色</el-button>
           </div>
        </div>
        <!--添加角色-->
        <el-dialog :visible.sync="adduserVisible" title="添加角色" class="adduserForm">
            <el-form :model="adduserForm">
                <el-form-item  label="角色名称：" label-width="100px">
                <el-input v-model="adduserForm.username"></el-input>
                </el-form-item>
                <el-form-item  label="角色名称：" label-width="100px">
                    <el-input v-model="adduserForm.username"></el-input>
                </el-form-item>
                <el-form-item style="display:flex;justify-content: space-around">
                    <el-button type="primary" @click="adduserVisible=false">确定</el-button>
                    <el-button  @click="adduserVisible=false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
    import {getUserList, addUser} from '../../../api/setuser';
    export default {
        created() {
           getUserList().then((res) => {
             console.log(res);
           });
            addUser('admin').then((res) => {
                console.log(res);
            });
        },
        data () {
            return {
                adduserVisible: false,
                adduserForm: {
                    username: ''
                },
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
        },
        methods: {
            duerdel() {
                this.$confirm('确定删除吗?删除后该角色下的用户将失去所有权限', '', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功！'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
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
    .adduserForm{
        width:800px;
        margin:100px auto;
        .el-dialog__header{
            padding:10px;
            text-align: center;
            background: #556386;
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
        color:#333;
    }
    th,td{
        padding:5px 0;
        text-align: center;
    }
    td span{
        border:1px solid;
        color:#99B4FF;
        margin:0 10px;
        cursor:pointer;
    }
    td{
        border:1px solid #eee;
    }
    }

    }
    }
    }
</style>
