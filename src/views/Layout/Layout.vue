<template>
    <div id="appwraper">
        <sidebar></sidebar>
        <div class="main">
            <topbar></topbar>
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
    import sidebar from './sidebar';
    import topbar from './topBar.vue';
    export default {
        name: 'appwraper',
        components: {
            sidebar,
            topbar
        }
    };
</script>
<style>
    .main {
        margin-left: 200px;
        min-width:900px;
    }
    .main{
        height:100%;
    }
    body{
        margin:0;
        padding:0;
        background: #eeeeee;
        font-size:15px;
    }
    .clear:after{
        content:'';
        display:block;
        clear:both;
    }
    input{
        outline:none;
    }
    tbody{background:#fff;}
</style>
