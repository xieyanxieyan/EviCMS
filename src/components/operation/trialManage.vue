<template>
    <div id="TrialManage">
        <div class="TrialManagetop"><span>出庭管理</span></div>
        <div><span>快速筛选:</span>
            <div class="tab-wrapper">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="全部" name='4'></el-tab-pane>
                    <el-tab-pane label="待处理（99）" name='0'></el-tab-pane>
                    <el-tab-pane label="已确认" name='1'></el-tab-pane>
                    <el-tab-pane label="已出庭" name='2'></el-tab-pane>
                </el-tabs>
            </div>
            <el-form :inline="true" :model="timeFrom">
                <el-form-item>
                    <el-col :span=8>
                        <el-date-picker
                            v-model="timeFrom.value1"
                            type="date"
                            size="small"
                            placeholder="选择开始时间"
                            :picker-options="pickerOptions0">
                        </el-date-picker>
                    </el-col>
                    <el-col :span=3>
                  <el-button> 至</el-button>
                    </el-col>
                    <el-col :span=8>
                        <el-date-picker
                            v-model="timeFrom.value2"
                            type="date"
                            size="small"
                            placeholder="选择结束时间"
                            :picker-options="pickerOptions0">
                        </el-date-picker>
                    </el-col>
                    <el-col :span=2>&nbsp;</el-col>
                    <el-col :span=2>
                        <el-button type="primary" size="small"@click="searchList">搜索</el-button>
                    </el-col>
                </el-form-item>
            </el-form>
            <!--<el-form :inline="true" :model="formInline" >-->
            <!--<el-form-item label="用户名称:">-->
            <!--<el-input v-model="formInline.userName"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="存证号：">-->
            <!--<el-input v-model="formInline.Memory"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="申请时间：">-->
            <!--<el-col :span="8">-->
            <!--<el-time-picker type="fixed-time" v-model="formInline.data1" style="width:100%"></el-time-picker>-->
            <!--</el-col>-->
            <!--<el-col :span="1">至</el-col>-->
            <!--<el-col :span="8">-->
            <!--<el-time-picker type="fixed-time" v-model="formInline.data2" style="width:100%"></el-time-picker>-->
            <!--</el-col>-->
            <!--<el-col :span="6">-->
            <!--<el-button>搜索</el-button>-->
            <!--</el-col>-->
            <!--</el-form-item>-->
            <!--</el-form>-->
        </div>
        <div>
            <table cellspacing="0" cellpadding="0" border="0">
                <thead>
                <tr>
                    <th>时间</th>
                    <th>用户</th>
                    <th>存证号</th>
                    <th>状态</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in TrialData">
                    <td>{{item.request_time}}</td>
                    <td>{{item.username}}</td>
                    <td>{{item.cert_id}}</td>
                    <td>{{item.status}}</td>
                    <td><a href="javascript:void(0);" @click="todetailCourt(index)" style="border:1px solid;color:#6F98FF">查看审核</a></td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
    import {trailManage} from '../../api/operation';
    import {translateTime} from '../../assets/public';
    export default {
        created() {
            this.showtrailList();
        },
        data () {
            return {
                currentTabIndex: 0,
                activeName: '4',
                timeFrom: {
                    value1: '',
                    value2: ''
                },
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    }
                },
                TrialData: []
//                formInline: {
//                    userName: '',
//                    Memory: ''
//                }
            };
        },
        methods: {
            handleClick: function () {
                this.showtrailList();
            },
            showtrailList() {
                if (this.activeName === '4') {
                    trailManage(translateTime(this.timeFrom.value1), translateTime(this.timeFrom.value2)).then(res => {
                        this.TrialData = res.data.data.data;
                        console.log(res.data.data.data, this.activeName);
                    });
                } else {
                    trailManage(translateTime(this.timeFrom.value1), translateTime(this.timeFrom.value2), parseInt(this.activeName)).then(res => {
                       if (res.data.error === 0) {
                           this.TrialData = res.data.data.data;
                           console.log(this.TrialData);
                       }
                    });
                }
            },
            searchList() {
                this.showtrailList();
            },
            todetailCourt(index) {
                this.$router.push({name: 'detailCourt', params: {courtId: this.TrialData[index].apply_id}});
            }
        }
    };
</script>
<style lang="scss">
    @import '../../style/common.scss';
    @import '../../scss/mixin.scss';
    #TrialManage {
        padding: 0 15px;
    .TrialManagetop {
        padding: 15px 0;

    span {
      @include span;
    }

    }
    .tab-wrapper {
        display: inline-block;
        vertical-align: -28px;
        width: 320px;
        margin-left: 20px;

    }
    .el-col-3{
        text-align:right;
       .el-button{
           background:#eee;
           border:0;
           color:#333;
           padding-right:10px;
       }
    }

    .el-tabs__header {
        border-bottom: 0;
    }
.el-tabs__item{
    padding:0 10px;
}
.el-form{
    display:inline-block;
    float:right;
    width:500px;
}
    /*form {*/
        /*float:right；*/

    /*div {*/
        /*display: inline-block;*/
    /*}*/

    /*input[type=button]{*/
        /*color:#fff;*/
        /*padding:4px 7px;*/
        /*display:inline-block;*/
        /*background: #999999;*/

    /*}*/
    /*input {*/
        /*border: 1px solid #eee;*/
        /*padding: 3px;*/
    /*}*/

    /*}*/
    }
</style>
