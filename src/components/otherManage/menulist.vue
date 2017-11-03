<template>
    <div id="menulist">
        <div class="menulist">
            <span>菜单列表</span>
        </div>
        <div>
            <el-button size="small" @click="addList">添加</el-button>
        </div>
        <div>
            <table cellspacing="0" cellpadding="0">
                <thead>
                <th>编号</th>
                <th>名称</th>
                <th>状态</th>
                <th>菜单值</th>
                </thead>
                <tbody>
                <td></td>
                <td></td>
                <td></td>
                <td>
                    <el-button size="small" @click="editList">编辑</el-button>
                    <el-button size="small">删除</el-button>
                </td>
                </tbody>
            </table>
        </div>
        <el-dialog
        :title="operation"
        :visible.sync="centerDialogVisible"
        width="30%"
        center>
        <el-form v-model="addMenu" label-width="100px">
            <el-form-item label="菜单名称">
                <el-input v-model="addMenu.username"></el-input>
            </el-form-item>
            <el-form-item label="菜单状态">
                <el-input v-model="addMenu.status"></el-input>
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
    export default{
        data() {
            return {
                operation: '',
                centerDialogVisible: false,
                addMenu: {
                    username: '',
                    status: ''
                }
            };
        },
        methods: {
            addList() {
                this.operation = '添加菜单';
                this.centerDialogVisible = true;
            },
            editList() {
                this.operation = '编辑菜单';
                this.centerDialogVisible = true;
            }
        }
    };
</script>
<style lang="scss">
    @import '../../style/common.scss';
    @import '../../scss/mixin.scss';
    #menulist {
        padding:0 15px;
        .menulist{
            padding:15px 0;
            span{
                @include span;
            }
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
    table{
        table-layout: fixed;
    }
</style>
