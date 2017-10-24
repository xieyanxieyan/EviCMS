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

export function getAdminLog(username, time_begin, time_end) {
    const params = {
        username,
        time_begin,
        time_end
    };
    return fetch({
        method: 'get',
        url: 'admin/logs',
        params
    });
}

// 获取所有的权限列表
export function getPrivilegeList() {
    return fetch({
        method: 'get',
        url: 'admin/all_permissions'
    });
}
// 发送短信 验证码
export function getCode(username) {
    const params = {
        username
    };
    return fetch({
        method: 'get',
        url: 'admin/code',
        params
    });
}

// 编辑管理员
export function editAdmin(admin_id, username, name, password, phone, role_id) {
    const params = {
        admin_id,
        username,
        name,
        password,
        phone,
        role_id
    };
    return fetch({
        method: 'post',
        url: 'admin/update',
        params
    });
}
// 冻结管理员

export function frezeAdmin(admin_id, status) {
    const params = {
        admin_id,
        status
    };
    return fetch({
        method: 'post',
        url: 'admin/freeze',
        params
    });
}
