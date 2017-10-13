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
    </div>
</template>
<script>
    export default{
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
}
</style>
