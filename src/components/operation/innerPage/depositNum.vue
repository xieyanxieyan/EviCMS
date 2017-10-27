<template>
    <div id="depositNum">
        <div class="depositeTop">
            <strong>存证编号：</strong>
            <small>{{cert_no}}</small>
            <strong style="float:right">
                出证次数：k次
            </strong>
        </div>
        <div class="depositForm">
            <div>
                <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign">
                    <el-form-item label="姓名：">
                        <el-input v-model="formLabelAlign.name" placeholder="张三"></el-input>
                    </el-form-item>
                    <el-form-item label="收件人手机：">
                        <el-input v-model="formLabelAlign.phone" placeholder="12312345678"></el-input>
                    </el-form-item>
                    <el-form-item label="收件地址：" style="margin-bottom:0;">
                        <el-input v-model="formLabelAlign.address" placeholder="北京市朝阳区xx路xx号"></el-input>
                    </el-form-item>
                    <el-form-item style="text-align: right;">
                        <el-button type="text">信息更改</el-button>
                        <el-button type="text">取消</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button style="margin-left:-100px;" type="info">预览证书</el-button>
                        <el-button type="warning">打印证书</el-button>
                        <el-button type="success">已盖章</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div>

            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['cert_no'],
        data () {
            return {
                labelPosition: 'left',
                formLabelAlign: {
                    name: '',
                    phone: '',
                    address: ''
                }
            };
        }
    };
</script>
<style lang="scss">
    #depositNum {
        box-sizing: border-box;
        display: inline-block;
        padding: 20px;
        background: #fff;
        width: 49%;

    .depositeTop {
        padding-bottom: 15px;
        border-bottom: 1px solid #eee;
    }

    .depositForm {
        min-height: calc(100vh - 430px);
    }

    .el-form {
        margin: 40px auto;
        width: 300px;
    }

    }
</style>
