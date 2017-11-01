<template>
    <div id="complaint">
        <div class="top">
            <span style="border-left:2px solid #324157;padding-left:10px;">投诉建议管理 —— 投诉详情</span>
        </div>
        <div class="suggestion">
            <div class="complaintTop">
                <span><strong>用户</strong>：{{detail.username}}</span>
                <span style="margin:0 20px;color:#eee">|</span>
                <span><strong>时间：</strong>&nbsp;{{detail.request_time}}</span>
                <el-button>进入用户界面</el-button>
            </div>
            <div>
                <el-form>
                    <el-form-item>
                        <b>内容:</b>
                    </el-form-item>
                    <el-form-item>
                        <el-row>
                        <el-col :span="12">
                            <el-input type="textarea" size="small" resize="none" :readonly="isread" :value="content">
                            </el-input>
                        </el-col>
                            <el-col :span="12" v-for="(item,index) in imgs">
                                <img :src="item"  alt="">
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item>
                        <b>回复:</b>
                    </el-form-item>
                    <el-form-item>
                        <el-input type="textarea" size="small" v-model="replay">
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="replaySubmit()" style="margin-right:80px;">提交回复</el-button>
                        <el-button>返回</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
    import {feedbackdetail, feedbackreplay} from '../../api/operation';

    export default {
        created() {
            this.feedbackDetail();
        },
        data() {
            return {
                isread: true,
                detail: [],
                content: '',
                replay: '',
                imgs: []
            };
        },
        methods: {
//            投诉详情内容
            feedbackDetail() {
//                console.log(this.$route.params.report_id);
                feedbackdetail(this.$route.params.report_id).then(res => {
                    if (res.data.error === 0) {
                        let imgs;
                        this.detail = res.data.data || [];
                        this.content = res.data.data.content;
                       imgs = res.data.data.imgs.split('[')[1].split(']')[0].split(',');
                       console.log(imgs);
                        for (let img in imgs) {
                            console.log(imgs[img].spli);
                        }
                    }
                });
            },
            replaySubmit() {
                feedbackreplay(this.$route.params.report_id, this.replay).then(res => {
                    console.log(res);
                });
            }
        }
    };
</script>
<style lang="scss" type="text/scss">
    #complaint {
        padding: 15px 20px;
        position: relative;
        .top {
            padding-bottom: 15px;
        }
        .suggestion {
            min-height: calc(100vh - 120px);
            background: #fff;
            padding: 0px 30px;
            .complaintTop {
                padding: 15px 0;
                font-size: 16px;
                border-bottom: 1px solid #eee;
            }
            .complaintTop {
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
            .el-form-item {
                /*margin-bottom:0;*/
                .el-button {
                    border-radius: 0;
                    text-align: center;
                    width: 100px;
                    padding: 10px 0;
                }
            }
            textarea {
                outline: none;
                border: 1px solid #bbb;
            }
            .el-form {
                padding-bottom: 50px;
            }
        }
    }
</style>
