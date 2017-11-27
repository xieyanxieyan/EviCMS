<template>
    <div id="tradeData">
        <div class="tradeData"><span>交易统计</span></div>
        <template>
            <el-form :inline="true" :model="searchForm" ref="searchForm">
                <el-form-item label="统计方式：">
                    <el-select v-model="searchForm.value" size="small" placeholder="请选择">
                        <el-option
                            v-for="item in searchForm.options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="统计时间:">
                    <el-col :span=10>
                        <el-date-picker
                            size="small"
                            v-model="searchForm.value1"
                            type="date"
                            placeholder="选择开始时间"
                            :picker-options="searchForm.pickerOptions0">
                        </el-date-picker>
                    </el-col>
                    <el-col :span=3>至</el-col>
                    <el-col :span=10>
                        <el-date-picker
                            v-model="searchForm.value2"
                            type="date"
                            size="small"
                            placeholder="选择结束时间"
                            :picker-options="searchForm.pickerOptions0">
                        </el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-button @click="searchList" size="small">搜索</el-button>
                </el-form-item>
            </el-form>
        </template>
        <div>
            <table cellspacing="0" cellpadding="0" border="0">
                <thead>
                <tr>
                    <th>时间</th>
                    <th>充值</th>
                    <th>赠送</th>
                    <th>用户消费（充值）</th>
                    <th>用户消费（赠送）</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in tradeList">
                    <td>{{item.date}}</td>
                    <td>{{item.topUpFee}}</td>
                    <td>999</td>
                    <td>{{item.consumptionFee}}</td>
                    <td>{{item.consumptionGiftFee}}</td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="tradechart">
            <ve-line :data="chartData" :settings="chartSettings"></ve-line>
        </div>
    </div>
</template>
<script>
    import {tradeTime} from '../../api/statistic';
    import {translateTime, contains} from '../../assets/public';

    export default {
        created() {
            this.searchList();
            this.permissionControl();
            this.chartData;
            this.chartSettings;
        },
        data() {
            return {
                tradeList: [],
                chartData: {
                    columns: ['充值', '时间', '用户消费（充值）', '用户消费（赠送）'],
                    rows: []
                },
                chartSettings: {
                    metrics: ['充值', '用户消费（充值）', '用户消费（赠送）'],
                    dimension: ['时间']
                },
                searchForm: {
                    value: '1',
                    value1: '',
                    value2: '',
                    options: [{
                        value: '1',
                        label: '按日统计'
                    }, {
                        value: '2',
                        label: '按月统计'
                    }, {
                        value: '3',
                        label: '按年统计'
                    }],
                    pickerOptions0: {
                        disabledDate(time) {
                            return time.getTime() > Date.now();
                        }
                    }
                }
            };
        },
        methods: {
            // 按时间查询接口
            searchList() {
                this.chartData.rows = [];
                tradeTime(translateTime(this.searchForm.value1), translateTime(this.searchForm.value2), parseInt(this.searchForm.value)).then(res => {
                    if (res.data.error === 0) {
                        this.tradeList = res.data.data;
                        this.ArrayList(this.tradeList, this.chartData.rows);
                    }
                });
            },
            // 转换表格数组
            ArrayList(list, array) {
//                array = [];
                for (let i = 0; i < list.length; i++) {
                    array.push({'充值': list[i].topUpFee, '时间': list[i].date, '用户消费（充值）': list[i].consumptionFee, '用户消费（赠送）': list[i].consumptionGiftFee});
                }
            },
            // 权限控制函数
            permissionControl() {
                this.tradeList = !contains('statistic_trades_time'); // 是否有交易统计接口
            }
        }
    };
</script>
<style lang="scss" type="text/scss">
    @import '../../style/common';
    @import '../../scss/mixin.scss';

    #tradeData {
        padding: 0 15px;
        .tradeData {
            padding: 15px 0;
            span {
                @include span;
            }
        }
        table {
            table-layout: fixed;
        }
        .el-form {

            .el-select {
                width: 100px;
            }
            .el-col-3 {
                text-align: right;
                padding-right: 5px;
            }
            .el-form-item {
                margin-bottom: 0;
            }
        }
        .tradechart {
            background: #fff;
            margin-top: 10px;
        }
    }
</style>
