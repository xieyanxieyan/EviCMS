<template>
    <div id="logisticInfo">
        <div class="logisticInfo">
            <span>物流信息</span>
        </div>
        <div class="logisticInfoForm">
            <div>
                <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign">
                    <el-form-item label="投递时间：">
                        <el-input v-model="formLabelAlign.time"></el-input>
                    </el-form-item>
                    <el-form-item label="快递公司：">
                        <el-input v-model="formLabelAlign. company"></el-input>
                    </el-form-item>
                    <el-form-item label="快递单号:">
                        <el-input v-model="formLabelAlign.number"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div></div>
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
<style lang="scss" scoped>
#logisticInfo{
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
        min-height: calc(100vh - 430px);
    }
}
</style>
