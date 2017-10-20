<template>
    <div id="userData">
        <div class="userDataTop">
            <span>用户数据</span>
        </div>
        <div class="DataCount">
            <span>
                <i></i>
                <strong>总注册用户：</strong>
                <small>{{userData.totalUser}}人</small>
            </span>
            <span>
                <i></i>
                <strong>充值用户数：</strong>
                <small>{{userData.rechargeUser}}人</small>
            </span>
            <span>
                <i></i>
                <strong>上月新增：</strong>
                <small>{{userData.pastnewData}}人</small>
            </span>
            <span>
                <i></i>
                <strong>当月新增：</strong>
                <small>{{userData.nownewData}}人</small>
            </span>
        </div>
        <div class="statistical">
            <span>统计方式：
            <input type="text">
               <select name="" id="">
                   <option value="按日统计">按日统计</option>
                   <option value="按月统计">按月统计</option>
                   <option value="按年统计">按年统计</option>
               </select>
            </span>
            <span>
                统计时间：
                <input type="time">至
                <input type="time">
            </span>
        </div>
        <div>
            <table cellpadding="0" cellspacing="0" border="0">
                <thead>
                <tr>
                    <th>时间</th>
                    <th>新增注册用户数</th>
                    <th>新增充值用户数</th>
                    <th>登录用户数</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,indx) in statisticalData">
                    <td>{{item.time}}</td>
                    <td>{{item.newregistorUser}}</td>
                    <td>{{item.newpayUser}}</td>
                    <td>{{item.loginUser}}</td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="chart">
            <ve-line :data="chartData" :setting="chartSettings"></ve-line>
        </div>

    </div>
</template>
<script>
    export default {
        data () {
            return {
                userData: {
                    totalUser: 9999,
                    rechargeUser: 9998,
                    pastnewData: 9999,
                    nownewData: 9999
                },
                statisticalData: [
                    {
                        time: '2017-07-07',
                        newregistorUser: '30',
                        newpayUser: '30',
                        loginUser: '20'
                    },
                    {
                        time: '2017-07-07',
                        newregistorUser: '30',
                        newpayUser: '30',
                        loginUser: '20'
                    }
                ]
            };
        },
        created: function () {
            this.chartData = {
                columns: ['日期', '新增注册用户数', '新增充值用户数', '登录用户数'],
                rows: [
                    {'新增注册用户数': 1523, '日期': '1月1日', '新增充值用户数': 1523, '登录用户数': 0.12}
                ]
            };
            this.chartSettings = {
                metrics: ['成本', '利润'],
                dimension: ['日期']
            };
        }
    };
</script>
<style lang="scss" type="text/scss">
    @import '../../scss/mixin';
    @import '../../style/common.scss';

    #userData {
        padding: 0 15px;
        .userDataTop {
            padding: 15px 0;
            span {
                border-left: 2px solid #324157;
                padding-left: 5px;
            }
        }
        .paginnation{
            text-align:center;
        }
        .DataCount {
            padding: 20px 0;
            background: #fff;
            margin-bottom: 20px;
            span {
                position: relative;
                display: inline-block;
                width: 23%;
                text-align: center;
                border-right: 1px solid #eee;
                small {
                    font-size: 16px;
                    margin-left: 20px;
                }
                &:nth-child(1) i {
                    @include dotted(#2CBE6C);
                    left: 25px;
                    top: 5px;
                }
                &:nth-child(2) i {
                    @include dotted(#f38942);
                    left: 25px;
                    top: 5px;
                }
                &:nth-child(3) i {
                    @include dotted(#5184f8);
                    left: 25px;
                    top: 5px;
                }
                &:nth-child(4) i {
                    @include dotted(#6a57ff);
                    left: 25px;
                    top: 5px;
                }
                &:last-child {
                    border: 0;
                }
            }
        }
        .statistical {
            padding: 20px 0;
            border-top: 1px solid #ddd
        }
        .chart{
            background:#fff;
            margin-top:10px;
        }
    }
</style>
