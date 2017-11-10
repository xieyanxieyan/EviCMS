<template>
    <div id="adminPermission">
        <div class="adminPermisssionTop">
            <span>管理员设置--角色设置--管理员权限设置</span>
            <div class="topButton">
                <el-button type="primary" @click="privileges">保存</el-button>
                <el-button>返回</el-button>
            </div>
        </div>
        <div class="adminpermissioncontent">
            <div><strong>超级管理员</strong></div>
            <div class="selectItem">
                <div v-for="(item, key, index) in permissionList">
                    <template>
                    <i></i>
                    <el-checkbox :indeterminate="isIndeterminate[index].isIndeterminate" v-model="checkAll[index].checkAll" @change="handleCheckAllChange($event, index)">{{key}}</el-checkbox>
                    <div style="margin: 15px 0;"></div>
                    <el-checkbox-group v-model="checkUsers[index]" @change="handleCheckedChange($event, index)">
                        <el-checkbox v-for="(user, index) in item" :label="user.name" :key="user.id">{{user.name}}</el-checkbox>
                    </el-checkbox-group>
                    </template>
                </div>
            </div>id
        </div>
    </div>
</template>
<script>
    import {permissionList, ownpermission, rolesAssignment} from '../../../api/setuser';
    export default {
        created() {
            this.getPermissionList();
            ownpermission(this.$route.params.adminPer_id).then(res => {
                if (res.data.error === 0) {
                    console.log(res);
                } else {
                    this.$message({
                        message: res.data.data,
                        type: 'error',
                        showClose: true
                    });
                }
            });
        },
        data() {
            return {
                checkAll: [], // 选中所有项
                checkUsers: [],
                permissionList: [],
                users: [], // 显示有多少项
                isIndeterminate: [], // 控制是否全选
                checkedCount: []

            };
        },
        methods: {
            handleCheckAllChange(event, index) {
                console.log(event.target.checked);
                this.checkUsers[index] = event.target.checked ? this.users[index] : [];
                console.log(this.users[index], 'this.user');
                this.isIndeterminate[index].isIndeterminate = false;
            },
            handleCheckedChange(value, index) {
                console.log(value, '值');
                this.checkedCount[index] = value.length;
                console.log(this.checkCount[index], 'count');
                this.checkAll[index].checkAll = this.checkedCount[index] === this.users[index].length;
                console.log(this.checkAll, '所有的');
                this.isIndeterminate[index].isIndeterminate = this.checkedCount[index] > 0 && this.checkedCount[index] < this.users[0].length;
                console.log(this.checkAll[0].checkAll, '选所有了吗');
            },
//            分配权限
            privileges() {
                let string = '';
                rolesAssignment(this.$route.params.adminPer_id, string).then(res => {
                    console.log(res);
                });
            },
            getPermissionList() {
                permissionList(1).then(res => {
                   if (res.data.error === 0) {
                       this.permissionList = res.data.data;
                       for (let item in this.permissionList) {
                            this.users.push(this.permissionList[item]); // 删了会报错
                           this.isIndeterminate.push({isIndeterminate: true});
                           this.checkAll.push({checkAll: true});
                       }
//                       console.log(this.isIndeterminate);
//                       console.log(this.checkAll);
                   }
                });
            }
        }
    };
</script>
<style lang="scss" type="text/scss">
    @import '../../../scss/mixin';
#adminPermission{
    padding:0 15px;
    .adminPermisssionTop{
        padding:15px 0;
        span{
           @include span;
        }
        .topButton{
           float:right;
            .el-button {
                border-radius:0;
                padding:5px 15px;
                span{
                    border:0;
                }
            }


        }
    }
.adminpermissioncontent{
    background: #fff;
    min-height:calc( 100vh - 120px);
    &>div:nth-child(1){
        padding:10px 20px;
        border-bottom:1px solid #eee;
    }
    .selectItem{
        padding:50px;
        & i{

        }
        &>div{
            position:relative;
            margin-bottom:30px;
            padding-left:30px;
            &:nth-child(1) i{
                @include dotted(#437dff);
                top:8px;
                left:0px;
            }
            &:nth-child(2) i{
                @include dotted(#4cce6d);
                top:8px;
                left:0px;

            }
            &:nth-child(3) i{
                @include dotted(#f5cf68);
                top:8px;
                left:0px;
            }
            &:nth-child(4) i{
                @include dotted(#eb5d41);
                top:8px;
                left:0px;
            }
        }
    }
}
}
</style>
