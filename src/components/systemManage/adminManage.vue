<template>
    <div id="adminManage">
        <div class="adminManageTop">
            <span>管理员管理</span>
        </div>
        <div class="adminSelect">
            <el-button>
                <span @click="addAdmin">添加管理员</span>
            </el-button>
            <el-button>
                <router-link to="/userSet" style="color:#333;">角色设置</router-link>
            </el-button>
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="账号或姓名:">
                    <el-input v-model="formInline.user" placeholder="审批人" size="small"></el-input>
                </el-form-item>
                <el-form-item label="统计时间" label-width="100">
                    <el-col :span="10">
                        <el-input type="text" placeholder="2017-09-04 01:43:13"
                                  v-model="formInline.time_begin"></el-input>
                    </el-col>
                    <el-col :span="4">至</el-col>
                    <el-col :span="10">
                        <el-input type="text" placeholder="2017-09-04 01:43:13"
                                  v-model="formInline.time_end"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-button style="background:#999999;color:#fff" @click="_userList">查询</el-button>
                </el-form-item>

            </el-form>
        </div>
        <div>
            <table cellpadding="0" cellspacing="0" border="0">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>管理员账号</th>
                    <th>管理员姓名</th>
                    <th>添加时间</th>
                    <th>状态</th>
                    <th>角色</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in adminMessage">
                    <td>{{item.admin_id}}</td>
                    <td>{{item.username}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.created_at}}</td>
                    <td>正常</td>
                    <td>客服</td>
                    <td><span @click="editMessage(index)" class="bluebutton">编辑</span>
                            <template v-if="item.status === 1">
                                <span  @click="frozen(index)" class="redbutton">
                                      冻结
                                </span>
                            </template>
                            <template v-else="item.status === 2">
                               <span>解冻</span>
                            </template>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
    import {getAdminList, frezeAdmin} from '../../api/setuser';

    export default {
        created() {
            this._userList();
        },
        data() {
            return {
                formInline: {
                    user: '',
                    region: '',
                    time_begin: '',
                    time_end: ''
                },
                adminMessage: []
            };
        },
        methods: {
//            获取管理员列表
            _userList() {
                getAdminList(this.formInline.user, this.formInline.time_begin, this.formInline.time_end).then(res => {
                    this.adminMessage = res.data.data.data;
                });
            },
//            编辑信息
            editMessage(index) {
                this.$router.push({name: 'addManage', params: {userId: this.adminMessage[index].admin_id}});
            },
//            添加信息
            addAdmin() {
                this.$router.push({name: 'addManage', params: {userId: '0'}});
            },
            frozen(index) {
                frezeAdmin(this.adminMessage[index].admin_id, this.adminMessage[index].status).then(res => {
                    if (res.data.error === 0) {
                        console.log(res);
                        this.$message({
                            type: 'warning',
                            message: '冻结成功'
                        });
                    }
                });
            }
        }
    };
</script>
<style lang="scss">
    @import '../../style/common.scss';

    #adminManage {
        padding: 0 15px;

    .adminSelect {
        margin-bottom: 10px;
    }

    .adminManageTop {
        padding: 15px 0;

    span {
        border-left: 2px solid #324157;
        padding-left: 5px;
    }

    }
    table{
        table-layout: fixed;
        td{
            border-bottom:1px solid #eee;

        }
    }
    table tr td span{
        border: 1px solid;
        cursor: pointer;
        font-size:14px;
        padding: 2px 5px;
    }
    table tr td>span:nth-child(1) {
        color:#20a0ff
    }

    table span:nth-child(1) {
        margin-right: 10px;
    }
    table .redbutton{
        color:#ff4949;
    }

    .el-form {
        margin: 0;
        float: right;

    .el-form-item {
        margin-bottom: 0px;

    .el-col-4 {
        text-align: center;
    }

    }

    .el-input__inner {
        border-radius: 0;
        display: inline-block;
        width: inherit;
        height: 30px;
    }

    input {
        outline: none;
    }

    .el-button {
        border-radius: 0;
        padding: 5px 15px;
    }

    .isred {
        color: #4cce6d;
    }

    input {
        border-radius: 0;
        width: 150px;
    }

    }
    }
</style>
