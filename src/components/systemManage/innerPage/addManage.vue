<!--添加管理员-->
<template>
    <div class="addadmin-wrapper">
        <div>
            <div class="top">
                <span>管理员管理--添加管理员</span>
            </div>
        </div>
        <div class="container">
            <el-form ref="form" :label-position="labelPosition" :model="form" label-width="120px">
                <el-form-item label="管理员账号：">
                    <el-input v-model="form.account"></el-input>
                </el-form-item>
                <el-form-item label="管理员姓名:">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="登录密码:">

                    <el-input v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item label="手机号:"
                              :maxlength="11">
                    <el-input v-model="form.phone"></el-input>
                </el-form-item>
                <el-form-item label="管理员角色:">
                    <el-col :span="12">
                        <el-select v-model="id" placeholder="请选择">
                            <el-option
                                v-for="item in form.options"
                                :key="item.id"
                                :label="item.name"
                                autocomplete="off"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="6">&nbsp;</el-col>
                    <el-col :span="4">
                        <el-button type="warning" style="margin-left:-20px;" @click="addAdminSubmit">提交</el-button>
                    </el-col>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
    import {addAdmin, getRole} from '../../../api/setuser';

    export default {
        created() {
            this._getOptions();
        },
        data() {
            return {
                labelPosition: 'left',
                id: '',
                form: {
                    account: '',
                    name: '',
                    password: '',
                    phone: '',
                    options: []
                }
            };
        },
        methods: {
//            添加管理员
            addAdminSubmit() {
                let form = this.form;
                addAdmin(form.account, form.name, form.password, form.phone, this.id).then(res => {
                    if (res.data.error === 0) {
                        this.$message({
                            type: 'warning',
                            message: '添加管理员成功',
                            showClose: true,
                            duration: 2000
                        });
                        this.form.account = '';
                        this.form.name = '';
                        this.form.password = '';
                        this.form.phone = '';
                    } else {
                        this.$message({
                            type: 'warning',
                            message: '添加管理员失败了',
                            showClose: true,
                            duration: 2000
                        });
                    }
                });
            },
//            获取角色信息
            _getOptions() {
                getRole().then(res => {
                    res = res.data;
                    this.form.options = res.data;
                });
            }
        }
    };
</script>
<style lang="scss" scoped>
    @import '../../../scss/mixin.scss';

    .addadmin-wrapper {
        padding: 0 15px;

    .el-form-item {
        position: relative;
    }

    .el-form-item__label {
        text-align: left
    }

    .top {
        padding: 15px 0;

    span {
        border-left: 2px solid #324157;
        padding-left: 5px;
    }

    }
    .el-form-item:nth-child(1)::before {
    @include dotted(#437DFF);
    }

    .el-form-item:nth-child(2)::before {
    @include dotted(#5ED27C);
    }

    .el-form-item:nth-child(3)::before {
    @include dotted(#F5CF68);
    }

    .el-form-item:nth-child(4)::before {
    @include dotted(#EB5F43);
    }

    .el-form-item:nth-child(5)::before {
    @include dotted(#6243FF);
    }

    .el-button {
        border-radius: 0;
        padding: 10px 30px;
    }

    .el-input__inner {
        border-radius: 0;
    }

    .addUser-wrapper {
        position: fixed;
        top: 40px;
        left: 230px;
        right: 25px;
        bottom: 25px;
        background: #fff;
    }

    .el-form {
        width: 400px;
    }

    .container {
        background: #fff;
        min-height: calc(100vh - 120px);
        overflow: hidden;

    }

    .container .el-form {
        margin: 0 auto;
        margin-top: 100px;
    }

    }

</style>
