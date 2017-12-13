<template>
    <div id="userList">
        <div class="mbody">
            <div class="top">
                <span class="userList">用户列表</span>
                <div class="top-area">
                    <el-form :inline="true" :model="form">
                        <el-form-item label="用户名称：">
                            <el-input v-model="form.phone" size="small" @keyup.enter.native="getList"></el-input>
                        </el-form-item>
                        <el-form-item label="统计时间:">
                            <el-date-picker
                                size="small"
                                @keyup.enter.native="getList"
                                v-model="form.begin_time"
                                type="date"
                                placeholder="选择开始时间"
                                :picker-options="form.pickerOptions0">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="至">
                            <el-date-picker
                                size="small"
                                @keyup.enter.native="getList"
                                v-model="form.end_time"
                                type="date"
                                placeholder="选择结束时间"
                                :picker-options="form.pickerOptions0">
                            </el-date-picker>
                            </el-col>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" size="small" @click.native.prevent="getList">搜索</el-button>
                            <span class="grayline">|</span>
                            <el-button v-bind:class="{hide:addUser}" size="small">
                                <router-link to="/addUser"> 添加用户</router-link>
                            </el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div class="list-area" id="data_list_area">
                <table border="0" cellspacing="0" cellpadding="=0">
                    <thead>
                    <tr>
                        <th>用户序号</th>
                        <th>用户名称</th>
                        <th>注册时间</th>
                        <th>存证数</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,index) in userList" v-bind:class="{hide:showList}">
                        <td>{{item.user_id}}</td>
                        <td>(+{{item.area_code}}) {{item.cell_phone}}</td>
                        <td>{{item.reg_time}}</td>
                        <td>{{item.cert_count}}</td>
                        <td>
                            <template v-if="item.status === 0">
                                <span>正常</span>
                            </template>
                            <template v-else="item.status === 1">
                                <span style="color:#ff4949">冻结</span>
                            </template>
                        </td>
                        <td>
                            <el-button type="small" @click="touserDetail(index)" v-bind:class="{hide: detail}"><a
                                href="javascript:void(0);">详情/编辑</a></el-button>
                            <el-button type="small" class="inter"><a href="javascript:void(0);"
                                                                     @click="admin_web(index)">用户界面</a></el-button>
                            <template v-if="item.status === 0">
                                <el-button type="small" @click="frozen(index)" class="redbutton"
                                           v-bind:class="{hide:frezen}">
                                    <a href="javascript:void(0);">冻结</a>
                                </el-button>
                            </template>
                            <template v-else="item.status === 1">
                                <el-button type="small" @click="frozen(index)" class="greenbutton">
                                    <a href="javascript:void(0);">解冻</a>
                                </el-button>
                            </template>

                        </td>
                    </tr>
                    </tbody>
                </table>
                <!--分页-->
                <div class="pagination" v-if="total>15" v-bind:class="{hide:showList}">
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
                    this.userList = res.data.data.data;
                    console.log(this.userList);
                    this.total = res.data.data.total;
                });
            },
            serachList() {
                this.getList();
            },
//            到用户详情
            touserDetail(index) {
                this.$router.push({name: 'userDetail', params: {detailId: this.userList[index].user_id}});
            },
//            冻结用户
            frozen(index) {
                userFreeze(this.userList[index].user_id, this.userList[index].status).then(res => {
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
                admin_web(this.userList[index].user_id).then(res => {
                    if (res.data.error === 0) {
                        console.log(res);
                        // setToken(res.data.data.data.auth_token);
                        setTimeout(function () {
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
    @import '../../style/common.scss';
    @import '../../scss/mixin.scss';

    #userList {

        padding: 0 15px;

    .top {
        padding: 15px 0;

    &>span {
    @include span;
    }
.top-area{
  float:right;
}
    }
    .pagination {
        text-align: center;
    }

    .el-button {
        border: 1px solid #20a0ff;

    a {
        color: #20a0ff;
    }

    }
    .redbutton {
        border: 1px solid #ff4d51;

    a {
        color: #ff4d51;
    }

    }
    table{
        table-layout: auto;
    }
    }
</style>
