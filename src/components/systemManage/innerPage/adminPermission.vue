<template>
    <div id="adminPermission">
        <div class="adminPermisssionTop">
            <span>管理员设置--角色设置--管理员权限设置</span>
            <div class="topButton">
                <el-button type="primary">保存</el-button>
                <el-button>返回</el-button>
            </div>
        </div>
        <div class="adminpermissioncontent">
            <div><strong>超级管理员</strong></div>
            <div class="selectItem">
                <div>
                    <i></i>
                    <el-checkbox :indeterminate="isIndeterminate1" v-model="checkAlluser" @change="handleCheckAlluserChange">用户管理</el-checkbox>
                    <div style="margin: 15px 0;"></div>
                    <el-checkbox-group v-model="checkUsers" @change="handleCheckedUsersChange">
                        <el-checkbox v-for="user in users" :label="user" :key="user">{{user}}</el-checkbox>
                    </el-checkbox-group>
                </div>
                <div>
                    <i></i>
                    <el-checkbox :indeterminate="isIndeterminate2" v-model="checkAllopera" @change="handleCheckAlloperaChange">运营管理</el-checkbox>
                    <div style="margin: 15px 0;"></div>
                    <el-checkbox-group v-model="checkOperas" @change="handleCheckedOperasChange">
                        <el-checkbox v-for="opera in operas" :label="opera" :key="opera">{{opera}}</el-checkbox>
                    </el-checkbox-group>
                </div>
                <div>
                    <i></i>
                    <el-checkbox :indeterminate="isIndeterminate3" v-model="checkAlldataAna" @change="handleCheckAlldataAnaChange">数据分析</el-checkbox>
                    <div style="margin: 15px 0;"></div>
                    <el-checkbox-group v-model="checkdataAnas" @change="handleCheckeddataAnasChange">
                        <el-checkbox v-for="dataAna in dataAnas" :label="dataAna" :key="dataAna">{{dataAna}}</el-checkbox>
                    </el-checkbox-group>
                </div>
                <div>
                    <i></i>
                    <el-checkbox :indeterminate="isIndeterminate4" v-model="checkAllsystemAdm" @change="handleCheckAllsystemAdmChange">用户管理</el-checkbox>
                    <div style="margin: 15px 0;"></div>
                    <el-checkbox-group v-model="checksystemAdms" @change="handleCheckedsystemAdmsChange">
                        <el-checkbox v-for="systemAdm in systemAdms" :label="systemAdm" :key="systemAdm">{{systemAdm}}</el-checkbox>
                    </el-checkbox-group>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {getPrivilegeList} from '../../../api/setuser';
    const userOptions = ['查看用户信息', '编辑用户资料', '冻结用户账号', '添加新用户', '管理用户界面'];
    const operaOptions = ['投诉建议管理', '退款管理', '纸质出证管理', '出庭管理'];
    const dataAnaOptions = ['查看用户统计', '查看行为统计', '查看财务统计'];
    const systemAdmOptions = ['添加/编辑管理员', '设置管理员权限', '冻结管理员', '查看管理日志', '管理密匙'];
    export default {
        created() {
            getPrivilegeList().then(res => {
                console.log(res);
            });
        },
        data() {
            return {
                checkAlluser: true,
                checkUsers: [],
                users: userOptions,
                isIndeterminate1: true,
                checkAllopera: true,
                checkOperas: [],
                operas: operaOptions,
                isIndeterminate2: true,
                checkAlldataAna: true,
                checkdataAnas: [],
                dataAnas: dataAnaOptions,
                isIndeterminate3: true,
                checkAllsystemAdm: true,
                checksystemAdms: [],
                systemAdms: systemAdmOptions,
                isIndeterminate4: true
            };
        },
        methods: {
            handleCheckAlluserChange(event) {
                this.checkUsers = event.target.checked ? userOptions : [];
                this.isIndeterminate1 = false;
            },
            handleCheckedUsersChange(value) {
                let checkedCount = value.length;
                this.checkAlluser = checkedCount === this.users.length;
                this.isIndeterminate1 = checkedCount > 0 && checkedCount < this.users.length;
            },
            handleCheckAlloperaChange(event) {
                this.checkOperas = event.target.checked ? operaOptions : [];
                this.isIndeterminate2 = false;
            },
            handleCheckedOperasChange(value) {
                let checkedCount = value.length;
                this.checkAllopera = checkedCount === this.operas.length;
                this.isIndeterminate2 = checkedCount > 0 && checkedCount < this.operas.length;
            },
            handleCheckAlldataAnaChange(event) {
                this.checkdataAnas = event.target.checked ? dataAnaOptions : [];
                this.isIndeterminate3 = false;
            },
            handleCheckeddataAnasChange(value) {
                let checkedCount = value.length;
                this.checkAlldataAna = checkedCount === this.dataAnas.length;
                this.isIndeterminate3 = checkedCount > 0 && checkedCount < this.dataAnas.length;
            },
            handleCheckAllsystemAdmChange(event) {
                this.checksystemAdms = event.target.checked ? systemAdmOptions : [];
                this.isIndeterminate4 = false;
            },
            handleCheckedsystemAdmsChange(value) {
                let checkedCount = value.length;
                this.checkAllsystemAdm = checkedCount === this.systemAdms.length;
                this.isIndeterminate4 = checkedCount > 0 && checkedCount < this.systemAdms.length;
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
            border-left: 2px solid #324157;
            padding-left: 5px;
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
