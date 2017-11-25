<template>
    <div id="operationLog">
        <div class="operationLogTop">
            <span>操作日志</span>
        </div>
        <div class="filter">
            <el-form :inline="true" :model="formInline">
                <el-form-item label="管理员">
                    <el-input v-model="formInline.user"></el-input>
                </el-form-item>
                <el-form-item label="统计时间">
                    <el-col :span="8">
                        <el-date-picker
                            v-model="formInline.time_begin"
                            type="datetime"
                            placeholder="选择开始日期时间">
                        </el-date-picker>
                        <!--<el-input type="text" placeholder="2017-09-04 01:43:13" v-model="formInline.time_begin"></el-input>-->
                    </el-col >
                    <el-col :span="4">至</el-col>
                    <el-col :span="8">
                        <el-date-picker
                            v-model="formInline.time_end"
                            type="datetime"
                            placeholder="选择结束日期时间">
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
                <tr v-for="(item,index) in operationData" :key="item.id">
                    <td>{{item.admin_id}}</td>
                    <td>{{item.username}}</td>
                    <td>{{item.add_time}}</td>
                    <td>{{item.status}}</td>
                    <td>{{item.log_content}}</td>
                </tr>
                </tbody>
            </table>
        </div>
        <!--分页功能-->
        <div class="pagination" v-if="total>15">
            <el-pagination
                layout="prev, pager, next,total"
                :total="total"
                :page-size="perpage"
                :current-page.sync="currentPage"
                @current-change="handleCurrentChange()"
            >
            </el-pagination>
        </div>
    </div>
</template>
<script>
    import {getAdminLog} from '../../api/setuser';
    import {formatDate, contains} from '../../assets/public';
    export default {
        created() {
            this._adminList();
        },
        data () {
            return {
                total: 0, // 总条数
                currentPage: 1, // 当前页码
                perpage: 15, // 每页多少条
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
                operationData: []
            };
        },
        methods: {
            _adminList() {
                getAdminLog(this.formInline.user, formatDate(this.formInline.time_begin), formatDate(this.formInline.time_end), this.perPage, this.currentPage).then(res => {
                   if (res.data.error === 0) {
                      this.operationData = res.data.data.data;
                      this.total = res.data.data.total;
                     // console.log(this.operationData, 'admin_logs_list');
                   }
                });
            },
            // 分页
            handleCurrentChange() {
                this._adminList();
            },
            // 权限控制
            permissionControl() {
                this.operationData = !contains('admin_logs_list') ? this.operationData : [];
            }
        }
    };
</script>
<style lang="scss" type="text/scss">
@import '../../style/common.scss';
@import '../../scss/mixin.scss';
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
               @include span;
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
