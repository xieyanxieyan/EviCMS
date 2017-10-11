<template>
    <div id="compManage">
        <div class="mbody">
            <div class="top">
                <span class="compManage">投诉建议管理</span>
                <div class="top-area">
                  <span>快速筛选：</span>
                    <div class="tab-wrapper">
                        <el-tabs v-model="activeName" @tab-click="handleClick">
                            <el-tab-pane label="全部" name="first"></el-tab-pane>
                            <el-tab-pane label="已处理" name="second"></el-tab-pane>
                            <el-tab-pane label="未处理" name="third"></el-tab-pane>
                        </el-tabs>
                    </div>

                </div>
                <div class="clear"></div>
            </div>
            <div class="list-area" id="data_list_area">
                <table border="0" cellspacing="0" cellpadding="=0">
                    <thead>
                    <tr>
                        <th>时间</th>
                        <th>用户名称</th>
                        <th>内容</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,index) in compManage">
                        <td>{{item.userOrder}}</td>
                        <td>{{item.userName}}</td>
                        <td>{{item.registrationTime}}</td>
                        <td>{{item.status}}</td>
                        <td><router-link to="/complaint" style="border:1px solid #20A0FF;padding:3px 15px;">{{item.operation}}</router-link></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                currentTabIndex: 0,
                activeName: 'second',
                compManage: [
                    {
                        userOrder: '12345',
                        userName: '(+8612312345678)',
                        registrationTime: '2017-4-10 20:01:30',
                        status: '未处理',
                        operation: '处理'
                    }
                ]
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
    #compManage{
        padding: 0 15px;
    a{
        color:#333;
    }
    /*.top{*/
        /*padding:10px 0;*/
    /*}*/

    .compManage {
        /*float: left;*/
        border-left: 2px solid #2D4D9F;
        padding-left: 15px;
        margin-right:40px;
        display:inline-block;
    }
    .el-tabs{
        .el-tabs__header{
            border-bottom:0;
        }
    }
    .top-area{
    width:500px;
    display:inline-block;
        .tab-wrapper{
            display: inline-block;
            vertical-align: -28px;
            margin-left: 35px;
            width: 280px;
        }
    }
    #compManage {
        background: #eee;
        height: 100%;
        padding: 15px 25px;
    }

    #compManage input {
        padding: 2px;
        /*display:inline-block;*/
    }


    table, thead, tbody {
        width: 100%;
    }

    tr td, tr th {
        width: 19%;
        height: 35px;
        line-height: 35px;
        font-size: 14px;
    }

    tr td {
        text-align: center;
    }

    th {
        color: #fff;
        background: #556386;
    }
    .el-button {
        margin: 0;
    }
    #compManage .grayline {
        border: 1px solid #ccc;
        height: 30px;
        margin: 0 20px;
        display:block;
    }
    }
</style>
