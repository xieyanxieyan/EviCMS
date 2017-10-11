<template>
<div id="topbar">
    <div>
        <span style="margin-right:15px;"@click="logout">退出登录</span>
        <span class="line">|</span>
        <span><router-link to="">管理员：admin</router-link></span>
    </div>
</div>
</template>
<style>
#topbar{
    height:35px;
    background:#fff;
    line-height:35px;
}
#topbar span{
    display:inline-block;
    float:right;
    color:#333;
    height:35px;
    line-height:35px;
    text-align: center;
}
    #topbar a{
         display:inline-block;
        color:#333;
        width:inherit;
        vertical-align: middle;
        text-align: center;
    }
   #topbar .line{
       height:10px;
       width:50px;
    }
</style>
<script>
export default {
    methods: {
        logout() {
            this.$store.dispatch('LogOut')
                .then(() => {
                location.reload();
            });
        }
    }
};
</script>
