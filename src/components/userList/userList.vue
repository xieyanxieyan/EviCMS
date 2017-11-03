<template>
    <div id="userList">
        <div class="mbody">
            <div class="top">
                <span class="userList"><span>用户列表</span></span>
                <div class="top-area">
                    <el-form :inline="true" :model="form">
                        <el-form-item label="用户名称：">
                            <el-input v-model="form.phone"   size="small"></el-input>
                        </el-form-item>
                        <el-form-item label="注册时间:">
                            <template>
                            <div>
                            <el-date-picker
                                size="small"
                                v-model="form.value"
                                type="daterange"
                                align="right"
                                unlink-panels
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                            </el-date-picker>
                            </div>
                            </template>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="serachList">搜索</el-button>
                            <span class="grayline">|</span>
                            <el-button>
                                <router-link to="/addUser"> 添加用户</router-link>
                            </el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="clear"></div>
            </div>
            <div class="list-area" id="data_list_area">
                <table border="0" cellspacing="0" cellpadding="=0">
                    <thead>
                    <tr>
                        <th>用户序号</th>
                        <th>用户名称</th>
                        <th>注册时间</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,index) in userList.data">
                        <td>{{item.user_id}}</td>
                        <td>{{item.cell_phone}}</td>
                        <td>{{item.reg_time}}</td>
                        <td>
                            <template v-if="item.status === 0">
                                <span>正常</span>
                            </template>
                            <template v-else="item.status === 1">
                                <span style="color:#ff4949">冻结</span>
                            </template>
                        </td>
                        <td>
                            <span @click="touserDetail(index)"><a href="javascript:void(0);">详情/编辑</a></span>
                            <span class="inter"><a href="javascript:void(0);">用户界面</a></span>
                            <template v-if="item.status === 0">
                                <span @click="frozen(index)" class="redbutton">
                                    <a href="javascript:void(0);">冻结</a>
                                </span>
                            </template>
                            <template v-else="item.status === 1">
                                <span @click="frozen(index)" class="greenbutton">
                                    <a href="javascript:void(0);">解冻</a>
                                </span>
                            </template>

                        </td>
                    </tr>
                    </tbody>
                </table>
                <!--分页-->
                <div class="pagination">
                    <el-pagination
                        layout="prev, pager, next,total"
                        :total="total"
                        :page-size="13"
                        :current-page.sync="currentPage"
                        @current-change="handleCurrentChange()"
                    >
                    </el-pagination>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import {getUserList, userFreeze} from '../../api/User';
    import {translateTime} from '../../assets/public';
    export default {
        created() {
            this.getList();
        },
        data() {
            return {
                total: 0,
                currentTabIndex: 0,
                userList: [],
                currentPage: 1,
                form: {
                    phone: '',
                    begin_time: '',
                    end_time: '',
                    value: '',
                    time: ''
                }
            };
        },
        methods: {
            getList() {
                getUserList(this.form.phone, this.form.begin_time, this.form.end_time).then(res => {
                    this.userList = res.data.data;
                    this.total = this.userList.total;
                });
            },
            serachList() {
                this.getList();
                this.time = this.form.value.toString().split(',');
                this.begin_time = translateTime(this.time[0]);
                this.end_time = translateTime(this.time[1]);
            },
//            将时间转换成YYYY-MM-DD格式
//            translateTime(time) {
//                let date = new Date(time);
//                let Y = date.getFullYear() + '-';
//                let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
//                let D = date.getDate() + ' ';
//                return Y + M + D;
//            },
//            到用户详情
            touserDetail(index) {
                this.$router.push({name: 'userDetail', params: {detailId: this.userList.data[index].user_id}});
            },
//            冻结用户
            frozen(index) {
                userFreeze(this.userList.data[index].user_id, this.userList.data[index].status).then(res => {
                    if (res.error === 0) {
                        alert('操作成功');
                    }
                });
                this.getList();
            },
            handleCurrentChange() {
                console.log('分页');
            }
        }
    };

</script>

<style lang="scss">
    #userList {
        padding: 0 15px;

    a {
        color: #333;
        /*display:inline-block;*/
        padding: 2px;
    }

    .top {
        padding: 15px 0;
    }

    .top-area {
        float: right;
        .el-form-item {
            margin-bottom: 0;
        }
    }

    .userList {
        float: left;
        border-left: 2px solid #2D4D9F;
        padding-left: 15px;
    }

    .el-button {
        padding: 5px 10px;
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
        border-bottom: 1px solid #eee;

    .redbutton a {
        color: #ff4949;
        border: 1px solid;
    }

    .greenbutton a {
        color: #4cce6d;
        border: 1px solid;
    }

    a {
        color: #20a0ff;
        border: 1px solid;
    }

    .inter {
        margin: 0 15px;
    }

    }

    th {
        color: #fff;
        background: #556386;
    }

    .top-area .el-button--default {
        color: #20a0ff;
        border: 1px solid #20a0ff;
        padding: 5px;
    }

    .el-button {
        margin: 0;
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
