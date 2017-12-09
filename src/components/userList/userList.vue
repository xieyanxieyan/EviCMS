<template>
    <div id="userList">
        <div class="mbody">
            <div class="top">
                <span class="userList"><span>用户列表</span></span>
                <div class="top-area">
                    <el-form :inline="true" :model="form">
                        <el-form-item label="用户名称：">
                            <el-input v-model="form.phone" size="small" @keyup.enter.native="serachList"></el-input>
                        </el-form-item>
                        <el-form-item label="统计时间:">
                            <el-date-picker
                                size="small"
                                v-model="form.begin_time"
                                type="date"
                                placeholder="选择开始时间"
                                :picker-options="form.pickerOptions0">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="至">
                            <el-date-picker
                                size="small"
                                v-model="form.end_time"
                                type="date"
                                placeholder="选择结束时间"
                                :picker-options="form.pickerOptions0">
                            </el-date-picker>
                            </el-col>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="serachList">搜索</el-button>
                            <span class="grayline">|</span>
                            <el-button v-bind:class="{hide:addUser}">
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
                    <tr v-for="(item,index) in userList.data" v-bind:class="{hide:showList}">
                        <td>{{item.user_id}}</td>
                        <td>+86 {{item.cell_phone}}</td>
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
                            <span @click="touserDetail(index)" v-bind:class="{hide: detail}"><a
                                href="javascript:void(0);">详情/编辑</a></span>
                            <span class="inter"><a href="javascript:void(0);" @click="admin_web(index)">用户界面</a></span>
                            <template v-if="item.status === 0">
                                <span @click="frozen(index)" class="redbutton"
                                      v-bind:class="{hide:frezen}">
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

        </div>
    </div>
</template>

<script>
    import {getUserList, userFreeze, admin_web} from '../../api/User';
    import {translateTime, contains} from '../../assets/public';
//    import {setToken} from '../../common/js/auth';
//    import {contains} from '../../assets/public';
    export default {
        created() {
            this.getList();
            this.controlPermission();
            console.log(this.$store.state);
        },
        computed: {
            admin_id() {
                return this.$store.state.admin_id;
            }
        },
        data() {
            return {
                total: 0,
                currentTabIndex: 0,
                userList: [],
                detail: false, // 详情编辑权限
                currentPage: 1,
                frezen: false, // 冻结解冻权限
                showList: false, // 是否显示列表权限
                addUser: false, // 是否显示添加用户按钮
                perpage: 15,
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
                getUserList(this.form.phone, translateTime(this.form.begin_time), translateTime(this.form.end_time), this.perpage, this.currentPage).then(res => {
                    this.userList = res.data.data;
                    this.total = this.userList.total;
                });
            },
            serachList() {
                this.getList();
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
                    if (res.data.error === 0) {
                        this.getList();
                    }
                });
            },
            handleCurrentChange() {
                this.getList();
            },
            // 登入web系统
            admin_web(index) {
                let w = window.open();
                admin_web(this.userList.data[index].user_id).then(res => {
                    if (res.data.error === 0) {
                        console.log(res);
                        // setToken(res.data.data.data.auth_token);
                        setTimeout(function() {
                            w.location = 'http://zbb.fa123.com/#/login/admin/' + res.data.data;
                        }, 1000);
                        // window.location.href = 'http://zbb.fa123.com/#/login/admin/' + res.data.data;
                    } else {
                        this.$message({
                            message: res.data.info,
                            type: 'error',
                            showClose: true
                        });
                    }
                });
                return false;
            },
            // 控制权限函数
            controlPermission() {
                this.detail = !contains('user_detail');// 如果有这个字段，显示详情
                this.showList = !contains('user_list');  // 如果有这个字段，显示列表
                this.frezen = !contains('user_freeze'); // 是否冻结
                 this.addUser = !contains('user_add'); // 是否有添加用户权限
            }
        }
    };

</script>

<style lang="scss">
    #userList {
        padding: 0 15px;
.hide{
    display:none;
}
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
