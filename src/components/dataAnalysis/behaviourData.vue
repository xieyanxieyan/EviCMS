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
                    <td>99</td>
                    <td>99</td>
                    <td>99</td>
                    <td>99</td>
                    <td>99</td>
                    <td>99</td>
                    <td>99</td>
                    <td>99</td>
                    <td>99</td>
                    <td>99</td>
                    <td>99</td>
                    <td>99</td>
                    <td>99</td>
                </tr>
                </tbody>
            </table>
        </div>
        <div>
            <span>统计方式
            <select name="" id="">
                <option value="">按日统计</option>
                <option value="">按月统计</option>
                <option value="">按年统计</option>
            </select>
            </span>
            <span>统计时间
            <input type="time">至
                <input type="time">
                <input type="button" value="搜索">
            </span>
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
                <tr>
                    <td>2017-05-14</td>
                    <td>99</td>
                    <td>99</td>
                    <td>99</td>
                    <td>99</td>
                    <td>99</td>
                    <td>99</td>
                    <td>99</td>
                    <td>99</td>
                    <td>99</td>
                    <td>99</td>
                    <td>99</td>
                    <td>99</td>
                    <td>99</td>
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
                currentTabIndex: 0,
                activeName: 'first',
                operaionName: ''
            };
        },
        methods: {
            handleClick: function () {
                console.log('click');
            }
        }
    };
</script>
<style lang="scss" type="text/scss">
    @import '../../style/common.scss';

    #behaviourData {
        padding: 0 15px;

    .behaviourData {
        padding: 15px 0;
    span {
        border-left: 2px solid #324157;
        padding-left: 5px;
    }

    }
    }
</style>
