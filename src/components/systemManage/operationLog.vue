<template>
    <div id="operationLog">
        <div class="operationLogTop">
            <span>操作日志</span>
        </div>
        <div class="filter">
            <el-form :inline="true" :model="formInline">
                <el-form-item label="管理员">
                    <el-input v-model="formInline.admin"></el-input>
                </el-form-item>
                <el-form-item label="统计时间">
                    <el-col :span="10">
                        <el-input type="text" placeholder="2017-09-04 01:43:13" v-model="formInline.time_begin"></el-input>
                    </el-col >
                    <el-col :span="4">至</el-col>
                    <el-col :span="10">
                        <el-input type="text" placeholder="2017-09-04 01:43:13" v-model="formInline.time_end"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-button style="background:#999999;color:#fff" @click="_adminList">搜索</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="">
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
        <!--分页功能-->
        <div class="pagination">
            <el-pagination
                layout="prev, pager, next"
                :total="1000">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    import {getAdminList} from '../../api/setuser';
    export default {
        created() {
            this._adminList();
        },
        data () {
            return {
                formInline: {
                    user: '',
                    region: '',
                    time_begin: '',
                    time_end: ''
                },
                admin: '',
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
        },
        methods: {
            _adminList() {
                getAdminList('admin', '2017-01-01 20:00:00', '2017-11-01 20:00:00').then(res => {
                    console.log(res);
                });
            }
        }
    };
</script>
<style lang="scss" type="text/scss">
@import '../../style/common.scss';
    #operationLog{
        padding:0 15px;

.el-form {
    margin: 0;
    float: right;

    .el-form-item {
        margin-bottom: 0px;
        .el-col-4{
            text-align:center;
        }
    }

    .el-input__inner {
        border-radius: 0;
        display:inline-block;
        width:inherit;
        height:30px;
    }
}

.operationLogTop{
    display: inline-block;
            padding:15px 0;
            span {
                border-left: 2px solid #324157;
                padding-left: 5px;
            }
        }
        .filter{
            margin-bottom:10px;
           float:right;
            margin-top:10px;
        }
        .pagination{
            text-align: center;
        }
    }
</style>
