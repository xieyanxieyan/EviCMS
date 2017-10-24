import fetch from '../common/js/fetch.js';
import CryptoJS from 'crypto-js';
//  用户列表
export function getUserList(phone, reg_time_begin, reg_time_end) {
    const params = {
       phone,
       reg_time_begin,
       reg_time_end
    };
    return fetch({
        method: 'get',
        url: 'user/list',
        params
    });
}
// 添加用户
export function addUser(phone, password, amount) {
    const params = {
        phone,
        password: CryptoJS.MD5(password).toString(),
        amount
    };
    return fetch({
        method: 'post',
        url: 'user/add',
        params
    });
}
// 编辑用户
export function editUser(user_id, phone, password, amount, reason) {
    const params = {
        user_id,
        phone,
        password: CryptoJS.MD5(password).toString(),
        amount,
        reason
    };
    return fetch({
       method: 'post',
       url: 'user/update',
       params
    });
}
// 用户详情
export function userDetail(user_id) {
    return fetch({
        method: 'get',
        url: 'user/detail',
        user_id
    });
}
// 冻结用户
export function userFreeze(user_id, status) {
    const params = {
        user_id,
        status
    };
    return fetch({
        method: 'post',
        url: 'user/freeze',
        params
    });
}
// 公测用户列表
export function getBetaList(phone, reg_time_begin, reg_time_end) {
    const params = {
        phone,
        reg_time_begin,
        reg_time_end
    };
    return fetch({
        method: 'get',
        url: 'user/beta/list',
        params
    });
}
// 公测用户添加
export function addetaUser(phone, password, amount, expire_time, recommend_user) {
  const params = {
      phone,
      password: CryptoJS.MD5(password).toString(),
      amount,
      expire_time,
      recommend_user
  };
  return fetch({
     method: 'post',
      url: 'user/beta/add',
      params
  });
}
// 查看公测用户详情
export function betaUserDetail(user_id) {
    return fetch({
        method: 'get',
        url: 'beta/detail',
        user_id
    });
}
