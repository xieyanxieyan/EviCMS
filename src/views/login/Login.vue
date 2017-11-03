<template>
    <div class="login-wrapper">
        <div class="login-content">
            <el-form ref="form" :model="form" :rules="rules">
                <el-form-item>
                    <div class="CMStitle">证宝宝管理系统</div>
                </el-form-item>
                <el-form-item prop="username"
                :error="loginError.username">
                    <el-input name="username"
                              type="text"
                              v-model="form.username"
                              autoComplete="off"
                              :maxlength="11"
                              placeholder="用户名">
                    </el-input>
                </el-form-item>
                <el-form-item prop="password"
                :error="loginError.password">
                    <el-input type="password"
                              v-model="form.password"
                              autoComplete="off"
                              name="password"
                              placeholder="密码">

                    </el-input>
                </el-form-item>
                <el-form-item >
                    <el-col :span="16">
                        <div class="grid-content bg-purple ">
                            <el-input
                                type="text"
                                name="verify_code"
                                auto-complete="off"
                                v-model="form.verify_code"
                                placeholder="手机验证码">
                            </el-input>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <el-button type="primary" class="get-code">获取验证码</el-button>
                        </div>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-col :span="24">
                        <div class="grid-content bg-purple">
                            <el-button type="primary" :loading="loginLoading" @click="login()" class="big">登录</el-button>
                        </div>
                    </el-col>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'login',
        data() {
            const checkname = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('用户名不能为空'));
                } else {
                    callback();
                }
            };
            const validatepass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('密码不能为空'));
                } else {
                    callback();
                }
            };
//            const checkcode = (rule, value, callback) => {
//                if (!value) {
//                    callback(new Error('请输入验证码'));
//                    } else {
//                    if (this.verify_code !== '') {
//                        this.$refs.form.validateField('verify_code');
//                    }
//                    callback();
//                }
//            };
            return {
                loginLoading: false,
                form: {
                    username: '',
                    password: '',
                    verify_code: ''
                },
                loginError: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [{validator: checkname, trigger: 'blur'}],
                    password: [{validator: validatepass, trigger: 'blur'}]
//                    verify_code: [{validator: checkcode, trigger: 'blur'}]
                }
            };
        },
        methods: {
            login() {
                    this.$refs['form'].validate((valid) => {
                        if (valid) {
                            this.loginError.username = '';
                            this.loginError.password = '';
                            this.loginLoading = true;
                            this.$store.dispatch('adminLogin', this.form).then((res) => {
                                this.loginLoading = false;
                                switch (res) {
                                    case 0:
                                        this.$router.push({path: '/'});
                                        break;
                                    case 100001:
                                        this.loginError.username = '管理员不存在，请联系超管添加';
                                            break;
                                    case 100002:
                                        this.$message({
                                            message: '该账号已被冻结，不能登录',
                                            type: 'error',
                                            showClose: true
                                        });
                                        break;
                                    case 100003:
                                        this.$message({
                                            message: '登陆失败，检查用户名和密码是否正确',
                                            type: 'error',
                                            showClose: true
                                        });
                                        break;
                                }

                                console.log(res);
                            }).catch(err => {
                                this.$message.error(err);
                            });
                        } else {
                            console.log('error submit!!');
                            return false;
                        }
                    });
            }
        }
    };
</script>
<style lang="scss">
    .login-wrapper {
        background: #fff;
        width: 100vw;
        height: 100vh;

    .login-content {
        width: 300px;
        padding: 20px;
        height: 270px;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: #fff;
        margin: auto;
        box-shadow: 0 0 8px -2px rgba(0, 0, 0, .2);
    }

    .CMStitle {
        font-size: 1.5rem;
    }

    .big {
        display: block;
        width: 100%;
    }

    .get-code {
        border-radius: 0 4px 4px 0;
    }

    .bg-purple .el-input__inner {
        border-radius: 4px 0 0 4px;
    }

    }

</style>
