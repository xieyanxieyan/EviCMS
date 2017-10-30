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
                        <el-date-picker
                            v-model="formInline.time_begin"
                            type="date"
                            placeholder="选择日期"
                            :picker-options="pickerOptions0">
                        </el-date-picker>
                        <!--<el-input type="text" placeholder="2017-09-04 01:43:13" v-model="formInline.time_begin"></el-input>-->
                    </el-col >
                    <el-col :span="4">至</el-col>
                    <el-col :span="10">
                        <el-date-picker
                            v-model="formInline.time_end"
                            type="date"
                            placeholder="选择日期"
                            :picker-options="pickerOptions0">
                        </el-date-picker>
                        <!--<el-input type="text" placeholder="2017-09-04 01:43:13" v-model="formInline.time_end"></el-input>-->
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-button style="background:#999999;color:#fff" @click="_adminList" size="small">搜索</el-button>
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
                    <td>{{item.admin_id}}</td>
                    <td>{{item.username}}</td>
                    <td>{{item.created_at}}</td>
                    <td>{{item.status}}</td>
                    <td>用户错误操作需退款</td>
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
    import {translateTime} from '../../assets/public';
    export default {
        created() {
            this._adminList();
        },
        data () {
            return {
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    }
                },
                    formInline: {
                    user: '',
                    region: '',
                    time_begin: '',
                    time_end: ''
                },
                admin: '',
                operationData: []
            };
        },
        methods: {
            _adminList() {
                getAdminList(this.formInline.user, translateTime(this.formInline.time_begin), translateTime(this.formInline.time_end)).then(res => {
                   if (res.data.error === 0) {
                      this.operationData = res.data.data.data;
                      console.log(this.operationData);
                   }
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
