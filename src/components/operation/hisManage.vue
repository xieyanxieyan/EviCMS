<template>
    <div id="HisManage">
        <div class="histop"><span>出证管理</span><span class="quickSelect">快速筛选:</span>
            <div class="tab-wrapper">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="全部" name=""></el-tab-pane>
                    <el-tab-pane label="待处理（99）" name="2"></el-tab-pane>
                    <el-tab-pane label="待打印" name="3"></el-tab-pane>
                    <el-tab-pane label="待发件" name="4"></el-tab-pane>
                    <el-tab-pane label="已发件" name="5"></el-tab-pane>
                    <el-tab-pane label="已完成" name="6"></el-tab-pane>
                </el-tabs>
            </div></div>
        <div>
            <!--<form action="#" :model="formIn">-->
            <!--<div>用户名称：</span>-->
            <!--<input type="text" v-model="formIn.username">-->
            <!--</div>-->
            <!--<div>-->
            <!--<span>存证号：</span>-->
            <!--<input type="text" :model="formIn.cert_num">-->
            <!--</div>-->
            <!--<div>-->
            <!--<span>申请时间：</span>-->
            <!--<input type="time" :model="formIn.time_begin">至-->
            <!--<input type="time" :model="formIn.time_end">-->
            <!--<input type="button" value="搜索">-->
            <!--</div>-->
            <!--</form>-->
            <el-form :inline="true" :model="formIn">
                <el-form-item label="用户名称:">
                    <el-input v-model="formIn.userName" size="small"></el-input>
                </el-form-item>
                <el-form-item label="存证号：">
                    <el-input v-model="formIn.Memory" size="small"></el-input>
                </el-form-item>
                <el-form-item label="时间：">
                        <el-date-picker
                            v-model="formIn.time_begin"
                            type="date"
                            size="small"
                            placeholder="选择开始日期时间">
                        </el-date-picker>
                </el-form-item>
                   <el-form-item label="至">
                        <el-date-picker
                            v-model="formIn.time_end"
                            type="date"
                            size="small"
                            placeholder="选择结束日期时间">
                        </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button size="small">搜索</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div>
            <table cellpadding="0" cellspacing="0" border="0">
                <thead>
                <tr>
                    <th>时间</th>
                    <th>用户</th>
                    <th>存证号</th>
                    <th>类型</th>
                    <th>状态</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody v-bind:class="{hide: hisList}">
                <tr v-for="(item,index) in hisData">
                    <td>{{item.req_time}}</td>
                    <td>{{item.phone}}</td>
                    <td>{{item.cert_no}}</td>
                    <td>{{item.type}}</td>
                    <td>
                       {{item.status}}
                    </td>
                    <td><a href="javascript:void(0);"
                           @click="toHisDetail(index)"
                           style="color:#20a0ff;padding:0 5px;border:1px solid">出证详情</a></td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="pagination" v-bind:class="{hide: hisList}" v-if="total>15">
            <el-pagination
                layout="prev, pager, next,total"
                :total="total"
                :page-size="perPage"
                :current-page.sync="currentPage"
                @current-change="handleCurrentChange()"
            ></el-pagination>
        </div>
    </div>
</template>
<script>
    import {certifyList} from '../../api/operation';
    import {contains, translateTime} from '../../assets/public';
    export default {
        created() {
            this.certList();
            this.controlPermission();
        },
        data() {
            return {
                currentTabIndex: 0,
                activeName: '1',
                currentPage: 1,
                total: 0,
                perPage: 15, // 每页显示多少条
                hisList: true, // 出证列表是否显示
                hisDetail: true, // 出证详情按钮是否显示
                formIn: {
                    username: '',
                    cert_num: '',
                    time_begin: '',
                    time_end: ''
                },
                hisData: []
            };
        },
        methods: {
            handleClick: function () {
                this.certList();
            },
            certList() {
                let status = parseInt(this.activeName);
                certifyList(this.formIn.username || undefined, this.formIn.cert_num || undefined, translateTime(this.formIn.time_begin), translateTime(this.formIn.time_end), status, this.perPage, this.currentPage).then(res => {
                    this.hisData = res.data.data.data;
                    this.total = res.data.data.total;
                });
            },
            handleCurrentChange() {
                this.certList();
            },
            toHisDetail(index) {
                this.$router.push({
                    name: 'paperDetail',
                    params: {
                        detailId: this.hisData[index].apply_id
                    }
                });
            },
            // 权限控制
            controlPermission() {
                this.hisList = !contains('operation_certify_list'); // 是否有显示出证列表权限
                this.hisDetail = !contains('operation_certify_detail'); // 是否有出证详情权限
            }
        }
    };
</script>
<style lang="scss" type="text/scss">
    @import '../../style/common.scss';
    @import '../../scss/mixin.scss';
    #HisManage {
        padding: 0 15px;
        th, td {
            width: 16%;
        }
        .histop {
            padding: 15px 0;
            padding-bottom: 0;
            &>span{
                @include span;
            }
            .quickSelect{
                border:0;
                margin-left: 20px;
            }
        }

        .tab-wrapper {
            display: inline-block;
            vertical-align: -28px;
            width: 340px;
            /*margin-left: 20px;*/
            .el-tabs__item {
                padding: 0 5px;
                font-size:13px;
            }

        }
        .el-date-editor.el-input{width:inherit}
        .el-tabs__header {
            border-bottom: 0;
        }

       .el-form {
            display: inline-block;
           margin-bottom:10px;
           .el-input__inner{
               width:120px;
           }
           .el-date-editor--datetime{
               width:120px;
           }
           .el-form-item__label{
               padding-right:5px;
               font-size:13px;
           }
            .el-col-3{
                text-align:right;
                padding-right:3px;
            }
           .el-form-item{
               margin:0;
           }
        }
        .pagination {
            margin: 15px 0;
            text-align: center;
            .el-pagination {
                display: inline-block;
            }
        }
    }
</style>
