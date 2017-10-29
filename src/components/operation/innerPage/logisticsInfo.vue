<template>
    <div id="logisticInfo">
        <div class="logisticInfo">
            <strong>物流信息</strong>
        </div>
        <div class="logisticInfoForm">
            <div class="datos">
                <el-form :label-position="labelPosition" :rules="rules" ref="formLabelAlign" label-width="90px" :model="formLabelAlign">
                    <el-form-item label="投递时间:" prop="time">
                        <el-input v-model="formLabelAlign.time"></el-input>
                    </el-form-item>
                    <el-form-item label="快递公司:" prop="company">
                        <el-input v-model="formLabelAlign.company"></el-input>
                    </el-form-item>
                    <el-form-item label="快递单号:" prop="number" style="margin-bottom:58px;">
                        <el-input v-model="formLabelAlign.number"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="info"  @click="saveSubmit('formLabelAlign')">保存</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="Article-steps">
                <el-steps :space="100" direction="vertical" :active="1">
                    <el-step title="2017-06-01 10:00:00" description="（北京市）快件已到达北京市转运中心"></el-step>
                    <el-step title="2017-06-01 10:00:00"  description="（北京市）快件已从北京市朝阳区X部发出，准备发往xx市"></el-step>
                    <el-step title="2017-06-01 10:00:00"  description="（北京市）XX快递，朝阳区X部收件员已揽件"></el-step>
                </el-steps>
            </div>
        </div>
    </div>
</template>
<script>
    import {certifyUpdate} from '../../../api/operation';
export default{
    props: {
        cert: ''
    },
    data() {
        return {
            labelPosition: 'left',
            formLabelAlign: {
                time: '',
                company: '',
                number: ''
//                isdisabled: true
            },
            rules: {
                time: [
                    {required: true, message: '请选择投递时间', trigger: 'change'}
                ],
                company: [
                    {required: true, message: '请选择快递公司', trigger: 'change'}
                ],
                number: [
                    {required: true, message: '请输入快递单号', trigger: 'blur'}
                ]
            }
        };
    },
    methods: {
        saveSubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    certifyUpdate(this.cert.apply_id, this.formLabelAlign.name, this.formLabelAlign.phone, this.formLabelAlign.address, this.formLabelAlign.number, this.formLabelAlign.company, 2).then(res => {
                        console.log(res);
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
#logisticInfo{
    float:right;
    padding:20px;
    box-sizing: border-box;
    display:inline-block;
    margin-left: 15px;
    width:49%;
    background: #fff;
    .logisticInfo{
        padding-bottom: 15px;
        border-bottom: 1px solid #eee;
    }
    .logisticInfoForm{
        min-height: calc(100vh - 450px);
    }
.el-form {
    margin: 40px auto;
}
.datos{
    display:inline-block;
    width:260px;
    border-right:1px solid #eee;
    padding:0 20px 0 0;
}
.Article-steps{
    display:inline-block;
    width:200px;
    .el-step__description{
        margin-left:10px;
    }
    .el-step__title{
        margin-left:10px;
    }
}
padding-bottom:0;
}
</style>
