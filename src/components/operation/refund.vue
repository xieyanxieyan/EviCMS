<!--退款处理-->
<template>
    <div id="refund">
        <div class="refundtop">
            <span>退款处理</span>
            <div class="quikeSelect">快速筛选:</div>
            <div class="tab-wrapper">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="全部" name=''></el-tab-pane>
                    <el-tab-pane label="已退款" name="1"></el-tab-pane>
                    <el-tab-pane label="已拒绝" name="2"></el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <div class="">
            <el-form class="refundform" :inline="true" v-model="topForm" ref="topForm">
                <el-form-item label="用户名称：">
                    <el-input v-model="topForm.username" size="small"></el-input>
                </el-form-item>
                <el-form-item label="存证号：">
                    <el-input v-model="topForm.cert_no" size="small"></el-input>
                </el-form-item>
                <el-form-item label="统计时间:">
                    <el-date-picker
                        size="small"
                        v-model="topForm.value1"
                        type="date"
                        placeholder="选择开始时间"
                        :picker-options="topForm.pickerOptions0">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="至">
                    <el-date-picker
                        size="small"
                        v-model="topForm.value2"
                        type="date"
                        placeholder="选择结束时间"
                        :picker-options="topForm.pickerOptions0">
                    </el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-button
                        size="small" @click="_showRefundList">搜索
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
        <div v-bind="{hide: refundList}">
            <table cellspacing="0" cellpadding="0" border="0">
                <thead>
                <tr>
                    <th>时间</th>
                    <th>用户名称</th>
                    <th>存证号</th>
                    <th>备注</th>
                    <th>类型</th>
                    <th>交易额</th>
                    <th>状态</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in tableItem">
                    <td>{{item.time}}</td>
                    <td>{{item.username}}</td>
                    <td>{{item.consumption.cert_no}}</td>
                    <td>{{item.append_info}}</td>
                    <td>{{item.consumption.type}}</td>
                    <td>{{item.consumption.cash_fee}}</td>
                    <td>
                        <template v-if="item.status==0">
                            未处理
                        </template>
                        <template v-else-if="item.status == 1">
                            已同意
                        </template>
                        <template v-else-if="item.status === 2">
                            已拒绝
                        </template>
                    </td>
                    <td>
                        <span @click="admin_web(index)">用户界面</span>
                        <span @click="handleRefund(index)" v-bind:class="{hide:refundDeal}">处理</span>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <!--分页-->
        <div class="pagination" v-bind:class="{hide:refundList}" v-if="total>15">
            <el-pagination
                layout="prev, pager, next,total"
                :total="total"
                :page-size="perPage"
                :current-page.sync="currentPage"
                @current-change="handleCurrentChange()"
            ></el-pagination>
        </div>
        <!--退款处理弹窗-->
        <div>
            <el-dialog :visible.sync="refunddialog">
                <el-form :label-position="labelPosition" label-width="100px;">
                    <el-form-item>
                        <strong>退款理由：</strong>
                        <span style="color:red">打印失败</span>
                    </el-form-item>
                    <el-form-item label="拒绝理由：">
                        <el-input v-model="repectReason"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="info" :disabled="isused" @click="sureSubmit(1)">确认退款</el-button>
                        <el-button type="danger" :disabled="isused" @click="sureSubmit(2)">拒绝退款</el-button>
                        <el-button type="primary" @click="close">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    import {getRefundList, refundHandle} from '../../api/operation';
    import {translateTime, contains} from '../../assets/public';
    import {admin_web} from '../../api/user';
    //    import {setToken} from '../../common/js/auth';
    export default {
        created() {
            this._showRefundList();
            this.controlPermission();
        },
        data() {
            return {
                activeId: 0,
                labelPosition: 'left',
                isused: false,
                refunddialog: false, //  拒绝退款弹窗
                currentTabIndex: 0,
                perPage: 15, // 默认一页显示多少条
                activeName: '',
                currentPage: 1,
                refundDeal: false, // 退款处理的处理按钮是否显示
                refundList: false, // 退款处理列表是否显示
                repectReason: '',
                total: 0,
                topForm: {
                    username: '',
                    value1: '',
                    value2: '',
                    cert_no: ''
                },
                tableItem: []
            };
        },
        methods: {
            handleClick: function () {
                this._showRefundList();
            },
            close() {
                this.refunddialog = false;
            },
//            分页
            handleCurrentChange() {
                this._showRefundList();
            },
//            退款列表
            _showRefundList() {
                getRefundList(this.topForm.username, this.topForm.cert_no, translateTime(this.topForm.value1), translateTime(this.topForm.value2), parseInt(this.activeName) || '', this.perPage, this.currentPage).then(res => {
                    if (res.data.error === 0) {
                        this.tableItem = res.data.data.data;
                        this.total = res.data.data.total;
                        console.log(this.tableItem);
                    }
                });
            },
            // 登入web系统
            admin_web(index) {
                admin_web(this.tableItem[index].user_id).then(res => {
                    if (res.data.error === 0) {
//                        console.log(res.data.data.data.auth_token, 's');
//                        setToken(res.data.data.data.auth_token);
                        window.location.href = 'http://www.51zbb.net?auth-token=' + res.data.data.data.auth_token;
                    }
                });
            },
            // 退款处理
            sureSubmit(num) {
                if (this.repectReason) {
                    this.isused = false;
                    refundHandle(this.tableItem[this.activeId].request_id, this.repectReason, num).then(res => {
                        if (res.error === 0) {
                            this.$message({
                                message: '处理成功',
                                type: 'error',
                                showClose: true
                            });
                        } else {
                            this.$message({
                                message: res.data.data,
                                type: 'error',
                                showClose: true
                            });
                        }
                    });
                    this.refunddialog = false;
                } else {
                    this.isused = true;
                }
            },
            handleRefund(index) {
                this.refunddialog = true;
                this.activeId = index;
            },
            // 权限控制函数
            controlPermission() {
                this.refundList = !contains('operation_refund_list'); // 是否有显示列表权限
                this.refundDeal = !contains('operation_refund_handle');  // 是否有退款处理的权限
            }
        }
    };
</script>
<style lang="scss" type="text/scss">
    @import '../../style/common.scss';
    @import '../../scss/mixin.scss';

    #refund {
        padding: 0 15px;
        .pagination {
            margin: 15px 0;
            text-align: center;
            .el-pagination {
                display: inline-block;
            }
        }
        .tab-wrapper>div{
            display: inline-block;
        }
        .refundtop {
            padding: 15px 0;
            padding-bottom: 0;
            &>span {
                @include span;
            }
            .quikeSelect{
                display:inline-block;
                height:42px;
                line-height: 42px;
                margin-left:20px;
            }

        }
        .el-tabs__header {
            margin: 0 0 10px;
        }
        td span {
            cursor: pointer;
            border: 1px solid;
            padding: 3px;
            color: #20a0ff;
        }

        .tab-wrapper {
            display: inline-block;
            vertical-align: -28px;
            margin-left: 20px;

        }

        .el-tabs__header {
            border-bottom: 0;
        }

        .refundform {
            margin-bottom:10px;
            display: inline-block;
            .el-form-item__content {
                width: 115px;
            }
            .el-date-editor.el-input {
                width: 120px;
            }
            .el-form-item {
                margin-bottom: 0;
                &:last-child {
                    width: 45px;
                }
            }
        }
    }
</style>
