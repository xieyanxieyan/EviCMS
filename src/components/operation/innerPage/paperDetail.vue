<template>
    <div id="paperDetail">
        <div class="paperDetail">
            <span>出证管理 -- 纸质出证详情</span>
        </div>
        <div class="userMessage">
            <div class="userNum">
                <strong>用户:
                    <small>(+86)13412345678</small>
                </strong>
            </div>
            <div style="text-align: center">
                <el-steps :space="200" :active="status">
                    <el-step title="用户申请" :description="req_time"></el-step>
                    <el-step title="出证盖章" :description="confirm_time"></el-step>
                    <el-step title="快递发出" :description="exp_time"></el-step>
                    <el-step title="客户签收" :description="finish_time"></el-step>
                </el-steps>
            </div>
        </div>
        <div class="detailContent">
            <template v-if="detail">
                <depositNum :cert="detail" v-on:update="getDetail"></depositNum>
                <logisticsInfo :cert="detail" v-on:update="getDetail"></logisticsInfo>
            </template>
        </div>
    </div>
</template>
<script>
    import depositNum from './depositNum.vue';
    import logisticsInfo from './logisticsInfo.vue';
    import {getCertifyDetail} from '../../../api/operation';

    export default {
        created() {
            this.getDetail();
        },
        data() {
            return {
                detail: null,
                status: 1,
                req_time: '', // 用户申请时间
                exp_records: '', // 快递时间和地址
                confirm_time: '', // 出证盖章时间
                exp_time: '', // 快递发出时间
                finish_time: '', // 客户签收时间
                cert_num: ''
            };
        },
//        watch: {
//            detail() {
//                console.log(newval);
//                return newval === val;
//            }
//        },
        methods: {
            getDetail() {
                getCertifyDetail(this.$route.params.detailId).then(res => {
                    if (res.data.error === 0) {
                        this.detail = res.data.data;
                        let detail = res.data.data;
                        console.log(detail);
                        this.req_time = detail.req_time;
                        this.confirm_time = detail.confirm_time;
                        this.exp_time = detail.exp_time;
                        this.finish_time = detail.finish_time;
                        console.log(detail.status);
                        if (detail.status === 2) {
                            this.status = 1;
                        } else if (detail.status === 3 || detail.status === 4) {
                            this.status = 2;
                        } else if (detail.status === 5) {
                            this.status = 3;
                        } else if (detail.status === 6) {
                            this.status = 4;
                        }
                    }
                });
            }
        },
        components: {
            depositNum,
            logisticsInfo
        }
    };
</script>
<style lang="scss" type="text/scss">
    @import '../../../scss/mixin';

    #paperDetail {
        padding: 0 15px;
        .paperDetail {
            padding: 15px 0;
            span {
                border-left: 2px solid #324157;
                padding-left: 5px;
            }
        }
        .userMessage {
            background: #fff;
            padding: 15px 25px;
            .userNum {
                margin-bottom: 10px;

            }
        }
        .detailContent {
            margin-top: 15px;
        }
    }
</style>
