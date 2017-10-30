<template>
    <div id="detailCourt">
        <div class="detailCourtTop">
            <span>出庭管理--出庭详情</span>
        </div>
        <div class="message">
            <div class="order-number">
            <span>
                <i></i>
                <strong>用户：</strong>
                <small>(+86)13412345678</small>
            </span>
                <span>
                     <i></i>
                <strong>用户序号：</strong>
                <small>{{userId}}</small>
            </span>
                <span>
                     <i></i>
                <strong>存证编号：</strong>
                <small>20170605-122030-123456</small>
            </span>
                <el-button type="success" style="float:right">预览</el-button>
            </div>
            <div class="gressBar">
                <el-steps :space="200" :active="1">
                    <el-step title="用户申请" description="2017-6-6 17:30:20"></el-step>
                    <el-step title="联系确认" description="2017-6-6 17:30:20"></el-step>
                    <el-step title="出庭作证完成" description="2017-6-6 17:30:20"></el-step>
                </el-steps>
            </div>
        </div>
        <div  class="communication">
            <div class="communicationTitle">
                <i></i>
                <span>沟通记录</span>
                <span style="float:right">
                    <button>+</button>
                </span>
            </div>
            <div style="padding:20px 0;">
                <table cellpadding="0" cellspacing="0" border="0">
                    <thead>
                    <tr>
                        <th>沟通时间</th>
                        <th>沟通内容</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,index) in communicationRecord">
                        <td>{{item.communicationTime}}</td>
                        <td>{{item.content}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="trailMessage">
            <div class="trailTitle">
                <i></i>
                <strong>出庭信息</strong>
            </div>
            <div class="trailForm">
                <el-form :inline="true" :label-position="labelPosition" :model="formInline" class="demo-form-inline"
                         label-width="100px">
                    <el-form-item label="姓名：">
                        <el-input v-model="formInline.username"></el-input>
                    </el-form-item>
                    <el-form-item label="支付日期：">
                        <el-input v-model="formInline.datatime"></el-input>
                    </el-form-item>
                    <el-form-item label="地点：">
                        <el-input v-model="formInline.address"></el-input>
                    </el-form-item>
                    <el-form-item label="支付金额：">
                        <el-input v-model="formInline.money"></el-input>
                    </el-form-item>
                    <el-form-item label="出庭人员:">
                        <el-input v-model="formInline.trailPerson"></el-input>
                    </el-form-item>
                    <el-form-item label="支付方式：">
                        <el-input v-model="formInline.method"></el-input>
                    </el-form-item>
                    <el-form-item label="交通方式：">
                        <el-input v-model="formInline.transportation"></el-input>
                    </el-form-item>
                    <el-form-item label="交易备注:">
                        <el-input v-model="formInline.tradingNote"></el-input>
                    </el-form-item>
                    <el-form-item label="住宿情况:">
                        <el-input v-model="formInline.commodity"></el-input>
                    </el-form-item>
                </el-form>
                <div class="submit">
                    <el-button type="info">保存</el-button>
                    <el-button type="warning">交易确认</el-button>
                    <el-button type="success">出庭完成</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {courtDetail} from '../../../api/operation';
    export default {
        created() {
            this._detailMessage();
        },
        data () {
            return {
                labelPosition: 'left',
                userId: '',
                formInline: {
                    username: '',
                    datatime: '',
                    address: '',
                    money: '',
                    trailPerson: '',
                    method: '',
                    transportation: '',
                    tradingNote: '',
                    commodity: ''
                },
                communicationRecord: [
                    {
                        communicationTime: '2017-07-10 12:00：00',
                        content: '沟通内容沟通内容沟通内容沟通内容沟通内容沟通内容沟通内容沟通内容沟通内容沟通内容沟通内容沟通内容沟通内容沟通内容'
                    },
                    {
                        communicationTime: '2017-07-10 12:00：00',
                        content: '沟通内容沟通内容沟通内容沟通内容沟通内容沟通内容沟通内容沟通内容沟通内容沟通内容沟通内容沟通内容沟通内容沟通内容'
                    },
                    {
                        communicationTime: '2017-07-10 12:00：00',
                        content: '沟通内容沟通内容沟通内容沟通内容沟通内容沟通内容沟通内容沟通内容沟通内容沟通内容沟通内容沟通内容沟通内容沟通内容'
                    },
                    {
                        communicationTime: '2017-07-10 12:00：00',
                        content: '沟通内容沟通内容沟通内容沟通内容沟通内容沟通内容沟通内容沟通内容沟通内容沟通内容沟通内容沟通内容沟通内容沟通内容'
                    }
                ]
            };
        },
        methods: {
            onSubmit () {
                console.log('submit!');
            },
            _detailMessage() {
                courtDetail(this.$route.params.courtId).then(res => {
                  if (res.data.error === 0) {
                      this.userId = res.data.data.user_id;
                  }
                });
            }
        }
    };
</script>
<style lang="scss" type="text/scss">
    @import '../../../style/common.scss';
    @import '../../../scss/mixin';

    #detailCourt {
        padding: 0 15px;

        .detailCourtTop {
            padding: 15px 0;

            span {
                border-left: 2px solid #324157;
                padding-left: 5px;
            }
        }
        .message {
            background: #fff;
            padding: 0 15px;
            .gressBar {
                padding: 15px 0;
            }
            .order-number {
                padding: 20px 0;
                border-bottom: 1px solid #eee;
            }

            th {
                background: #6392ff;
            }
            .el-steps{
                text-align: center;
            }

        }
        .order-number > span {
            display: inline-block;
            width: 240px;
            position: relative;
            padding-left: 30px;
            &:first-child i {
                @include dotted(#31C071);
                top: 6px;
                left: 0;
            }
            &:nth-child(2) i {
                @include dotted(#6392ff);
                top: 6px;
                left: 0;
            }
            &:nth-child(3) i {
                @include dotted(#FE5241);
                top: 6px;
                left: 0;
            }
        }
        table {
            table-layout: fixed;
            .el-input {
                display: inline-block;
                width: 200px;
            }
            td {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            .el-input {
                width: 500px;
            }

        }
        .trailMessage {
            background: #fff;
            margin-top: 15px;
            padding: 15px;
            .trailTitle {
                padding-bottom: 15px;
                border-bottom: 1px solid #eee;
            }
        }
        .communication{
            background: #fff;
            margin-top:15px;
            position:relative;
            padding:0 15px;
            & i{
                @include dotted(#4780FF);
                top: 15px;
                left: 15px;
            }
            span{
                margin-left:20px;
            }
            .communicationTitle{
                border-bottom:1px solid #eee;
                padding:15px 0;
                button{
                    background: #4780FF;
                    color:#fff;
                    border:0;
                }
            }
        }
        .trailForm {
            padding: 15px 0;
        }
        .submit {
            display: flex;
            width: 700px;
            margin: 0 auto;
            justify-content: space-between;
        }
    }
</style>
