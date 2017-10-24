<!--添加用户-->
<template>
    <div class="addUser-wrapper">
        <div>
            <div class="top">
               <span> 用户列表---新添用户</span>
            </div>
        </div>
        <div class="container">
            <el-form ref="form" :model="form" label-width="120px">
                <el-form-item label="手机号：">
                    <el-col :span="8">
                        <el-select v-model="form.phone" placeholder="(+86)">
                            <el-option label="(+86)" value="(+86)" selected style="width:100%">(+86)</el-option>
                            <el-option label="(+85)" value="(+85)" style="width:100%">(+85)</el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="16">
                        <el-input v-model="form.name"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="初始密码:">
                    <el-input v-model="form.region"></el-input>
                </el-form-item>
                <el-form-item label="赠送余额（元）:">

                    <el-input v-model="form.type"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addUser">提交</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
    import {addUser} from '../../../api/User';
    export default {
        data () {
            return {
                labelPosition: 'right',
                form: {
                    name: '',
                    region: '',
                    type: '',
                    phone: ''
                }
            };
        },
        methods: {
            addUser() {
                addUser(this.form.name, this.form.region, this.form.type).then(res => {
                   console.log(res);
                });
            }
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

    .el-button {
        border-radius: 0;
        padding: 10px 50px;
    }

    .el-input__inner {
        border-radius: 0;
    }

    .addUser-wrapper {
        position: fixed;
        top: 40px;
        left: 230px;
        right: 25px;
        bottom: 0;
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
