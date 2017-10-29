<template>
    <div id="depositNum">
        <div class="depositeTop">
            <strong>存证编号：</strong>
            <small>{{cert.cert_no}}</small>
            <strong style="float:right">
                出证次数：k次
            </strong>
        </div>
        <div class="depositForm">
            <div>
                <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign" ref="formLabelAlign">
                    <el-form-item label="姓名：">
                        <el-input v-model="formLabelAlign.name"
                                  prop="name"
                                  placeholder="张三"
                                  :disabled="isused"
                                  auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="收件人手机：">
                        <el-input v-model="formLabelAlign.phone"
                                  prop="phone"
                                  placeholder="12312345678"
                                  :disabled="isused"
                                  auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="收件地址：" style="margin-bottom:0;">
                        <el-input v-model="formLabelAlign.address"
                                  prop="address"
                                  :disabled="isused"
                                  placeholder="北京市朝阳区xx路xx号"
                                  auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item style="text-align: right;">
                        <el-button type="text" @click="certupdateSubmit('formLabelAlign')">{{updatemessage}}</el-button>
                        <el-button type="text" @click="cancel('formLabelAlign')">取消</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button style="margin-left:-100px;" type="info">预览证书</el-button>
                        <el-button type="warning">打印证书</el-button>
                        <el-button type="success">已盖章</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div>
            </div>
        </div>
    </div>
</template>
<script>
    import {certifyUpdate} from '../../../api/operation';
    export default {
        props: ['cert'],
        data () {
            return {
                isused: true,
                labelPosition: 'left',
                updatemessage: '信息更改',
                formLabelAlign: {
                    name: '',
                    phone: '',
                    address: ''
                }
            };
        },
        methods: {
            certupdateSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.updatemessage === '信息更改') {
                            this.updatemessage = '保存';
                            this.isused = false;
                        } else {
                            certifyUpdate(this.cert.apply_id, this.formLabelAlign.name, this.formLabelAlign.phone, this.formLabelAlign.address, this.exp_num, this.exp_company, 1).then(res => {
                                console.log(res);
                            });
                        }
                    } else {
                        alert('error submit');
                        return false;
                    }
                });
            },
            cancel(formName) {
                this.isused = true;
                this.updatemessage = '信息更改';
            }
        }
    };
</script>
<style lang="scss">
    #depositNum {
        box-sizing: border-box;
        display: inline-block;
        padding: 20px;
        background: #fff;
        width: 49%;

    .depositeTop {
        padding-bottom: 15px;
        border-bottom: 1px solid #eee;
    }

    .depositForm {
        min-height: calc(100vh - 430px);
    }

    .el-form {
        margin: 40px auto;
        width: 300px;
    }

    }
</style>
