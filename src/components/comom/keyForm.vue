<template>
    <div class="from-wrapper">
        <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign">
            <el-form-item label="APP Key:">
                <el-input v-model="formLabelAlign.name"></el-input>
            </el-form-item>
            <el-form-item label="APP Secret:">
                <el-input v-model="formLabelAlign.region"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="info">修改</el-button>
                <el-button type="warning">提交</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                formLabelAlign: {
                    name: '',
                    region: '',
                    type: ''
                }
            };
        }
    };
</script>
<style>

</style>
