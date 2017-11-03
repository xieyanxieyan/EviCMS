import {adminLogin} from '../../api/login';
const user = {
    status: {
        user: '',
        status: ''
    },
    actions: {
        adminLogin({commit}, user_Info) {
            return new Promise((resolve, reject) => {
                adminLogin(user_Info.username, user_Info.password, user_Info.code).then(res => {
                    if (res.data.error === '0') {
                        // 对返回的结果进行存储到cookies
                        resolve(0);
                    } else if (res.data.error === '100001') {
                        resolve(100001);
                    } else if (res.data.error === '100002') {
                        resolve(100002);
                    } else if (res.data.error === '100003') {
                        resolve(100003);
                    }
                }).catch(error => {
                    reject(error);
                });
            });
        }
    }
};
export default user;
