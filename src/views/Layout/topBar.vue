<template>
    <div id="topbar">
        <div  class="leftMessage">
           <div>待处理：</div>
            <div>
                <span>投诉建议(99)</span>
                <span class="line">|</span>
                <span>退款(99)</span>
                <span class="line">|</span>
                <span>出证(99)</span>
                <span class="line">|</span>
                <span>出庭(99)</span>
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
    export default {
        created() {
            this.getName();
        },
        data() {
          return {
              name: ''
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

