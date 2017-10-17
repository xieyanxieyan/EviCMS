<template>
    <div id="userList">
        <div class="mbody">
            <div class="top">
                <span class="userList"><span>用户列表</span></span>
                <div class="top-area">
                    <form>
                        用户名称: <input type="text">
                        注册时间： <input type="text">至 <input type="text">
                        <el-button type="primary">搜索</el-button>
                        <span class="grayline">|</span>
                        <el-button><router-link to="/adduser">添加用户</router-link></el-button>
                    </form>
                </div>
                <div class="clear"></div>
            </div>
            <div class="list-area" id="data_list_area">
                <table border="0" cellspacing="0" cellpadding="=0">
                    <thead>
                    <tr>
                        <th>用户序号</th>
                        <th>用户名称</th>
                        <th>注册时间</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,index) in userList">
                        <td>{{item.userOrder}}</td>
                        <td>{{item.userName}}</td>
                        <td>{{item.registrationTime}}</td>
                        <td>{{item.status}}</td>
                        <td>
                            <span><router-link to="/officalEdit" style="border:1px solid;color: #20a0ff;">{{item.operaion.detail}}</router-link></span>
                            <span class="inter"><router-link to="" style="border:1px solid;margin:0 10px;color: #20a0ff;">{{item.operaion.Interface}}</router-link></span>
                            <span><router-link to="" style="border:1px solid;color:#e00">{{item.operaion.status}}</router-link></span>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                currentTabIndex: 0,
                userList: [
                    {
                        userOrder: '12345',
                        userName: '(+8612312345678)',
                        registrationTime: '2017-4-10 20:01:30',
                        status: '正常',
                        operaion: {
                            detail: '详情/编辑',
                            Interface: '用户界面',
                            status: '冻结'
                        }
                    }
                ]
            };
        }
    };

</script>

<style lang="scss">
#userList{
    padding: 0 15px;

a{
    color:#333;
    /*display:inline-block;*/
    padding:2px;
}
.top{
    padding:15px 0;
}
.top-area {
    float: right;
}

.userList {
    float: left;
    border-left: 2px solid #2D4D9F;
    padding-left: 15px;
}

#userList {
    background: #eee;
    height: 100%;
    padding: 15px 25px;
}

#userList input {
    padding: 2px;
    /*display:inline-block;*/
}

.el-button {
    padding: 5px 10px;
}

table, thead, tbody {
    width: 100%;
}

tr td, tr th {
    width: 19%;
    height: 35px;
    line-height: 35px;
    font-size: 14px;
}

tr td {
    text-align: center;
}

th {
    color: #fff;
    background: #556386;
}

.top-area button {
    border-radius: 0;
}

.top-area .el-button--default {
    color: #20a0ff;
    border: 1px solid #20a0ff;
    padding: 5px;
}

.el-button {
    margin: 0;
}

#userList .grayline {
    border: 1px solid #ccc;
    height: 30px;
    margin: 0 20px;
    display:block;
}
}
</style>
