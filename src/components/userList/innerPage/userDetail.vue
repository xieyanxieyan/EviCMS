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
                    <small>{{userdetails.user_id}}</small>
                </span>
                <span>
                    <strong>注册时间：</strong>
                    <small>{{userdetails.reg_time}}</small>
                </span>
                <span>
                    <strong>充值余额（元）：</strong>
                    <small>{{userdetails.due}}</small>
                </span>
                <span>
                    <strong>储存空间（KB）：</strong>
                <small style="margin-right:20px;">{{userdetails.space}}</small>
                <small>剩余({{userdetails.remainspace}})</small>
                    </span>
            </div>
            <div class="fromcon">
                <el-form ref="form" :model="form" label-width="120px">
                    <el-form-item label="手机号：" @keyup.enter.native="handleLogin" :maxlength="11">
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
                        <el-input v-model="form.region" type="password" :disabled="isUsed"></el-input>
                    </el-form-item>
                    <el-form-item label="赠送余额（元）:">
                        <el-input v-model="form.type" :disabled="isUsed"></el-input>
                    </el-form-item>
                    <el-form-item label="修改原因：">
                        <el-input v-model="form.reason" :disabled="isUsed"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="handle">{{operate}}</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
    import {editUser, userDetail} from '../../../api/User';

    export default {
        created() {
            this._userMessage();
        },
        data() {
            return {
                operate: '修改',
                labelPosition: 'right',
                isUsed: true,
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
                editUser(this.$route.params.detailId, this.form.name, this.form.region, this.form.type, this.form.reason).then(res => {
//                    console.log(res);
                    if (res.data.error === 0) {
                        alert('成功');
                        this.form.name = '';
                        this.form.region = '';
                        this.form.type = '';
                        this.form.phone = '';
                        this.form.reason = '';
                    }
                });
            },
            _userMessage() {
                userDetail(this.$route.params.detailId).then(res => {
                    this.userdetails = res.data.data;
                });
            },
            handle() {
                if (this.operate === '修改') {
                    this.editSubmit();
                } else {
                    console.log(this.form.name);
                    this.save();
                }
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
                border-left: 2px solid #324157;
                padding-left: 5px;
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
