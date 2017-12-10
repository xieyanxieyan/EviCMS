<template>
    <el-cascader class="newinput"
                 :options="options"
                 @active-item-change="handleItemChange"
                 :props="props"></el-cascader>
</template>
<script>
    export default {
        name: 'app',
        data() {
            return {
                options: [{
                    name: '北京',
                    code: 10000,
                    children: []
                }, {
                    name: '天津',
                    code: 10001,
                    children: []
                },
                    {
                        name: '河北省',
                        code: 10002,
                        children: []
                    }
                ],
                props: {
                    label: 'name',
                    value: 'code',
                    children: 'children'
                }
            };
        },
        methods: {
            handleItemChange(val) {
                console.log(val);
            }
        }
    };

</script>
