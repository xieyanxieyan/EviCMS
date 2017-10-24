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
            <div>
                <el-steps :space="200" :active="1">
                    <el-step title="用户申请" description="2017-6-6 17:30:20"></el-step>
                    <el-step title="出证盖章" description="2017-6-6 17:30:20"></el-step>
                    <el-step title="快递发出" description="2017-6-6 17:30:20"></el-step>
                    <el-step title="客户签收" description="2017-6-6 17:30:20"></el-step>
                </el-steps>
            </div>
        </div>
        <div class="detailContent">
            <depositNum></depositNum>
            <logisticsInfo></logisticsInfo>
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
            return {};
        },
        methods: {
            getDetail() {
                getCertifyDetail(1).then(res => {
                    console.log('paperdetail', res);
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

    import {
    }

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
