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
                    <el-button>添加</el-button>
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
                    <td><span style="margin-right:20px;border:1px solid #437DFF;color:#437DFF;" @click="dialogTableVisibl">{{item.operation.edit}}</span>
                    <span style="border:1px solid #EBADA6;color:#EBADA6;">{{item.operation.del}}</span>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                formInline: {
                    user: '',
                    region: ''
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
            open () {
                const h = this.$createElement;
                this.$msgbox({
                   title: '消息',
                   message: h('p', null, [
                       h('span', null, '内容可以是 '),
                       h('i', { style: 'color: teal' }, 'VNode')
                   ]),
                    showCancelButton: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                });
            }
        }
    };
</script>
<style lang="scss" type="text/scss" scoped>
    .survestaff {
        padding: 15px;
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
        .container {
            width: 100%;
            th {
                background: #556386;
                color:#fff;
            }
            th,td{
                text-align:center;
                height:40px;
                line-height:40px;
                font-size:14px;
                span{
                    cursor: pointer;
                    padding:3px 6px;
                }
            }
        }

        .top {
            margin: 0;
        }
    }
</style>
