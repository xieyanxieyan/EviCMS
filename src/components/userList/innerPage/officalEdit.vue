<!--添加或者编辑公测员-->
<template>
    <div>
        <el-dialog title="添加公测员" :visible.sync="dialogFormVisible">
            <el-form :model="form" :label-position="labelPosition">
                <el-form-item label="公测员名称：" :label-width="formLabelWidth">
                    <el-input v-model="form.officalName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="推荐人名称：" :label-width="formLabelWidth">
                    <el-input v-model="form.referrerName" auto-complete="off"></el-input>
                </el-form-item>
                <el-input-item label="手机号：" ：label-width="fromLabelWidth">
                    <el-col :span="8">
                        <el-select v-model="form.phone" placeholder="(+86)">
                            <el-option label="(+86)" value="(+86)" selected style="width:100%">(+86)</el-option>
                            <el-option label="(+85)" value="(+85)" style="width:100%">(+85)</el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="16">
                        <el-input v-model="form.phone"></el-input>
                    </el-col>
                </el-input-item>
                <el-input-item label="赠送余额：" ：label-width="fromLabelWidth">
                    <el-input v-model="form.free" auto-complete="off"></el-input>
                </el-input-item>
                <el-input-item label="到期时间：" ：label-width="fromLabelWidth">
                    <el-input v-model="form.dunTime" auto-complete="off"></el-input>
                </el-input-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default{
    data() {
        return {
            labelPosition: 'right',
            form: {
                officalName: '',
                referrerName: '',
                phone: '',
                dunTime: ''
            }
        };
    }
};
</script>
<style>

</style>
