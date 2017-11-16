<template>
    <div id="adminPermission">
        <div class="adminPermisssionTop">
            <span>管理员设置--角色设置--管理员权限设置</span>
            <div class="topButton">
                <el-button type="primary" @click="privileges">保存</el-button>
                <el-button @click="routerBack">返回</el-button>
            </div>
        </div>
        <div class="adminpermissioncontent">
            <div><strong>超级管理员</strong></div>
            <div class="selectItem">
                <div v-for="(item, key, index) in permissionList">
                    <template>
                        <i></i>
                        <el-checkbox :indeterminate="isIndeterminate[index].isIndeterminate"
                                     v-model="checkAll[index].checkAll" @change="handleCheckAllChange($event, index)">
                            {{key}}
                        </el-checkbox>
                        <div style="margin: 15px 0;"></div>
                        <el-checkbox-group v-model="checkUsers" @change="handleCheckedChange($event, index)">
                            <el-checkbox v-for="(user, index) in item" :label="user" :key="user.index">{{user.name}}
                            </el-checkbox>
                        </el-checkbox-group>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {permissionList, ownpermission, rolesAssignment} from '../../../api/setuser';

    export default {
        created() {
            this.getPermissionList(); // 获取页面上的列表
        },
        data() {
            return {
                checkAll: [], // 选中所有项
                checkUsers: [], // 选中的列表
                permissionList: [], // 显示的列表
                prevelege: [],
                users: [], // 显示有多少项s,所有的
                isIndeterminate: [], // 控制是否全选
                checkedCount: [] //  存放的值

            };
        },
        methods: {

            // 回到上一级
            routerBack() {
                this.$router.go(-1);
            },
            handleCheckAllChange(event, index) {
                let userChecked;
                userChecked = event.target.checked ? this.users[index] : [];
                this.checkUsers.push.apply(this.checkUsers, userChecked);
                this.isIndeterminate[index].isIndeterminate = false;
            },
            handleCheckedChange(value, index) {
                console.log(value, '值');
                this.checkedCount[index] = value.length || [];
                console.log(this.checkedCount[index], 'count');
                this.checkAll[index].checkAll = this.checkedCount[index] === this.users[index].length;
                console.log(this.checkAll[index].checkAll, '所有的');
                this.isIndeterminate[index].isIndeterminate = this.checkedCount[index] > 0 && this.checkedCount[index] < this.users[0].length;
                console.log(this.checkAll[0].checkAll, '选所有了吗');
                return false;
            },
//            分配权限
            privileges() {
                let string = [];
                console.log(this.checkUsers, 'aiyayaya');
                for (let i of this.checkUsers) {
                    string.push(i.id);
                }
                string = string.join(',');
                rolesAssignment(this.$route.params.adminPer_id, string).then(res => {
                    if (res.data.error === 0) {
                        this.$message({
                            message: '保存成功',
                            type: 'success',
                            showClose: true
                        });
                    } else {
                        this.$message({
                            message: res.data.data.error,
                            type: 'error',
                            showClose: true
                        });
                    }
                });
            },
//            获取所有权限
            getPermissionList() {
                return new Promise(() => {
                    permissionList(1).then(res => {
                        if (res.data.error === 0) {
                            this.permissionList = res.data.data;
                            this.prevelege = this.permissionList;
                            for (let item in this.permissionList) {
                                this.users.push(this.permissionList[item]); // 删了会报错
                                this.isIndeterminate.push({isIndeterminate: true});
                                this.checkAll.push({checkAll: false});
                            }
//                       console.log(this.isIndeterminate);
//                       console.log(this.checkAll);
                        }
                    }).then(() => {
                        ownpermission(this.$route.params.adminPer_id).then(res => {
                            if (res.data.error === 0) {
//                               let index = -1;
                                console.log(this.prevelege);
                                for (let ii in this.prevelege) {
//                                   index++;
//                                   this.checkUsers[index] = [];
                                    console.log(this.prevelege[ii], '第一层');
                                    for (let iii of this.prevelege[ii]) {
                                        console.log(iii, '第二层');
                                        for (let item of res.data.data) {
//                                           console.log(item, 'item');
                                            if (item.permission_id === iii.id) {
                                                console.log(item.permission_id, '相同');
                                                this.checkUsers.push(iii);
                                            }
                                        }
                                    }
                                }
                                console.log(this.checkUsers, 'checkeduser');
                            } else {
                                this.$message({
                                    message: res.data.data,
                                    type: 'error',
                                    showClose: true
                                });
                            }
                        });
                    }).catch(err => {
                        console.log(err);
                    });
                });
            }
        }
    };
</script>
<style lang="scss" type="text/scss">
    @import '../../../scss/mixin';

    #adminPermission {
        padding: 0 15px;
        .adminPermisssionTop {
            padding: 15px 0;
            span {
                @include span;
            }
            .topButton {
                float: right;
                .el-button {
                    border-radius: 0;
                    padding: 5px 15px;
                    span {
                        border: 0;
                    }
                }

            }
        }
        .adminpermissioncontent {
            background: #fff;
            min-height: calc(100vh - 120px);
            & > div:nth-child(1) {
                padding: 10px 20px;
                border-bottom: 1px solid #eee;
            }
            .selectItem {
                padding: 50px;
                & i {

                }
                & > div {
                    position: relative;
                    margin-bottom: 30px;
                    padding-left: 30px;
                    @for $i from 1 to 10 {
                    　　.selectItem>div:nth-child(#{$i}) i {
                            @include dotted(darken(#cc3, 10%));
                            top: 8px;
                            left: 0px;
                        }
                    }
                }
            }
        }
    }
</style>
