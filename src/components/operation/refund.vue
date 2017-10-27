<!--退款处理-->
<template>
    <div id="refund">
        <div class="refundtop"><span>退款处理</span></div>
        <div class=""><span>快速筛选:</span>
            <div class="tab-wrapper">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="全部" name="1"></el-tab-pane>
                    <el-tab-pane label="已退款" name="2"></el-tab-pane>
                    <el-tab-pane label="已拒绝" name="3"></el-tab-pane>
                </el-tabs>
            </div>
            <el-form class="refundform" action="#" v-model="topForm">
                <div>用户名称：</span>
                    <input type="text" v-model="topForm.username">
                </div>
                <div>
                    <span>存证号：</span>
                    <input type="text" v-model="topForm.cert_no">
                </div>
                <div>
                    <span>申请时间：</span>
                    <input type="time" v-model="topForm.begin_time">至
                    <input type="time" v-model="topForm.end_time">
                    <input type="button" value="搜索">
                </div>
            </el-form>
        </div>
        <div>
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
                        <span>用户界面</span>
                        <span @click="handleRefund(index)">处理</span>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <!--分页-->
        <div class="pagination">
            <el-pagination
                layout="prev, pager, next,total"
                :total= "total"
                :page-size="13"
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
                        <el-button type="info" @click="sureSubmit(1)">确认退款</el-button>
                        <el-button type="danger" @click="sureSubmit(2)">拒绝退款</el-button>
                        <el-button type="primary" @click="close">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    import {getRefundList, refundHandle} from '../../api/operation';

    export default {
        created() {
            this._showRefundList();
        },
        data() {
            return {
                activeId: 0,
                labelPosition: 'left',
                refunddialog: false, //  拒绝退款弹窗
                currentTabIndex: 0,
                activeName: '1',
                currentPage: 1,
                repectReason: '',
                total: 0,
                topForm: {
                    username: '',
                    begin_time: '',
                    end_time: '',
                    cert_no: ''
                },
                tableItem: []
            };
        },
        methods: {
            handleClick: function () {
                console.log('click');
            },
            close() {
                this.refunddialog = false;
            },
//            分页
            handleCurrentChange() {
                console.log('分页');
            },
//            处理退款
            _showRefundList() {
                getRefundList(this.topForm.username, this.topForm.cert_no, this.topForm.begin_time, this.topForm.end_time).then(res => {
                    if (res.data.error === 0) {
                        this.tableItem = res.data.data.data;
                        this.total = res.data.data.total;
                    }
                });
            },
            sureSubmit(num) {
                refundHandle(this.tableItem[this.activeId].request_id, this.repectReason, num).then(res => {
                    console.log(res);
                    if (res.data.error === 0) {
                    }
                });
                this.refunddialog = false;
            },
            handleRefund(index) {
                this.refunddialog = true;
                this.activeId = index;
            }
        }
    };
</script>
<style lang="scss">
    @import '../../style/common.scss';

    #refund {
        padding: 0 15px;
    .pagination{
        margin:15px 0;
        text-align: center;
    .el-pagination{
        display:inline-block;
    }
    }
    .refundtop {
        padding: 15px 0;

    span {
        border-left: 2px solid #324157;
        padding-left: 5px;
    }

    }
    td span {
        cursor: pointer;
        border: 1px solid;
        padding: 3px;
        color: #2D4D9F
    }

    .tab-wrapper {
        display: inline-block;
        vertical-align: -28px;
        width: 260px;
        margin-left: 20px;

    }

    .el-tabs__header {
        border-bottom: 0;
    }

    .refundform {
        float: right;
        height: 40px;
        line-height: 40px;
        display: inline-block;

    div {
        display: inline-block;
    }

    input[type=text] {
        display: inline-block;
        width: 150px;
    }

    input[type=button] {
        color: #fff;
        padding: 4px 7px;
        display: inline-block;
        background: #999999;

    }

    input {
        border: 1px solid #eee;
        padding: 3px;
    }

    }
    }
</style>
