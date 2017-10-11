<template>
    <div id="complaint">
        <div class="top">
            <span style="border-left:2px solid #324157;padding-left:10px;">投诉建议管理 —— 投诉详情</span>
        </div>
        <div class="suggestion">
            <div class="complaintTop">
                <span><strong>用户</strong>：（+86）13412345678</span>
                <span style="margin:0 20px;color:#eee">|</span>
                <span><strong>时间</strong>：<b>2017-4-21</b>&nbsp;<b>17:31:12</b></span>
                <el-button>进入用户界面</el-button>
            </div>
            <div>
                <el-form>
                    <el-form-item>
                        <b>内容:</b>
                    </el-form-item>
                    <el-form-item>
                            <textarea name="" id="" cols="70" rows="8" style="resize:none">
                            </textarea>
                    </el-form-item>
                    <el-form-item>
                        <b>回复:</b>
                    </el-form-item>
                    <el-form-item>
                        <textarea name="" style="width:100%;height:80px;resize:none;" ></textarea>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit" style="margin-right:80px;">提交回复</el-button>
                        <el-button>返回</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        methods: {
            onSubmit() {
                console.log('submit!');
            }
        }
    };
</script>
<style lang="scss" type="text/scss" scoped>
    #complaint {
        padding: 15px 20px;
        position: relative;
        .top {
            padding-bottom: 15px;
        }
        .suggestion {
            background: #fff;
            padding: 0px 30px;
            .complaintTop {
                padding: 15px 0;
                font-size: 16px;
                border-bottom: 1px solid #eee;
            }
            .complaintTop{
                .el-button {
                    position: absolute;
                    right: 50px;
                    top: 58px;
                    border-radius: 0;
                    font-size: 12px;

                }
            }

            .el-textarea__inner {
                resize: none
            }
            .el-form-item{
                margin-bottom:0;
            .el-button{
                border-radius:0;
                text-align:center;
                width:100px;
                padding:10px 0;
            }
            }
            textarea{
                outline:none;
                border:1px solid #bbb;
            }
            .el-form{
                padding-bottom:50px;
            }
        }
    }
</style>
