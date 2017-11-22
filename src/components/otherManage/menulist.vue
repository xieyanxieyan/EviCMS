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
                        <el-button size="small" type="primary" @click="editList(index)">编辑</el-button>
                        <el-button size="small" @click="deleteList">删除</el-button>
                        <el-button size="small" type="success" @click="toNextPage(index)">分配权限</el-button>
                    </td>
                </tr>
                </tbody>
            </table>
            <!--是否删除弹窗-->

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
                    <!--<el-tree :data="options" :props="defaultProps" @node-click="handleChange" v-model="addMenu.fatherMenu"></el-tree>-->
                    <el-cascader
                        v-model="addMenu.fatherMenu"
                        :options="options"
                        :value="value"
                        :show-all-levels="false"
                        :change-on-select="true"
                        @change="handleChange">
                    </el-cascader>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submit">确 定</el-button>
                    <el-button @click="centerDialogVisible = false">取 消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!--分页-->
        <div class="pagination"  :class="{hide:compList}">
            <el-pagination
                layout="prev, pager, next,total"
                :total= "total"
                :page-size="perpage"
                :current-page.sync="currentPage"
                @current-change="handleCurrentChange()"
            >
            </el-pagination>
        </div>
    </div>
</template>
<script>
    import {addMenu, menulist, detailmenu, updatemenu, deleteMenus} from '../../api/other';

    export default {
        created() {
            this.showlist();
            this.droplist();
        },
        data() {
            return {
                perpage: 15, // 每页显示多少条
                total: 0, // 一共有多少条
                currentPage: 1, // 当前显示多少页
                options: [{label: '顶级菜单', value: 0, children: []}],
                value: [],
                visible2: false,
                defaultProps: {
                    children: 'children',
                    label: 'label',
                    value: 'value',
                    menu_id: 'menu_id'
                },
                currentIndex: '',
                operation: '',
                centerDialogVisible: false,
                list: [],
                addMenu: {
                    username: '',
                    status: '显示',
                    link: '',
                    fatherMenu: []
                },
                rules: {
                    username: [
                        {required: true, message: '请输入菜单名称', trigger: 'blur'}
                    ],
                    link: [
                        {required: true, message: '请输入菜单链接', trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            // 处理分页
            handleCurrentChange() {
                console.log('click');
            },
            del(index) {
                this.visible2 = true;
                this.currentIndex = index;
            },
            addList() {
                this.operation = '添加菜单';
                this.centerDialogVisible = true;
            },
            // 删除菜单
            deleteList() {
                    this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        deleteMenus(this.list[this.currentIndex].menu_id).then(res => {
                            if (res.data.error === 0) {
                                this.$message({
                                    message: '删除成功',
                                    type: 'success',
                                    showClose: true
                                });
                                this.visible2 = false;
                                this.showlist();
                            } else {
                                this.$message({
                                    message: res.data.data,
                                    type: 'error',
                                    showClose: true,
                                    duration: 1000
                                });
                            }
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
            },
//            显示菜单详情
            editList(index) {
                this.operation = '编辑菜单';
                this.centerDialogVisible = true;
                this.currentIndex = index;
                detailmenu(this.list[this.currentIndex].menu_id).then(res => {
                    if (res.data.error === 0) {
                        console.log(res.data.data);
                        this.addMenu.username = res.data.data.name;
                        this.addMenu.link = res.data.data.link;
                        this.addMenu.status = res.data.data.status === 1 ? '显示' : '隐藏';
//                        this.parseTreeJson(this.options, res.data.data.pid);
//                        for (let item of this.list) {
//                            if (res.data.data.pid === item.menu_id) {
//
//                            }
//                        }
                    }
                });
            },
//            寻找父级链接
            findFatherLink(treeNodes, id) {
                if (!treeNodes || !treeNodes.length) return;
                for (let i = 0, len = treeNodes.length; i < len; i++) {
                    let childs = treeNodes[i].children;
                    if (childs && childs.length > 0) {
                        this.findFatherLink(childs);
                    } else {
                        delete treeNodes[i].children;
                    }
                }
            },
//            显示菜单列表
            showlist() {
                menulist(1).then(res => {
                    if (res.data.error === 0) {
//                        console.log(res);
                        this.list = res.data.data.data;
                        this.total = res.data.data.total;
                    }
                });
            },
//            显示下拉列表
            droplist() {
                menulist(2).then(res => {
                    if (res.data.error === 0) {
                        let array = res.data.data;
                        this.parseTreeJson(array);
                        this.options[0].children = array;
                        console.log(this.options);
                    }
                });
            },
//            菜单提交
            submit() {
                if (this.operation === '添加菜单') {
                    this.addsubmit();
                    this.droplist();
                } else {
                    this.editSubmit();
                    this.droplist();
                }
            },
//            不定菜单生成
            parseTreeJson(treeNodes, id) {
                if (!treeNodes || !treeNodes.length) return;
                for (let i = 0, len = treeNodes.length; i < len; i++) {
                    let childs = treeNodes[i].children;
                    if (id) {
                      console.log(id);
                    }
                    treeNodes[i].label = treeNodes[i].name;
                    treeNodes[i].value = treeNodes[i].menu_id;
//                    delete treeNodes[i].name;
//                    delete treeNodes[i].pid;
                    delete treeNodes[i].type;
                    delete treeNodes[i].link;
                    delete treeNodes[i].status;
                    if (childs && childs.length > 0) {
                        this.parseTreeJson(childs);
                    } else {
                        delete treeNodes[i].children;
                    }
                }
            },
//            编辑菜单
            editSubmit() {
                this.$refs['addMenu'].validate((valid) => {
                    if (valid) {
//                        console.log(this.parseTreeJson(this.options, this.addMenu.fatherMenu[this.addMenu.fatherMenu.length - 1]));
//                        console.log(this.addMenu.fatherMenu[this.addMenu.fatherMenu.length - 1]))
                        updatemenu(this.list[this.currentIndex].menu_id, this.addMenu.username, this.addMenu.link, this.addMenu.status === '显示' ? 1 : 2, this.addMenu.fatherMenu[this.addMenu.fatherMenu.length - 1] || 0).then(res => {
                            if (res.data.error === 0) {
                                this.$message({
                                    message: '编辑成功',
                                    type: 'success',
                                    showClose: true
                                });
                                this.showlist();
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
                        addMenu(this.addMenu.username, this.addMenu.link, this.addMenu.status === '显示' ? 1 : 2, this.addMenu.fatherMenu[this.addMenu.fatherMenu.length - 1] || 0).then(res => {
                            if (res.data.error === 0) {
                                this.$message({
                                    message: '添加成功',
                                    type: 'success',
                                    showClose: true
                                });
                                this.$refs['addMenu'].resetFields();
                            }
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
                this.centerDialogVisible = false;
            },
            toNextPage(index) {
                this.$router.push({name: 'giveRovoke', params: {rovokeId: this.list[index].menu_id}});
            },
            handleChange(value) {
                console.log(value, '值');
                this.addMenu.fatherMenu = value;
                console.log(this.value);
            }
        }
    };
</script>
<style lang="scss">
    @import '../../style/common.scss';
    @import '../../scss/mixin.scss';

    #menulist {
        padding: 0 15px;

    .addlist {
        margin-bottom: 15px;
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
