<template>
    <div id="adminManage">
        <div class="adminManageTop">
            <span>管理员管理</span>
        </div>
        <div class="adminSelect">
            <el-button size="small"  v-bind:class ="{hide:addManage}">
                <span @click="addAdmin">添加管理员</span>
            </el-button>
            <el-button size="small"  v-bind:class="{hide:userSet}">
                <router-link to="/userSet" style="color:#333;">角色设置</router-link>
            </el-button>
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="账号或姓名:">
                    <el-input v-model="formInline.user" size="small" @keyup.enter.native="_userList"></el-input>
                </el-form-item>
                <el-form-item label="统计时间" label-width="100">
                    <el-col :span="10">
                        <!--<el-input type="text" placeholder="2017-09-04 01:43:13"-->
                        <template>
                            <el-date-picker
                                v-model="formInline.time_begin"
                                type="datetime"
                                size="small"
                                placeholder="选择开始日期时间">
                            </el-date-picker>
                        </template><!--v-model=""></el-input>-->
                    </el-col>
                    <el-col :span="4">至</el-col>
                    <el-col :span="10">
                        <!--<el-input type="text" placeholder="2017-09-04 01:43:13"-->
                        <!--v-model="formInline.time_end"></el-input>-->
                        <template>
                            <el-date-picker
                                v-model="formInline.time_end"
                                type="datetime"
                                size="small"
                                placeholder="选择结束日期时间">
                            </el-date-picker>
                        </template>
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
                <tbody v-bind:class="{hide:adminList}">
                <tr v-for="(item,index) in adminMessage">
                    <td>{{item.admin_id}}</td>
                    <td>{{item.username}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.created_at}}</td>
                    <td>
                        <template v-if="item.status === 1">
                            正常
                        </template>
                        <template v-else-if="item.status === 2">
                            <b class="isred">已冻结</b>
                        </template>
                    </td>
                    <td>{{item.role_detail.name}}</td>
                    <td><span @click="editMessage(index)" class="bluebutton" v-bind:class="{hide:adminEdit}">编辑</span>
                        <template v-if="item.status === 1">
                                <span @click="frozen(index)" class="redbutton">
                                      冻结
                                </span>
                        </template>
                        <template v-else="item.status === 2">
                            <span class="greenbutton" @click="frozen(index)">解冻</span>
                        </template>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <!--分页-->
        <div class="pagination"  :class="{hide:adminList}" v-if="total > 15">
            <el-pagination
                layout="prev, pager, next,total"
                :total= "total"
                :page-size="perpage"
                :current-page.sync="currentPage"
                @current-change="handleCurrentChange()"
            >
            </el-pagination>
        </div>
    </div>
</template>
<script>
    import {getAdminList, frezeAdmin} from '../../api/setuser';
    import {formatDate, contains} from '../../assets/public';

    export default {
        created() {
            this._userList();
            this.permissionControl();
            console.log('当前的用户', this.addmin_current);
        },
        data() {
            return {
                addmin_current: Number(localStorage.admin_id),
                addManage: false, // 添加管理员权限
                userSet: false, // 管理员角色设置
                adminList: false, // 管理员列表是否显示
                adminEdit: false, // 管理员编辑权限
                adminFrozen: false, // 管理员冻结权限
                total: 0,
                perpage: 15,
                currentPage: 1,
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
                getAdminList(this.formInline.user, formatDate(this.formInline.time_begin), formatDate(this.formInline.time_end), this.perpage, this.currentPage).then(res => {
                    this.adminMessage = res.data.data.data;
                    console.log(this.adminMessage);
                   this.total = res.data.data.total;
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
            // 冻结状态
            frozenStatus(index, status) {
                frezeAdmin(this.adminMessage[index].admin_id, status).then(res => {
                    if (res.data.error === 0) {
                        this._userList();
                    }
                });
            },
            // 处理分页
            handleCurrentChange() {
                this._userList();
            },
            // 点击冻结
            frozen(index) {
                if (this.adminMessage[index].status === 1) {
                    if (this.adminMessage[index].admin_id === this.addmin_current) {
                        console.log('不能冻结自己');
                        this.$message({
                                message: '您是当前管理员，不能冻结自己',
                                type: 'warning',
                                showClose: true
                            });
                    } else {
                    this.frozenStatus(index, 2);
                    console.log('冻结');
                    }
                } else if (this.adminMessage[index].status === 2) {
                    this.frozenStatus(index, 1);
                    console.log('没有冻结');
                }
            },
            // 权限控制函数
            permissionControl() {
                this.addManage = !contains('admin_add'); // 添加管理员
                this.userSet = !contains('admin_roles_list'); // 管理员角色设置
                this.adminList = !contains('admin_list'); // 管理员列表显示
                this.adminEdit = !contains('admin_update'); // 管理员列表编辑权限
                this.adminFrozen = !contains('admin_freeze'); // 管理员列表冻结权限
            }
        }
    };
</script>
<style lang="scss">
    @import '../../style/common.scss';
    @import '../../scss/mixin.scss';
    #adminManage {
        padding: 0 15px;
.pagination{text-align:center;}
    .adminSelect {
        margin-bottom: 10px;
    }

    .adminManageTop {
        padding: 15px 0;

    span {
       @include span;
    }

    }
    table {
        table-layout: fixed;

    td {
        border-bottom: 1px solid #eee;
    }

    }
    table tr td span {
        border: 1px solid;
        cursor: pointer;
        font-size: 14px;
        padding: 2px 5px;
        border-radius: 5px;
    }

    table tr td > span:nth-child(1) {
        color: #20a0ff
    }

    table span:nth-child(1) {
        margin-right: 10px;
    }

    table .redbutton {
        color: #ff4949;
    }

    table .greenbutton {
        color: #4cce6d;
    }

    table .isred {
        color: #ff4d51;
    }

    .el-form {
        margin: 0;
        float: right;

    .el-date-editor--datetime {
        width: 180px;
    }

    .el-form-item {
        margin-bottom: 0px;

    &:last-child {
        margin-left: 20px;
    }

    .el-col-4 {
        text-align: right;
        padding-right: 20px;
    }

    }

    .el-input__inner {
        display: inline-block;
        width: inherit;
        height: 30px;
    }

    input {
        outline: none;
    }

    .el-button {
        padding: 5px 15px;
    }

    input {
        width: 150px;
    }

    }
    }
</style>
