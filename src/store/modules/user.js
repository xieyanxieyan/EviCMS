import {adminLogin, logOut} from '../../api/login';
import {getToken, setToken, removeToken} from '../../common/js/auth';
const user = {
    state: {
        user: '',
        status: '',
        auth_token: getToken(),
        menus: [],
        permission: []
    },
    mutations: {
        SET_AUTH_TOKEN: (state, auth_token) => {
            state.auth_token = auth_token;
        },
        SET_MENUS: (state, menus) => {
            state.menus = menus;
        },
        SET_PERMISSION: (state, permission) => {
            state.permission = permission;
        },
        SET_ADMIN: (state, admin) => {
            state.admin = admin;
        },
        SET_LOGIN_EXPIRE: (state, login_expire) => {
            state.login_expire = login_expire;
        }
    },
    actions: {
        // 登录
        adminLogin({commit}, user_Info) {
            return new Promise((resolve, reject) => {
                adminLogin(user_Info.username, user_Info.password, user_Info.verify_code).then(res => {
                    if (res.data.error === 0) {
                        // 对返回的结果进行存储到cookies
                        const data = res.data.data;
                        setToken(data.auth_token);
                        commit('SET_AUTH_TOKEN', data.auth_token);
                        commit('SET_MENUS', data.menus);
                        commit('SET_PERMISSION', data.permissions);
                        commit('SET_ADMIN', data.admin_id);
                        commit('SET_LOGIN_EXPIRE', data.login_expire);
                        // let arr = [];
                        // arr.push(data.menus);
                        // arr.push(data.permissions);
                        // arr.push(data.name);
                        localStorage.setItem('name', data.name);
                        localStorage.setItem('permission', JSON.stringify(data.permissions));
                        localStorage.setItem('menus', JSON.stringify(data.menus));
                        resolve(0);
                    } else {
                        resolve(res.data.error, res.data.data);
                    }
                }).catch(error => {
                    reject(error);
                });
            });
        },
        // 退出登录
        adminLogout ({commit}) {
            return new Promise((resolve, reject) => {
                logOut()
                    .then((res) => {
                    // console.log(res);
                    //     if (res.data.error === 0) {
                            commit('SET_AUTH_TOKEN', ''); //  将token置为空
                            removeToken(); // 移除cookie中的token
                            localStorage.clear();
                            resolve(0);
                        // } else {
                        //     commit('SET_AUTH_TOKEN', ''); //  将token置为空
                        //     removeToken(); // 移除cookie中的token
                        //     localStorage.clear();
                        //     resolve(0);
                        //     resolve(res.data.error);
                        // }
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        }
    }
};
export default user;
