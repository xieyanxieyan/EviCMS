<template>
    <div id="operationLog">
        <div class="operationLogTop">
            <span>操作日志</span>
        </div>
        <div>
            <span>管理员：<input type="text"></span>
            <span>统计时间：<input type="text">至 <input type="text">
            <input type="button" value="搜索">
            </span>
        </div>
        <div>
            <table cellspacing="0" cellpadding="0" border="0">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>管理员</th>
                    <th>时间</th>
                    <th>操作</th>
                    <th>原因</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in operationData">
                    <td>{{item.ID}}</td>
                    <td>{{item.admin}}</td>
                    <td>{{item.time}}</td>
                    <td>{{item.operation}}</td>
                    <td>{{item.reason}}</td>
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
                operationData: [
                    {
                        ID: '12345',
                        admin: 'admin8',
                        time: '2017-4-10 20:01:30',
                        operation: '执行撤销用户(+86)134255858552',
                        reason: '用户错误操作需退款'
                    }
                ]
            };
        }
    };
</script>
<style lang="scss" type="text/scss">
@import '../../style/common.scss';
    #operationLog{
        padding:0 15px;
        .operationLogTop{
            padding:15px 0;
            span {
                border-left: 2px solid #324157;
                padding-left: 5px;
            }
        }
    }
</style>
