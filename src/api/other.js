import fetch from '@/common/js/fetch';

// 添加权限
export function addPermission(name, permission_key, description, column) {
    const params = {
        name,
        permission_key,
        description,
        column
    };
    return fetch({
        method: 'post',
        url: 'admin/permission/add',
        params
    });
}
// 权限详情
export function detailPermission(id) {
    return fetch({
        method: 'get',
        url: 'admin/permission/detail',
        params: id
    });
}
// 编辑权限
export function updatePermission(id, name, permission_key, description, column) {
    const params = {
        id,
        name,
        permission_key,
        description,
        column
    };
    return fetch({
        method: 'post',
        url: 'admin/permission/update',
        params
    });
}
// 权限列表
export function permissionList(type, pid) {
    const params = {
        type,
        pid
    };
    return fetch({
        method: 'get',
        url: 'admin/permission/list',
        params
    });
}
// 删除权限
export function deletePermission(id) {
    const params = {
        id
    };
    return fetch({
        method: 'get',
        url: 'admin/permission/delete',
        params
    });
}
// 添加菜单
export function addMenu(name, link, status, pid) {
    const params = {
        name,
        link,
        status,
        pid

    };
    return fetch({
        method: 'post',
        url: 'admin/menus/add',
        params
    });
}

// 菜单详情
export function detailmenu(menu_id) {
    const params = {
        menu_id
    };
    return fetch({
        method: 'get',
        url: 'admin/menus/detail',
        params
    });
}

// 编辑菜单
export function updatemenu(menu_id, name, link, status, pid) {
    const params = {
        menu_id,
        name,
        link,
        status,
        pid
    };
    return fetch({
        method: 'post',
        url: 'admin/menus/update',
        params
    });
}
// 菜单列表
export function menulist(type) {
    const params = {
        type
    };
    return fetch({
        method: 'get',
        url: 'admin/menus/list',
        params
    });
}
// 删除菜单
export function deleteMenus (menu_id) {
    const params = {
        menu_id
    };
    return fetch({
        method: 'get',
        url: 'admin/menus/delete',
        params
    });
}
