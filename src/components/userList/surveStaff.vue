<template>
    <div class="survestaff">
        <div class="top">
            <span style="border-left:2px solid #324157;padding-left:10px;">公测员管理</span>
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="手机号或名称:">
                    <el-input v-model="formInline.user" placeholder="审批人" size="small"></el-input>
                </el-form-item>
                <el-form-item label="状态" label-width="100">
                    <el-select v-model="formInline.region" size="small" style="width:100px;">
                        <el-option label="已过期" value="shanghai"></el-option>
                        <el-option label="未注册" value="beijing"></el-option>
                        <el-option label="已注册" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button style="background:#999999;color:#fff">搜索</el-button>
                    <div class="line"></div>
                    <el-button type="primary" @click="isVisible=true">添加</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="container">
            <table cellpadding="0" cellspacing="0" border="0" width="100%">
                <thead>
                <tr>
                    <th>手机号</th>
                    <th>公测员名称</th>
                    <th>推荐人名称</th>
                    <th>到期时间</th>
                    <th>赠送余额</th>
                    <th>状态</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in manageDate">
                    <td>{{item.phoneNo}}</td>
                    <td>{{item.surveName}}</td>
                    <td>{{item.supportName}}</td>
                    <td>{{item.expirationDate}}</td>
                    <td>{{item.complimentary}}</td>
                    <td>{{item.status}}</td>
                    <td><span style="margin-right:20px;border:1px solid #437DFF;color:#437DFF;" @click="isVisible=true">{{item.operation.edit}}</span>
                        <span style="border:1px solid #EBADA6;color:#EBADA6;" @click="deletestaff">{{item.operation.del}}</span>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <!--添加公测员弹窗-->
        <el-dialog title="添加公测员" :visible.sync = 'isVisible'>
            <el-form :label-position="labelPosition" label-width="100px" :model="form">
                <el-form-item label="公测员名称：">
                    <el-input v-model="form.surveerName"></el-input>
                </el-form-item>
                <el-form-item label="推荐人名称：">
                    <el-input v-model="form.surveerReferral"></el-input>
                </el-form-item>
                <el-form-item label="手机号：">
                    <el-col :span="4">
                        <el-select v-model="form.region">
                            <el-option label="(+86)" value="(+86)"></el-option>
                            <el-option label="(+85)" value="(+85)"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="2"> </el-col>
                    <el-col :span="20">
                        <el-input v-model="form.phoneNum"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="赠送余额：">
                    <el-input v-model="form.vacancies"></el-input>
                </el-form-item>
                <el-form-item label="到期时间：">
                    <el-input v-model="form.dueTime"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">提交</el-button>
                    <el-button @click="isVisible = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

    </div>
</template>
<script>
    export default {
        data () {
            return {
                labelPosition: 'left',
                isVisible: false,
                formInline: {
                    user: '',
                    region: ''
                },
                form: {
                    surveerName: '',
                    surveerReferral: '',
                    phoneNum: '',
                    vacancies: '',
                    dueTime: ''
                },
                currentIndex: 0,
                manageDate: [
                    {
                        phoneNo: '(+86)2312345678',
                        surveName: '张三',
                        supportName: '李四',
                        expirationDate: '2017-4-10 10:01:30',
                        complimentary: '999.00',
                        status: '未注册',
                        operation: {
                            edit: '编辑',
                            del: '删除'
                        }
                    },
                    {
                        phoneNo: '(+86)2312345678',
                        surveName: '张三',
                        supportName: '李四',
                        expirationDate: '2017-4-10 10:01:30',
                        complimentary: '999.00',
                        status: '未注册',
                        operation: {
                            edit: '编辑',
                            del: '删除'
                        }
                    }
                ]
            };
        },
        methods: {
//            删除公测员
            deletestaff () {
                this.$confirm('确定删除吗，删除后不可恢复！', '', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功！'
                    });
                }).catch(() => {
                   this.$message({
                       type: 'info',
                       message: '已取消删除'
                   });
                });
            }
        }
    };
</script>
<style lang="scss" type="text/scss" >
    .survestaff {
        padding: 0 15px;
        .top{
            .el-form {
                margin: 0;
                float: right;
                .el-form-item {
                    margin-bottom: 0px;
                }
                .el-input__inner {
                    border-radius: 0;
                }
                input {
                    outline: none;
                }
                .line {
                    width: 0;
                    height: 20px;
                    display: inline-block;
                    border: 1px solid #999;
                    margin: 0 5px;
                }
                .el-button {
                    border-radius: 0;
                    padding: 5px 15px;
                }
                input {
                    border-radius: 0;
                }

            }
        }

        .container {
            width: 100%;
            th {
                background: #556386;
                color: #fff;
            }
            th, td {
                text-align: center;
                height: 40px;
                line-height: 40px;
                font-size: 14px;
                span {
                    cursor: pointer;
                    padding: 3px 6px;
                }
            }
        }

        .top {
            margin: 0;
            padding: 15px 0;
        }
        .el-dialog{
            width:500px;
            .el-dialog__title{
                color:#fff;
            }
            .el-dialog__header{
                text-align:center;
                background: #556386;
                padding:10px 20px;
            }
        }
    }
</style>
