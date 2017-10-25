<template>
    <div id="compManage">
        <div class="mbody">
            <div class="top">
                <span class="compManage">投诉建议管理</span>
                <div class="top-area">
                  <span>快速筛选：</span>
                    <div class="tab-wrapper">
                        <el-tabs v-model="activeName" @tab-click="handleClick()">
                            <el-tab-pane label="全部" name=0 ></el-tab-pane>
                            <el-tab-pane label="已处理" name=1></el-tab-pane>
                            <el-tab-pane label="未处理" name=2></el-tab-pane>
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
                        <td>{{item.request_time}}</td>
                        <td>{{item.report_id}}</td>
                        <td class="content">{{item.content}}</td>
                        <td>
                            <template v-if="item.status === 0">
                                <span>未处理</span>
                            </template>
                            <template v-else-if="item.status === 1">
                                <span>处理中</span>
                            </template>
                            <template v-else="item.status === 2">
                                <span>已处理</span>
                            </template>
                        </td>
                        <td><router-link to="/complaint" style="border:1px solid #20A0FF;padding:3px 15px;">处理</router-link></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import {feedbackList} from '../../api/operation';
    export default {
        created() {
            this._getCompManage();
        },
        data () {
            return {
                currentTabIndex: 0,
                activeName: 0,
                count: '',    //  总条数
                compManage: [
                ]
            };
        },
        methods: {
            handleClick() {
                this._getCompManage();
            },
//            获取公测员列表
            _getCompManage() {
                feedbackList(this.activeName).then(res => {
                   if (res.data.error === 0) {
                       this.compManage = res.data.data.data;
                     this.count = res.data.data.total;
                     console.log(this.activeName);
                   }
                });
            }
        }
    };

</script>

<style lang="scss" type="text/scss">
    @import '../../style/common.scss';
    #compManage{
        padding: 0 15px;
    a{
        color:#333;
    }
   table{
       table-layout:fixed;
       .content{
           overflow:hidden;
           text-overflow:ellipsis;
           white-space:nowrap;
       }
       td{
           border-bottom:1px solid #eee;
       }
   }

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

    /*tr td, tr th {*/
        /*width: 19%;*/
        /*height: 35px;*/
        /*line-height: 35px;*/
        /*font-size: 14px;*/
    /*}*/

    /*tr td {*/
        /*text-align: center;*/
    /*}*/

    /*th {*/
        /*color: #fff;*/
        /*background: #556386;*/
    /*}*/
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
