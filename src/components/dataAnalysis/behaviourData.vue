<template>
    <div id="behaviourData">
        <div class="behaviourData"><span>行为分析</span></div>
        <div>
            <table cellspacing="0" cellpadding="0" border="0">
                <thead>
                <tr>
                    <th>操作类型</th>
                    <th>登录</th>
                    <th>网页打印</th>
                    <th>文档保全</th>
                    <th>录音存证</th>
                    <th>录像存证</th>
                    <th>拍照存证</th>
                    <th>截屏存证</th>
                    <th>验证</th>
                    <th>全挂</th>
                    <th>单挂</th>
                    <th>出证</th>
                    <th>纸质出证</th>
                    <th>出庭</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>操作总数</td>
                    <td>{{AllData.loginCount}}</td>
                    <td>{{AllData.webPrintCount}}</td>
                    <td>99</td>
                    <td>99</td>
                    <td>99</td>
                    <td>99</td>
                    <td>99</td>
                    <td>99</td>
                    <td>99</td>
                    <td>99</td>
                    <td>{{AllData.certifyCount}}</td>
                    <td>99</td>
                    <td>{{AllData.courtCount}}</td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="statistical">
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
        </div>
        <div>
            <table cellpadding="0" cellspacing="0" border="0">
                <thead>
                <th>时间</th>
                <th>登录</th>
                <th>网页打印</th>
                <th>文档保全</th>
                <th>录音存证</th>
                <th>录像存证</th>
                <th>拍照存证</th>
                <th>截屏存证</th>
                <th>验证</th>
                <th>全挂</th>
                <th>单挂</th>
                <th>出证</th>
                <th>纸质出证</th>
                <th>出庭</th>
                </thead>
                <tbody>
                <tr v-for="(item, index) in searchData">
                    <td>{{item.date}}</td>
                    <td>{{item.loginCount}}</td>
                    <td>{{item.webPrintCount}}</td>
                    <td>99</td>
                    <td>99</td>
                    <td>99</td>
                    <td>99</td>
                    <td>99</td>
                    <td>99</td>
                    <td>99</td>
                    <td>99</td>
                    <td>{{item.certifyCount}}</td>
                    <td>99</td>
                    <td>{{item.courtCount}}</td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="behaviour">
            <ve-line :data="chartData" :settings="chartSettings"></ve-line>
        </div>
    </div>
</template>
<script>
    import {actionsTotal, actionTime} from '../../api/statistic';
    import {translateTime} from '../../assets/public';
    export default {
        created() {
            this.chartData = {
                columns: ['日期', '成本', '利润', '占比', '其他'],
                rows: [
                    { '成本': 1523, '日期': '1月1日', '利润': 1523, '占比': 0.12, '其他': 100 },
                    { '成本': 1223, '日期': '1月2日', '利润': 1523, '占比': 0.345, '其他': 100 },
                    { '成本': 2123, '日期': '1月3日', '利润': 1523, '占比': 0.7, '其他': 100 },
                    { '成本': 4123, '日期': '1月4日', '利润': 1523, '占比': 0.31, '其他': 100 },
                    { '成本': 3123, '日期': '1月5日', '利润': 1523, '占比': 0.12, '其他': 100 },
                    { '成本': 7123, '日期': '1月6日', '利润': 1523, '占比': 0.65, '其他': 100 }
                ]
            };
            this.chartSettings = {
                metrics: ['成本', '利润'],
                dimension: ['日期']
            };
            this._getTotalData();
            this.searchList();
        },
        data () {
            return {
                currentTabIndex: 0,
                activeName: 'first',
                operaionName: '',
                AllData: [],
                searchData: [],
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
            handleClick: function () {
                console.log('click');
            },
            _getTotalData() {
                actionsTotal().then(res => {
                    if (res.data.error === 0) {
                        this.AllData = res.data.data || [];
                    }
                });
            },
            searchList() {
                actionTime(translateTime(this.searchForm.value1), translateTime(this.searchForm.value2), parseInt(this.searchForm.value)).then(res => {
                   if (res.data.error === 0) {
                       this.searchData = res.data.data;
                       console.log(this.searchData);
                   }
                });
            }
        }
    };
</script>
<style lang="scss" type="text/scss">
    @import '../../style/common.scss';
    @import '../../scss/mixin.scss';
    #behaviourData {
        padding: 0 15px;

    .behaviourData {
        padding: 15px 0;
    span {
       @include span;
    }

    }
        .el-form{
            .el-form-item{
                margin-bottom: 0;
                .el-col-3{
                    text-align: right;
                }
                .el-select{
                    width:100px;
                }
            }
        }
        .statistical{
            margin:10px 0;
        }
        .behaviour{
            background: #fff;
            margin-top:10px;
        }
    }
</style>
