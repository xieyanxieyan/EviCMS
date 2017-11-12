<template>
    <div>
    <div v-for="(item, key, index) in permissionList">
        <i></i>
        <el-checkbox :indeterminate="isIndeterminate[index].isIndeterminate" v-model="checkAll[index].checkAll"
                     @change="handleCheckAllChange($event, index)">{{key}}
        </el-checkbox>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="checkUsers[index]" @change="handleCheckedChange($event, index)">
            <el-checkbox v-for="(user, index) in item" :label="user" :key="user.id">{{user.name}}</el-checkbox>
        </el-checkbox-group>
    </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                checkAll: [], // 选中所有项
                checkUsers: [], // 选中的列表
                permissionList: {
                    '系统管理(栏目名称)': [
                        {
                            'id': 1,
                            'name': '权限列表',
                            'created_at': null,
                            'updated_at': '2017-11-07 20:44:15',
                            'permission_key': null,
                            'description': null,
                            'colum': 1
                        },
                        {
                            'id': 3,
                            'name': 'admin11',
                            'created_at': '2017-11-06 03:27:13',
                            'updated_at': '2017-11-06 03:27:13',
                            'permission_key': '11',
                            'description': '23',
                            'colum': 1
                        }
                    ],
                    '数据分析': [
                        {
                            'id': 4,
                            'name': 'admin12',
                            'created_at': '2017-11-06 03:38:49',
                            'updated_at': '2017-11-06 03:38:49',
                            'permission_key': '45',
                            'description': '高级',
                            'colum': 7
                        },
                        {
                            'id': 9,
                            'name': '数据分析',
                            'created_at': '2017-11-08 06:32:33',
                            'updated_at': '2017-11-08 06:32:33',
                            'permission_key': '10',
                            'description': '数据',
                            'colum': 7
                        }
                    ]
                }, // 显示的列表
                prevelege: [],
                users: [], // 显示有多少项s,所有的
                isIndeterminate: [[{'isIndeterminate': false}], [{'isIndeterminate': false}]
                ], // 控制是否全选
                checkedCount: [] //  存放的值

            };
        },
        methods: {
            handleCheckAllChange(event, index) {
                console.log(event.target.checked);
                this.checkUsers[index] = event.target.checked ? this.users[index] : [];
                console.log(this.users[index], 'this.user');
                console.log(this.checkUsers[index]); //  选择的项
                this.isIndeterminate[index].isIndeterminate = false;
            },
            handleCheckedChange(value, index) {
                console.log(value, '值');
                this.checkedCount[index] = value.length || [];
                console.log(this.checkedCount[index], 'count');
                this.checkAll[index].checkAll = this.checkedCount[index] === this.users[index].length;
                console.log(this.checkAll[index].checkAll, '所有的');
                this.isIndeterminate[index].isIndeterminate = this.checkedCount[index] > 0 && this.checkedCount[index] < this.users[0].length;
                console.log(this.checkAll[0].checkAll, '选所有了吗');
                return false;
            }
        }
    };
</script>
