<!--用户详情-->
<template>
    <div id="userDetail">
        <div class="userDetaiTop">
            <div class="top">
                <span> 用户列表---用户详情</span>
            </div>
        </div>
        <div class="container">
            <div class="userMessage">
                <span>
                    <strong>用户序号：</strong>
                    <small v-if="userdetails.user">{{userdetails.user.user_id}}</small>
                </span>
                <span>
                    <strong>注册时间：</strong>
                    <small v-if="userdetails.user">{{userdetails.user.reg_time}}</small>
                </span>
                <span>
                    <strong>充值余额（元）：</strong>
                    <small>{{userdetails.cash}}</small>
                </span>
                <span>
                    <strong>储存空间（KB）：</strong>
                <small style="margin-right:20px;">{{userdetails.totalStore}}</small>
                <small>剩余({{userdetails.restStore}})</small>
                    </span>
            </div>
            <div class="fromcon">
                <el-form ref="form" :model="form" :rules="rules" label-width="120px">
                    <el-form-item label="手机号：" @keyup.enter.native="handleLogin" :maxlength="11" prop="name">
                        <el-col :span="8">
                            <el-select v-model="form.phone" placeholder="(+86)" :disabled="isUsed">
                                <el-option label="(+86)" value="(+86)" selected style="width:100%">(+86)</el-option>
                                <el-option label="(+85)" value="(+85)" style="width:100%">(+85)</el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="16">
                            <el-input v-model="form.name" :disabled="isUsed"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="密码:">
                        <el-input v-model="form.region" type="password" :disabled="isUsed" placeholder="不修改则留空"></el-input>
                    </el-form-item>
                    <el-form-item label="赠送余额（元）:">
                        <el-input v-model="form.type" :disabled="isUsed"></el-input>
                    </el-form-item>
                    <el-form-item label="修改原因：" prop="reason">
                        <el-input v-model="form.reason" :disabled="isUsed"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="handle">{{operate}}</el-button>
                        <el-button @click="back">返回</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
    import {editUser, userDetail} from '../../../api/User';
    import {isValidMobile} from '../../../common/js/validate';
    const checkphone = (rule, value, callback) => {
        if (!value) {
            callback(new Error('手机号不能为空'));
        } else if (!isValidMobile(value)) {
            callback(new Error('手机号格式错误'));
        } else {
            callback();
        }
    };
    const checkreason = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('原因必填'));
        } else {
            callback();
        }
    };
    export default {
        created() {
            this._userMessage();
        },
        data() {
            return {
                operate: '修改',
                labelPosition: 'right',
                isUsed: true,
                rules: {
                    name: [{validator: checkphone, trigger: 'blur'}],
                    reason: [{validator: checkreason, trigger: 'blur'}]
                },
                form: {
                    name: '',
                    region: '',
                    type: '',
                    phone: '',
                    reason: ''
                },
                userdetails: {}
            };
        },
        methods: {
            editSubmit() {
                if (this.isUsed) {
                    this.isUsed = false;
                    this.operate = '保存';
                } else {
                    this.save();
                }
            },
            save() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        editUser(this.$route.params.detailId, this.form.name, this.form.region || 0, this.form.type, this.form.reason).then(res => {
//                    console.log(res);
                            if (res.data.error === 0) {
                                alert('成功');
                                this.form.name = '';
                                this.form.region = '';
                                this.form.type = '';
                                this.form.phone = '';
                                this.form.reason = '';
                            } else {
                                this.$message({
                                    message: res.data.data,
                                    type: 'error',
                                    showClose: true
                                });
                            }
                        });
                    } else {
                       // console.log('error submit!!');
                        return false;
                    }
                });
            },
            _userMessage() {
                userDetail(this.$route.params.detailId).then(res => {
                    let detail = res.data.data;
                    this.userdetails = detail || [];
                    this.isUsed = false;
                    this.form.name = detail.user.cell_phone;
                    this.form.type = detail.gift_cash;
                    this.isUsed = true;
                });
            },
            handle() {
                if (this.operate === '修改') {
                    this.editSubmit();
                } else {
//                    console.log(this.form.name);
                    this.save();
                }
            },
            back() {
                this.$router.go(-1);
            }
        }
    };
</script>
<style lang="scss" type="text/scss">
    @import '../../../scss/mixin.scss';

    #userDetail {
        padding: 0 15px;
        .top {
            padding: 15px 0;
            span {
               @include span;
            }
        }
        .fromcon{
            display:flex;
            display:-webkit-flex;
            justify-content: center;
            -webkit-justify-content: center;
            align-items: center;
            -webkit-align-items: center;
            min-height: calc( 100vh - 190px);
            .el-form-item {
                position: relative;
            }
            .el-form-item:last-child{
                margin-bottom:0;
            }

            .el-form-item__label {
                text-align: left
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
                @include dotted(#eb5d41);
            }
            .el-button {
                border-radius: 0;
                padding: 10px 50px;
            }

            .el-input__inner {
                border-radius: 0;
            }
        }
        .userMessage {
            padding: 0 15px;
            border-bottom: 1px solid #eee;
            span {
                display: inline-block;
                margin: 20px 0;
                padding: 0 50px;
                border-right: 1px solid #eee;
                &:last-child {
                    border: 0;
                }
            }

        }
        .container {
            background: #fff;
            min-height: calc(100vh - 110px);
            position: relative;
            .el-form {
                width: 400px;
            }
        }
    }

</style>
