import fetch from '@/common/js/fetch';

// 添加权限
export function addpermission(name, permission_key, description) {
    const params = {
        name,
        permission_key,
        description
    };
    return fetch({
        method: 'post',
        url: 'admin/permission/add',
        params
    });
}

// 编辑权限
export function updatepermission() {
    const params = {};
    return fetch({
        method: 'post',
        url: 'admin/permission/update',
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
