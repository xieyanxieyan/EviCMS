import fetch from '@/common/js/fetch';
// 角色列表
export function getUserList() {
    return fetch({
        method: 'get',
        url: 'roles'
    });
}
// 角色添加
export function addUser(name, description) {
    const params = {
        name,
        description
    };
    return fetch({
        method: 'post',
        url: 'roles/add',
        params
    });
}
