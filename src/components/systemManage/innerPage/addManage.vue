<!--添加管理员-->
<template>
    <div class="addUser-wrapper">
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
                <el-form-item label="手机号:">
                    <el-input v-model="form.phone"></el-input>
                </el-form-item>
                <el-form-item label="管理员角色:">
                    <el-col :span="12"><el-input v-model="form.role"></el-input></el-col>
                    <el-col :span="6">&nbsp;</el-col>
                    <el-col :span="4">
                        <el-button type="warning" style="margin-left:-20px;">提交</el-button>
                    </el-col>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                labelPosition: 'left',
                form: {
                    account: '',
                    name: '',
                    password: '',
                    phone: '',
                    role: ''
                }
            };
        }
    };
</script>
<style lang="scss"scoped>
    @import '../../../scss/mixin.scss';

    .el-form-item {
        position: relative;
    }

    .el-form-item__label {
        text-align: left
    }

    .top {
        height:30px;
        background: #eeeeee;

    }
    .top::before{
        content:'';
        display: inline-block;
        height:25px;
        border-left: 3px solid #437dff;
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
        bottom:25px;
        background: #fff;
    }

    .el-form {
        width: 400px;
    }

    .container {
        position: absolute;
        width: 500px;
        height: 260px;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
    }
</style>
