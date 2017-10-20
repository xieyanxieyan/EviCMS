<template>
    <div id="tradeData">
        <div class="tradeData"><span>交易统计</span></div>
        <div>
            <span>统计方式：
                <select name="" id="">
                    <option value="">按日统计</option>
                    <option value="">按月统计</option>
                    <option value="">按年统计</option>
                </select>
            </span>
            <span>
                统计时间：
                <input type="time">至
                <input type="time">
            </span>
        </div>
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
                <tr>
                    <td>2017-07-07</td>
                    <td>999.00</td>
                    <td>999.00</td>
                    <td>999.00</td>
                    <td>999.00</td>
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
    export default{
        created: function () {
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
        }
    };
</script>
<style lang="scss" type="text/scss">
    @import '../../style/common';
#tradeData{
    padding:0 15px;
  .tradeData{
      padding:15px 0;
      span{
          border-left: 2px solid #324157;
          padding-left: 5px;
      }
  }
    .tradechart{
        background: #fff;
        margin-top:10px;
    }
}
</style>
