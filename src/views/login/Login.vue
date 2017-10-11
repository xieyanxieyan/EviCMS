<template>
    <div class="login-content">
        <el-form ref="form">
            <el-form-item>
                <div class="CMStitle">证宝宝管理系统</div>
            </el-form-item>
            <el-form-item prop="username">
                <el-input name="username"
                          type="text"
                          autoComplete="off"
                          :maxlength="11"
                          placeholder="用户名">
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password"
                          autoComplete="off"
                          name="password"
                          placeholder="密码">

                </el-input>
            </el-form-item>
            <el-form-item prop="verify_code">
                <el-col :span="16">
                    <div class="grid-content bg-purple ">
                        <el-input
                            type="text"
                            name="verify_code"
                            :maxlength="4"
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
                        <el-button type="primary" class="big">登录</el-button>
                    </div>
                </el-col>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default{
};
</script>
<style>
    .login-content {
        width: 300px;
        padding: 20px;
        height:270px;
        position:absolute;
        top:0;
        bottom:0;
        left:0;
        right:0;
        background:#fff;
        margin:auto;
        box-shadow: 0 0 8px -2px rgba(0,0,0,.2);
        background: #fff;
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
</style>
