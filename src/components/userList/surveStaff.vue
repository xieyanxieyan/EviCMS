<template>
    <div class="survestaff">
        <div class="top">
            <span style="border-left:2px solid #324157;padding-left:15px;">公测员管理</span>
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="手机号或名称:">
                    <el-input v-model="formInline.user" placeholder="审批人" size="small"></el-input>
                </el-form-item>
                <el-form-item label="状态" label-width="100">
                    <el-select v-model="formInline.region" size="small" style="width:100px;">
                        <el-option label="已过期" value="1"></el-option>
                        <el-option label="未注册" value="2"></el-option>
                        <el-option label="已注册" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button style="background:#999999;color:#fff">搜索</el-button>
                   <span>|</span>
                    <el-button type="primary" @click="isVisible=true" v-bind:class="{hide:addButton}">添加</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="container">
            <table cellpadding="0" cellspacing="0" border="0" width="100%">
                <thead>
                <tr>
                    <th>手机号</th>
                    <th>公测员名称</th>
                    <th>推荐人名称</th>
                    <th>到期时间</th>
                    <th>赠送余额</th>
                    <th>状态</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in manageDate">
                    <td>{{item.user.cell_phone}}</td>
                    <td>{{item.id}}</td>
                    <td>{{item.recommend_user}}</td>
                    <td>{{item.expire_time}}</td>
                    <td>{{item.complimentary}}</td>
                    <td>{{item.user.status}}</td>
                    <td><span style="margin-right:20px;border:1px solid #437DFF;color:#437DFF;" v-bind:class = "{hide: editButton}"
                              @click="edit(index)">编辑</span>
                        <span style="border:1px solid;color: #ff4949;" @click="deletestaff" v-bind:class = "{hide: deleButton}">删除</span>
                    </td>
                </tr>
                </tbody>
            </table>
            <!--分页-->
            <div class="pagination">
                <el-pagination
                    layout="prev, pager, next,total"
                    :total="total"
                    :page-size="size"
                    :current-page.sync="currentPage"
                    @current-change="handleCurrentChange()"
                >
                </el-pagination>
            </div>
        </div>
        <!--添加公测员弹窗-->
        <el-dialog title="添加公测员" :visible.sync='isVisible'>
            <el-form :label-position="labelPosition" label-width="100px" :model="form">
                <el-form-item label="公测员名称：">
                    <el-input v-model="form.surveerName"></el-input>
                </el-form-item>
                <el-form-item label="推荐人名称：">
                    <el-input v-model="form.surveerReferral"></el-input>
                </el-form-item>
                <el-form-item label="密码：">
                    <el-input v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item label="手机号：">
                    <el-col :span="6">
                        <el-select v-model="form.region">
                            <el-option label="(+86)" value="(+86)"></el-option>
                            <el-option label="(+85)" value="(+85)"></el-option>
                        </el-select>
                    </el-col>
                    <!--<el-col :span="2"> </el-col>-->
                    <el-col :span="18">
                        <el-input v-model="form.phoneNum"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="赠送余额：">
                    <el-input v-model="form.vacancies"></el-input>
                </el-form-item>
                <el-form-item label="到期时间：">
                    <el-input v-model="form.duetime"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"
                               size="small"
                               @click="addSubmit">提交
                    </el-button>
                    <el-button @click="isVisible = false"
                               size="small">取消
                    </el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!--编辑公测员弹窗-->
        <el-dialog title="编辑公测员" :visible.sync='iseditVisible'>
            <el-form :label-position="labelPosition" label-width="100px" :model="form">
                <el-form-item label="公测员名称：">
                    <el-input v-model="formEdit.surveerName"></el-input>
                </el-form-item>
                <el-form-item label="推荐人名称：">
                    <el-input v-model="formEdit.surveerReferral"></el-input>
                </el-form-item>
                <el-form-item label="密码：">
                    <el-input v-model="formEdit.password"></el-input>
                </el-form-item>
                <el-form-item label="手机号：">
                    <el-col :span="6">
                        <el-select v-model="formEdit.region">
                            <el-option label="(+86)" value="(+86)"></el-option>
                            <el-option label="(+85)" value="(+85)"></el-option>
                        </el-select>
                    </el-col>
                    <!--<el-col :span="2"> </el-col>-->
                    <el-col :span="18">
                        <el-input v-model="formEdit.phoneNum"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="赠送余额：">
                    <el-input v-model="formEdit.vacancies"></el-input>
                </el-form-item>
                <el-form-item label="到期时间：">
                    <el-input v-model="formEdit.expireTime"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="updateSubmit()">提交</el-button>
                    <el-button @click="iseditVisible = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

    </div>
</template>
<script>
    //    import {addetaUser} from '../../api/User';
    import {addetaUser, getBetaList, betaUpdate} from '../../api/User';
    import {contains} from '../../assets/public';
    export default {
        created() {
            this._surveStaffList();
        },
        data() {
            return {
                total: 0,
                currentPage: 1,
                iseditVisible: false,
                labelPosition: 'left',
                isVisible: false,
                size: 15, // 页面显示大小
                editButton: false, // 显示隐藏编辑按钮
                deleButton: false, // 显示隐藏删除按钮
                addButton: false, // 显示隐藏添加按钮
                List: false, // 显示隐藏列表
                formInline: {
                    user: '',
                    region: ''
                },
                form: {
                    surveerName: '',
                    surveerReferral: '',
                    phoneNum: '',
                    vacancies: '',
                    duetime: '',
                    password: ''
                },
                formEdit: {
                    surveerName: '',
                    surveerReferral: '',
                    phoneNum: '',
                    vacancies: '',
                    expireTime: '',
                    password: ''
                },
                currentIndex: 0,
                manageDate: []
            };
        },
        methods: {
//            删除公测员
            deletestaff() {
                this.$confirm('确定删除吗，删除后不可恢复！', '', {
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
            },
//            公测用户列表
            _surveStaffList() {
                getBetaList(this.formInline.user, this.size, this.currentPage).then(res => {
                    this.manageDate = res.data.data.data || [];
                    this.total = res.data.data.total;
                });
            },
//            公测用户添加
            addSubmit() {
                addetaUser(this.form.phoneNum, this.form.password, this.form.vacancies, this.form.duetime, this.form.surveerReferral).then(res => {
                    console.log(res);
                    if (res.data.error === 0) {
                        this.isVisible = false;
                        alert('成功');
                        this.form.surveerName = '';
                        this.form.surveerReferral = '';
                        this.form.phoneNum = '';
                        this.form.vacancies = '';
                        this.form.duetime = '';
                        this.form.password = '';
                    }
                });
            },
            edit(index) {
                this.iseditVisible = true;
                this.formEdit.phoneNum = this.manageDate[index].user.cell_phone;
                this.formEdit.password = this.manageDate[index].id;
                this.formEdit.expireTime = this.manageDate[index].expire_time;
                this.formEdit.surveerReferral = this.manageDate[index].recommend_user;
            },
//            公测员编辑

            updateSubmit() {
                betaUpdate(this.formEdit.phoneNum, this.formEdit.password, this.formEdit.vacancies, this.formEdit.duetime, this.formEdit.surveerReferral).then(res => {
                    console.log(res);
                    if (res.data.error === 0) {
                        this.$message({
                            type: 'warning',
                            message: '成功啦',
                            showClose: true,
                            duration: 3000
                        });
                        this.iseditVisible = false;
                    }
                });
            },
//            分页功能
            handleCurrentChange() {
                console.log('分页');
            },
            // 权限控制
            controlPermission() {
                this.edit = !contains('user_beta_update'); // 是否有编辑权限
                this.dele = !contains('user_beta_delete'); // 是否有删除权限
                this.add = !contains('user_beta_add'); // 是否有添加权限
                this.List = !contains('user_beta_list');  // 是否显示公测员列表
            }
        }
    };
</script>
<style lang="scss" type="text/scss">
    .survestaff {
        padding: 0 15px;
        .hide{
            display:none;
        }
        .top {
            .el-form {
                margin: 0;
                float: right;
                .el-form-item {
                    margin-bottom: 0px;
                    .el-button{
                        padding:6px 15px;
                    }
                }
                input {
                    outline: none;
                }
            }
        }

        .container {
            width: 100%;
            th {
                background: #556386;
                color: #fff;
            }
            th, td {
                text-align: center;
                height: 40px;
                line-height: 40px;
                font-size: 14px;
                border-bottom: 1px solid #eee;
                span {
                    cursor: pointer;
                    padding: 3px 6px;
                }
            }
        }
        .pagination {
            text-align: center;
            margin: 15px 0;
            .el-pagination {
                display: inline-block;
            }
        }
        .top {
            margin: 0;
            padding: 15px 0;
        }
        .el-dialog {
            width: 500px;
            .el-dialog__title {
                color: #fff;
            }
            .el-dialog__header {
                text-align: center;
                background: #556386;
                padding: 10px 20px;
            }
        }
    }
</style>
