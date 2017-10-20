<!--退款处理-->
<template>
    <div id="refund">
        <div class="refundtop"><span>退款处理</span></div>
        <div class=""><span>快速筛选:</span>
            <div class="tab-wrapper">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="全部" name="first"></el-tab-pane>
                    <el-tab-pane label="已退款" name="second"></el-tab-pane>
                    <el-tab-pane label="已拒绝" name="third"></el-tab-pane>
                </el-tabs>
            </div>
            <el-form class="refundform" action="#">
                <div>用户名称：</span>
                    <input type="text">
                </div>
                <div>
                    <span>存证号：</span>
                    <input type="text">
                </div>
                <div>
                    <span>申请时间：</span>
                    <input type="time">至
                    <input type="time">
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
                    <td>{{item.userName}}</td>
                    <td>{{item.MemoryNum}}</td>
                    <td>{{item.remark}}</td>
                    <td>{{item.type}}</td>
                    <td>{{item.Turnover}}</td>
                    <td>{{item.status}}</td>
                    <td>
                        <span>{{item.operation.interface}}</span>
                        <span @click="refunddialog=true">{{item.operation.handle}}</span>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <div>
            <el-dialog :visible.sync="refunddialog" >
                <el-form :label-position="labelPosition" label-width="100px;">
                <el-form-item>
                    <strong>退款理由：</strong>
                    <span style="color:red">打印失败</span>
                </el-form-item>
                <el-form-item label="拒绝理由：" >
                    <el-input v-model="repectReason"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="info" @click="close">确认退款</el-button>
                    <el-button type="danger" @click="close">拒绝退款</el-button>
                    <el-button type="primary" @click="close">取消</el-button>
                </el-form-item>
                </el-form>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                labelPosition: 'left',
                refunddialog: false, //  拒绝退款弹窗
                currentTabIndex: 0,
                activeName: 'first',
                repectReason: '',
                tableItem: [
                    {
                        time: '2017-07-07 15:00:00',
                        userName: '(+86)12312345678',
                        MemoryNum: '2017041020013033',
                        remark: 'www.baidu.com',
                        type: '网页打印',
                        Turnover: '2.00',
                        status: '已申请',
                        operation: {
                            interface: '用户界面',
                            handle: '处理'
                        }
                    },
                    {
                        time: '2017-07-07 15:00:00',
                        userName: '(+86)12312345678',
                        MemoryNum: '2017041020013033',
                        remark: 'www.baidu.com',
                        type: '网页打印',
                        Turnover: '2.00',
                        status: '已申请',
                        operation: {
                            interface: '用户界面',
                            handle: '处理'
                        }
                    }
                ]
            };
        },
        methods: {
            handleClick: function () {
                console.log('click');
            },
            close() {
                this.refunddialog = false;
            }
        }
    };
</script>
<style lang="scss">
    @import '../../style/common.scss';
    #refund {
        padding: 0 15px;
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
        float:right;
        height:40px;
        line-height:40px;
        display: inline-block;

    div {
        display: inline-block;
    }

    input[type=text] {
        display: inline-block;
        width: 150px;
    }
    input[type=button]{
        color:#fff;
        padding:4px 7px;
        display:inline-block;
        background: #999999;

    }
    input {
        border: 1px solid #eee;
        padding: 3px;
    }

    }
    }
</style>
