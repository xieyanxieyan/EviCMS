<template>
    <div id="topbar">
        <div  class="leftMessage">
           <div>待处理：</div>
            <div>
                <span>投诉建议({{taskSum.report}})</span>
                <span class="line">|</span>
                <span>退款({{taskSum.refund}})</span>
                <span class="line">|</span>
                <span>出证({{taskSum.cert}})</span>
                <span class="line">|</span>
                <span>出庭({{taskSum.court}})</span>
            </div>
        </div>
        <div class="rightMessage">
            <span style="margin-right:15px; cursor:pointer;" @click="logout">退出登录</span>
            <span class="line">|</span>
            <span>管理员：{{name}}</span>
        </div>
    </div>
</template>
<script>
import {task} from '../../api/taskSum';
    export default {
        created() {
            this.getName();
            this.taskTotle();
        },
        data() {
          return {
              name: '',
              taskSum: {}
          };
        },
        methods: {
            getName() {
              this.name = window.localStorage.getItem('name');
            },
            logout() {
//                console.log('d');
                this.$store.dispatch('adminLogout')
                    .then((res) => {
                    if (res === 0) {
                        // 退出登录
                        location.reload();
                    } else {
                        this.$message({
                            message: res.data.data,
                            type: 'error',
                            showClose: true
                        });
                        }
                    });
            },
            taskTotle() {
                task().then(res => {
                    if (res.data.error === 0) {
                        let data = res.data.data;
                        this.taskSum = data;
                        console.log(this.taskSum);
                    };
                });
            }
        }
    };
</script>
<style lang="scss">
    #topbar {
        padding-left:20px;
        height: 35px;
        background: #fff;
        line-height: 35px;

     span {
        display: inline-block;
        color: #333;
        height: 35px;
        line-height: 35px;
        text-align: center;
    }
    .rightMessage span{
        float:right;
    }
    .leftMessage div{
        display:inline-block;
        float:left;
    }
    a {
        display: inline-block;
        color: #333;
        width: inherit;
        vertical-align: middle;
        text-align: center;
    }

     .line {
        height: 10px;
        width: 50px;
    }

    }
</style>

