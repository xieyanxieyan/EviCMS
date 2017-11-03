<template>
    <div id="rightsAllotment">
        <div class="rightsAllotmenttop">
        <span>
            权限分配
        </span>
        </div>
        <div>
            <el-button size="small" @click="addAdmin">
                添加权限
            </el-button>
        </div>
        <div>
            <table cellpadding="0" cellspacing="0">
                <thead>
                <tr>
                    <th>编号</th>
                    <th>权限名称</th>
                    <th>权限值</th>
                    <th>描述</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                        <el-button size="small" @click="editAdmin">编辑</el-button>
                        <el-button size="small">删除</el-button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <!--添加权限弹窗-->
        <el-dialog
            :title="operation"
            :visible.sync="centerDialogVisible"
            width="30%"
            center>
            <el-form v-model="addForm" label-width="100px">
                <el-form-item label="权限名称">
                    <el-input v-model="addForm.username"></el-input>
                </el-form-item>
                <el-form-item label="权限值">
                    <el-input v-model="addForm.value"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="centerDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                operation: '',
                addForm: {
                    username: '',
                    value: ''
                },
                centerDialogVisible: false
            };
        },
        methods: {
            addAdmin() {
                this.centerDialogVisible = true;
                this.operation = '添加权限';
            },
            editAdmin() {
                this.centerDialogVisible = true;
                this.operation = '编辑权限';
            }
        }
    };
</script>
<style lang="scss">
    @import '../../style/common.scss';
    @import '../../scss/mixin.scss';

    #rightsAllotment {
        padding: 0 15px;

    .rightsAllotmenttop {
        padding: 15px 0;

    span {
    @include span;
    }

    table {
        table-layout: fixed;
    }

    }
    .el-dialog__header {
        text-align: center;
        background: #556386;
        padding: 10px;

    span {
        color: #fff;
    }

    }

    }
</style>
