<template>
    <div id="adminManage">
        <div class="adminManageTop">
            <span>管理员管理</span>
        </div>
        <div class="adminSelect">
            <el-button>
                <router-link to="/addManage" style="color:#333">添加管理员</router-link>
            </el-button>
            <el-button>
                <router-link to="/userSet" style="color:#333;">角色设置</router-link>
            </el-button>
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="账号或姓名:">
                    <el-input v-model="formInline.user" placeholder="审批人" size="small"></el-input>
                </el-form-item>
                <el-form-item label="统计时间" label-width="100">
                    <input type="text">至 <input type="text">
                </el-form-item>
                <el-form-item>
                    <el-button style="background:#999999;color:#fff">查询</el-button>
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
                    <td><span>编辑</span><span>冻结</span></td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>

</template>
<script>
    import {getAdminList} from '../../api/setuser';

    export default {
        created() {
            this._userList();
        },
        data() {
            return {
                formInline: {
                    user: '',
                    region: ''
                },
                adminMessage: []
            };
        },
        methods: {
//            获取管理员列表
            _userList() {
                getAdminList('admin', '2017-10-20 08:00:00', '2017-10-20 18:00:00').then(res => {
                   this.adminMessage = res.data.data.data;
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
    .el-form {
        margin: 0;
        float: right;

    .el-form-item {
        margin-bottom: 0px;
    }

    .el-input__inner {
        border-radius: 0;
    }

    input {
        outline: none;
    }

    .el-button {
        border-radius: 0;
        padding: 5px 15px;
    }

    input {
        border-radius: 0;
        width: 150px;
    }

    }
    }
</style>
