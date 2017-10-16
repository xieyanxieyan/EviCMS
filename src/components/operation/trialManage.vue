<template>
    <div id="TrialManage">
        <div class="TrialManagetop"><span>出庭管理</span></div>
        <div><span>快速筛选:</span>
            <div class="tab-wrapper">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="全部" name="first"></el-tab-pane>
                    <el-tab-pane label="待处理（99）" name="second"></el-tab-pane>
                    <el-tab-pane label="已确认" name="third"></el-tab-pane>
                    <el-tab-pane label="已出庭" name="fourth"></el-tab-pane>
                </el-tabs>
            </div>
            <form action="#">
                <div>
                    <span>时间：</span>
                    <input type="time">至
                    <input type="time">
                    <input type="button" value="搜索">
                </div>
            </form>
            <!--<el-form :inline="true" :model="formInline" >-->
            <!--<el-form-item label="用户名称:">-->
            <!--<el-input v-model="formInline.userName"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="存证号：">-->
            <!--<el-input v-model="formInline.Memory"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="申请时间：">-->
            <!--<el-col :span="8">-->
            <!--<el-time-picker type="fixed-time" v-model="formInline.data1" style="width:100%"></el-time-picker>-->
            <!--</el-col>-->
            <!--<el-col :span="1">至</el-col>-->
            <!--<el-col :span="8">-->
            <!--<el-time-picker type="fixed-time" v-model="formInline.data2" style="width:100%"></el-time-picker>-->
            <!--</el-col>-->
            <!--<el-col :span="6">-->
            <!--<el-button>搜索</el-button>-->
            <!--</el-col>-->
            <!--</el-form-item>-->
            <!--</el-form>-->
        </div>
        <div>
            <table cellspacing="0" cellpadding="0" border="0">
                <thead>
                <tr>
                    <th>时间</th>
                    <th>用户</th>
                    <th>存证号</th>
                    <th>状态</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in TrialData">
                    <td>{{item.time}}</td>
                    <td>{{item.user}}</td>
                    <td>{{item.MemoryNum}}</td>
                    <td>{{item.status}}</td>
                    <td><router-link to="/detailCourt" style="border:1px solid;color:#6F98FF">{{item.operation}}</router-link></td>
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
                TrialData: [
                    {
                        time: '2017-07-07  15:00:00',
                        user: '(+86)12312345678',
                        MemoryNum: '2017041020013033',
                        status: '待审核',
                        operation: '查看审核'
                    },
                    {
                        time: '2017-07-07  15:00:00',
                        user: '(+86)12312345678',
                        MemoryNum: '2017041020013033',
                        status: '待审核',
                        operation: '查看审核'
                    }
                    ]
//                formInline: {
//                    userName: '',
//                    Memory: ''
//                }
            };
        },
        methods: {
            handleClick: function () {
                console.log('click');
            }
        }
    };
</script>
<style lang="scss">
    @import '../../style/common.scss';
    #TrialManage {
        padding: 0 15px;
    .TrialManagetop {
        padding: 15px 0;

    span {
        border-left: 2px solid #324157;
        padding-left: 5px;
    }

    }
    .tab-wrapper {
        display: inline-block;
        vertical-align: -28px;
        width: 320px;
        margin-left: 20px;

    }

    .el-tabs__header {
        border-bottom: 0;
    }
.el-tabs__item{
    padding:0 10px;
}
    form {
        float:right;
        height:40px;
        line-height:40px;
        display: inline-block;

    div {
        display: inline-block;
    }

    input[type=button]{
        color:#fff;
        padding:4px 7px;
        display:inline-block;
        background: #999999;

    }
    input {
        border: 1px solid #eee;
        padding: 3px;
    }

    }
    }
</style>
