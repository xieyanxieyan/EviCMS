import fetch from '@/common/js/fetch';
// 登录处理
export function adminLogin(username, password, code) {
    const params = {
        username,
        password,
        code
    };
    return fetch({
       method: 'post',
       url: 'admin/login',
        params
    });
}
