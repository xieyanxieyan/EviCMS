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
                    <small>{{userdetails.userNum}}</small>
                </span>
                <span>
                    <strong>注册时间：</strong>
                    <small>{{userdetails.time}}</small>
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
                <el-form-item label="密码:">
                    <el-input v-model="form.region"></el-input>
                </el-form-item>
                <el-form-item label="赠送余额（元）:">
                    <el-input v-model="form.type"></el-input>
                </el-form-item>
                <el-form-item label="修改原因：">
                    <el-input v-model="form.reason"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">修改</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                labelPosition: 'right',
                form: {
                    name: '',
                    region: '',
                    type: '',
                    phone: '',
                    reason: ''
                },
                userdetails: {
                    userNum: '20',
                    time: '2017-02-03',
                    due: '23',
                    space: '20',
                    remainspace: '50.00'
                }
            };
        }
    };
</script>
<style lang="scss" type="text/scss">
    @import '../../../scss/mixin.scss';
#userDetail{
    padding:0 15px;
    .userDetaiTop{
    padding:15px 0;
       span {
           border-left: 2px solid #324157;
           padding-left: 5px;
       }
    }
    .userMessage{
        padding:0 15px;
        border-bottom:1px solid #eee;
        span{
            display:inline-block;
            margin:20px 0 ;
            padding: 0 50px;
            border-right:1px solid #eee;
            &:last-child{
              border:0;
             }
        }

    }
    .el-form-item {
        position: relative;
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

    .addUser-wrapper {
        position: fixed;
        top: 40px;
        left: 230px;
        right: 25px;
        bottom: 0;
        background: #fff;
    }



    .container {
        background: #fff;
        min-height: calc(100vh - 110px);
    position:relative;
    .el-form {
        width: 400px;
        margin:100px auto 0;
    }
    }
}

</style>
