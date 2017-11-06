<template>
<div id="keyManage">
    <div class="keyManageTop"><span> 密钥管理</span></div>
   <div class="tabselect">
       <el-tabs v-model="activeName" @tab-click="handleClick">
           <el-tab-pane label="短信密钥" name="first">
               <keyForm></keyForm>
           </el-tab-pane>
           <el-tab-pane label="微信支付密钥" name="second"><keyForm></keyForm></el-tab-pane>
           <el-tab-pane label="支付宝密钥" name="third"><keyForm></keyForm></el-tab-pane>
       </el-tabs>
   </div>
</div>
</template>
<script>
   import keyForm from '../comom/keyForm';
    export default{
        data() {
            return {
                activeName: 'first'
            };
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            }
        },
        components: {
            keyForm
        }
    };
</script>
<style lang="scss" type="text/scss">
    @import '../../scss/mixin.scss';
#keyManage{
    padding:0 20px;
    .keyManageTop{
      padding:15px 0;
        span{
           @include span;
        }
    }
.tabselect{
    background: #fff;
}
.from-wrapper{
    min-height: calc( 100vh - 200px );
position:relative;
    .el-form{
        width:400px;
        position:absolute;
        top:100px;
        bottom:0;
        left:0;
        right:0;
        margin:auto;
    }
}
}
</style>
