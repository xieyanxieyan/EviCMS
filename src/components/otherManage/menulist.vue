<template>
    <div id="menulist">
        <div class="menulist">
            <span>菜单列表</span>
        </div>
        <div class="addlist">
            <el-button size="small" @click="addList">添加菜单</el-button>
        </div>
        <div>
            <table cellspacing="0" cellpadding="0">
                <thead>
                <th>编号</th>
                <th>名称</th>
                <th>菜单链接</th>
                <th>状态</th>
                <th>菜单操作</th>
                </thead>
                <tbody>
                <tr v-for="(item,index) in list">
                    <td>{{item.menu_id}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.link}}</td>
                    <td>
                        <template v-if="item.status===1">
                            <span>显示</span>
                        </template>
                        <template v-else-if="item.status===2">
                            <span>隐藏</span>
                        </template>
                    </td>
                    <td>
                        <el-button size="small" @click="editList(index)">编辑</el-button>
                        <el-button size="small">删除</el-button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <!--添加菜单弹窗-->
        <el-dialog
            :title="operation"
            :visible.sync="centerDialogVisible"
            width="30%"
            center>
            <el-form :model="addMenu" ref="addMenu" :rules="rules" label-width="100px">
                <el-form-item label="菜单名称" prop="username">
                    <el-input v-model="addMenu.username"></el-input>
                </el-form-item>
                <el-form-item label="菜单链接" prop="link">
                    <el-input v-model="addMenu.link"></el-input>
                </el-form-item>
                <el-form-item label="菜单状态">
                    <el-radio-group v-model="addMenu.status">
                        <el-radio label="显示"></el-radio>
                        <el-radio label="隐藏"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="父级链接" prop="fatherMenu">
                    <el-select v-model="addMenu.fatherMenu">
                        <el-option value="1">diyige</el-option>
                        <el-option value="2">dddd</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="editsubmit">确 定</el-button>
                    <el-button @click="centerDialogVisible = false">取 消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
    import {addMenu, menulist, detailmenu, updatemenu} from '../../api/other';

    export default {
        created() {
            this.showlist();
        },
        data() {
            return {
                currentIndex: '',
                operation: '',
                total: '',
                centerDialogVisible: false,
                list: [],
                addMenu: {
                    username: '',
                    status: '显示',
                    link: '',
                    fatherMenu: 1
                },
                rules: {
                    username: [
                        {required: true, message: '请输入菜单名称', trigger: 'blur'}
                    ],
                    link: [
                        {required: true, message: '请输入菜单链接', trigger: 'blur'}
                    ],
                    fatherMenu: [
                        {type: 'number', required: true, message: '请输入父级链接', trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            addList() {
                this.operation = '添加菜单';
                this.centerDialogVisible = true;
            },
//            显示菜单详情
            editList(index) {
                this.operation = '编辑菜单';
                this.centerDialogVisible = true;
                this.currentIndex = index;
                detailmenu(this.list[this.currentIndex].menu_id).then(res => {
                    console.log(res);
                 if (res.data.error === 0) {
                     this.addMenu.username = res.data.data.name;
                     this.addMenu.link = res.data.data.link;
                     this.addMenu.status = res.data.data.status === 1 ? '显示' : '隐藏';
                     this.addMenu.fatherMenu = res.data.data.type;
                 }
                });
            },
//            显示菜单列表
            showlist() {
                menulist(1).then(res => {
                    if (res.data.error === 0) {
                        this.list = res.data.data.data;
                        this.total = res.data.data.total;
                    }
                });
            },
//            菜单提交
            submit() {
                if (this.operation === '添加菜单') {
                    this.addsubmit();
                } else {
                    this.editSubmit();
                }
            },
//            编辑菜单
            editsubmit() {
                this.$refs['addMenu'].validate((valid) => {
                    if (valid) {
                        updatemenu(this.list[this.currentIndex].menu_id, this.addMenu.username, this.addMenu.link, this.addMenu.status === '显示' ? 1 : 2, this.addMenu.fatherMenu).then(res => {
                            if (res.data.error === 0) {
                                this.$message({
                                    message: '编辑成功',
                                    type: 'success',
                                    showClose: true
                                });
                            }
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
                this.centerDialogVisible = false;
            },
//            添加菜单
            addsubmit() {
                this.$refs['addMenu'].validate((valid) => {
                    if (valid) {
                        addMenu(this.addMenu.username, this.addMenu.link, this.addMenu.status === '显示' ? 1 : 2, this.addMenu.fatherMenu).then(res => {
                            if (res.data.error === 0) {
                                this.$message({
                                    message: '添加成功',
                                    type: 'success',
                                    showClose: true
                                });
                            }
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
                this.centerDialogVisible = false;
            }
        }
    };
</script>
<style lang="scss">
    @import '../../style/common.scss';
    @import '../../scss/mixin.scss';

    #menulist {
        padding: 0 15px;
    .addlist{
        margin-bottom:15px;
    }
    .menulist {
        padding: 15px 0;
    span {
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
    table {
        table-layout: fixed;
    }
</style>
