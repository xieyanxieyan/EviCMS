import fetch from '@/common/js/fetch';

// 角色列表
export function getUserList() {
    return fetch({
        method: 'get',
        url: 'admin/roles'
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
        url: 'admin/roles/add',
        params
    });
}

// 获取角色列表
export function getRole() {
    return fetch({
        method: 'get',
        url: 'admin/roles'
    });
}

//   添加管理员
export function addAdmin(username, name, password, phone, role_id) {
    const params = {
        username,
        name,
        password,
        phone,
        role_id
    };
    return fetch({
        method: 'post',
        url: 'admin/add',
        params
    });
}
// 获取管理员权限
export function getAdminLimit(admin_id) {
    return fetch({
        method: 'get',
        url: 'res.data.data',
        admin_id
    });
}
// 获取管理员列表
export function getAdminList(username, time_begin, time_end) {
    const params = {
        username,
        time_begin,
        time_end
    };
    return fetch({
        method: 'get',
        url: 'admin/list',
        params
    });
}
//  获取管理员日志

