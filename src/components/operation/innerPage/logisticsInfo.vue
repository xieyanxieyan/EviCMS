<template>
    <div id="logisticInfo">
        <div class="logisticInfo">
            <strong>物流信息</strong>
        </div>
        <div class="logisticInfoForm">
            <div class="datos">
                <el-form :label-position="labelPosition" label-width="90px" :model="formLabelAlign">
                    <el-form-item label="投递时间：">
                        <el-input v-model="formLabelAlign.time"></el-input>
                    </el-form-item>
                    <el-form-item label="快递公司：">
                        <el-input v-model="formLabelAlign. company"></el-input>
                    </el-form-item>
                    <el-form-item label="快递单号:" style="margin-bottom:58px;">
                        <el-input v-model="formLabelAlign.number"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="info">保存</el-button>
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
export default{
    data() {
        return {
            labelPosition: 'left',
            formLabelAlign: {
                time: '',
                company: '',
                number: ''
            }
        };
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
